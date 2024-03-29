<template>
  <!-- -->
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar v-model:category="category" class="col-grow" />
      <section class="col-7">
        <PostHeader v-model:sort="sort" />

        <PostList :items="items" />
        <!--
           @TODO: vue 프로젝트 제작 시 사용해보기 
           https://vueuse.org/core/useIntersectionObserver/#useintersectionobserver  
        -->
        <div v-intersection-observer="handleIntersectionObserver"></div>
      </section>

      <PostRightBar
        v-model:tags="tags"
        class="col-3"
        @open-write-dialog="onOpenWriteDialog"
      />
    </div>
    <PostWriteDialog
      @complete="completeRegistarationPost"
      v-model="postDialog"
    />
  </q-page>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from 'src/service';
import { useAsyncState } from '@vueuse/core';
import { vIntersectionObserver } from '@vueuse/components';
import { usePostQuery } from 'src/composables/usePostQuery';
import { userAuthStore } from 'src/stores/auth';
import { baseNotify } from 'src/utils/notify';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';

const router = useRouter();
const authStore = userAuthStore();

const { category, sort, tags } = usePostQuery();

const params = computed(() => ({
  category: category.value,
  tags: tags.value,
  sort: sort.value,
  limit: 6,
}));
const items = ref([]);
// query 커서의 시작
const start = ref(null);

const isLoadMore = ref(true);

const goPostDetails = id => router.push(`/posts/${id}`);

const postDialog = ref(false);
const onOpenWriteDialog = () => {
  if (!authStore.isAuthenticated)
    return baseNotify('로그인 후 이용할 수 있습니다.', null, false, {
      type: 'warning',
    });
  postDialog.value = true;
};

const { execute } = useAsyncState(getPosts, [], {
  immediate: false,
  throwError: true,
  onSuccess: result => {
    if (start.value) {
      items.value = items.value.concat(result.items);
    } else {
      items.value = result.items;
    }
    isLoadMore.value = result.items.length >= params.value.limit;
    start.value = result.lastItem;
  },
});
watch(
  params,
  () => {
    start.value = null;
    execute(0, params.value);
  },
  {
    deep: true,
    // immediate: true,
  },
);

const completeRegistarationPost = () => {
  postDialog.value = false;
  start.value = null;
  execute(0, params.value);
};

const loadMore = () => {
  execute(0, {
    ...params.value,
    start: start.value,
  });
};

const handleIntersectionObserver = ([{ isIntersecting }]) => {
  if (isIntersecting && isLoadMore.value) {
    loadMore();
  }
};
</script>

<style lang="scss" scoped></style>
