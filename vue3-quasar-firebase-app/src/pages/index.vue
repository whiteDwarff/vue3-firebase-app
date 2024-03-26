<template>
  <!-- -->
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar v-model:category="params.category" class="col-grow" />
      <section class="col-7">
        <PostHeader v-model:sort="params.sort" />

        <PostList :items="items" />

        <q-btn
          v-if="isLoadMore"
          @click="loadMore"
          class="full-width q-mt-md"
          label="더보기"
          outline
        />
      </section>

      <PostRightBar
        v-model:tags="params.tags"
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
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getPosts } from 'src/service';
import { useAsyncState } from '@vueuse/core';

import PostList from 'src/components/apps/post/PostList.vue';
import PostHeader from './components/PostHeader.vue';
import PostLeftBar from './components/PostLeftBar.vue';
import PostRightBar from './components/PostRightBar.vue';
import PostWriteDialog from 'src/components/apps/post/PostWriteDialog.vue';

const router = useRouter();

const params = ref({
  category: null,
  tags: [],
  sort: 'createdAt',
  limit: 2,
});
const items = ref([]);
// query 커서의 시작
const start = ref(null);

const isLoadMore = ref(true);

const goPostDetails = id => router.push(`/posts/${id}`);

const postDialog = ref(false);
const onOpenWriteDialog = () => {
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
    immediate: true,
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
</script>

<style lang="scss" scoped></style>
