<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ minwidth: '660px' }">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </q-toolbar>

      <q-separator />

      <PostForm
        v-model:title="form.title"
        v-model:content="form.content"
        v-model:category="form.category"
        v-model:tags="form.tags"
        :loading="isLoading"
        @submit="handleSubmit"
      />
    </q-card>
  </q-dialog>
</template>

<script>
const getInitailForm = () => ({
  title: '',
  content: '',
  category: '',
  tags: [],
});
</script>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCategories } from 'src/service/category.js';
import { createPost } from 'src/service';
import { useAsyncState } from '@vueuse/core';
import { userAuthStore } from 'src/stores/auth';
import PostForm from 'src/components/apps/post/PostForm.vue';

const authStore = userAuthStore();
const router = useRouter();

const form = ref(getInitailForm());
const onHide = () => {
  form.value = getInitailForm();
};

const { isLoading, execute } = useAsyncState(createPost, null, {
  immediate: false,
  throwError: true,
  onSuccess: postId => {
    console.log('postId', postId);
    router.push(`/posts/${postId}`);
  },
});
const handleSubmit = async () => {
  await execute(1000, {
    ...form.value,
    uid: authStore.uid,
  });
};
</script>

<style lang="scss" scoped></style>
