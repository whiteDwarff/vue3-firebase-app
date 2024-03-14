<template>
  <!-- -->
  <q-page padding>
    <div class="row q-col-gutter-x-lg">
      <PostLeftBar v-model:category="params.category" class="col-grow" />

      <section class="col-7">
        <PostHeader />
        <PostList :items="posts" />
      </section>

      <PostRightBar class="col-3" @open-write-dialog="onOpenWriteDialog" />
    </div>
    <PostWriteDialog v-model="postDialog" />
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
});
const goPostDetails = id => router.push(`/posts/${id}`);

const postDialog = ref(false);
const onOpenWriteDialog = () => {
  postDialog.value = true;
};

/**
 * ## state
 *  - 반환값, defaultName 설정 가능
 *
 * ## execute
 *  - 변경사항이 생기면 실행되는 메서드
 *
 * ## useAsyncState
 * 1. 실행시킬 메서드
 * 2. 초기값
 * 3. 옵션
 *  - immediate  : 즉시실행 여부
 *  - throwError : 에러발생 시 예외처리
 */
const { state: posts, execute } = useAsyncState(getPosts, [], {
  throwError: true,
});
watch(
  params,
  () => {
    execute(0, params.value);
  },
  {
    // object인 params를 감시하기 위함
    deep: true,
  },
);
</script>

<style lang="scss" scoped></style>
