<template>
  <q-page>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>
      <q-separator />
      <PostForm
        v-model:title="form.title"
        v-model:content="form.content"
        v-model:category="form.category"
        v-model:tags="form.tags"
        @submit="handleSubmit"
      >
        <template #actions>
          <q-btn flat label="취소하기" v-close-popup />
          <q-btn
            :loading="isLoading"
            type="submit"
            flat
            label="수정하기"
            color="primary"
          />
        </template>
      </PostForm>
    </BaseCard>
  </q-page>
</template>

<script>
const getInitailForm = () => ({
  title: '',
  category: '',
  content: '',
  tags: [],
});
</script>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getPost, updatePost } from 'src/service';
import { useQuasar } from 'quasar';

import BaseCard from 'src/components/base/BaseCard.vue';
import PostForm from 'src/components/apps/post/PostForm.vue';
import { useAsyncState } from '@vueuse/core';

const $q = useQuasar();
const route = useRoute();
const router = useRouter();

const form = ref(getInitailForm());
useAsyncState(
  () => getPost(route.params.id),
  {},
  {
    onSuccess: post => {
      form.value.title = post.title;
      form.value.category = post.category;
      form.value.content = post.content;
      form.value.tags = post.tags;
    },
  },
);

const { isLoading, execute: executeUpdatePost } = useAsyncState(
  updatePost,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: () => {
      $q.notify({
        message: '수정이 완료되었습니다.',
        textColor: 'white',
        timeout: 500,
      });
      router.push(`/posts/${route.params.id}`);
    },
  },
);

const handleSubmit = async () => {
  if (!confirm('게시글을 수정하시겠습니까?')) return;
  await executeUpdatePost(1000, route.params.id, form.value);
};
</script>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  width: 800px
</route>
