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
      >
        <template #actions>
          <q-btn flat label="취소하기" v-close-popup />
          <q-btn
            :loading="isLoading"
            type="submit"
            flat
            label="저장하기"
            color="primary"
          />
        </template>
      </PostForm>
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
import { createPost, createSequence } from 'src/service';
import { useAsyncState } from '@vueuse/core';
import { userAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';

import PostForm from 'src/components/apps/post/PostForm.vue';

const $q = useQuasar();

const authStore = userAuthStore();
const router = useRouter();
const emit = defineEmits(['complete']);

const form = ref(getInitailForm());
const onHide = () => {
  form.value = getInitailForm();
};

const { isLoading, execute } = useAsyncState(createSequence, null, {
  immediate: false,
  throwError: true,
  onSuccess: sequence => {
    emit('complete');
    createPost(
      {
        ...form.value,
        displayName: authStore?.user?.displayName || null,
        uid: authStore?.user?.uid || null,
      },
      sequence,
    );
    $q.notify({
      message: '등록이 완료되었습니다.',
      timeout: 500,
    });
    router.push(`posts/${sequence}`);
  },
});
const handleSubmit = async () => {
  await execute(1000, {});
};
</script>

<style lang="scss" scoped></style>
