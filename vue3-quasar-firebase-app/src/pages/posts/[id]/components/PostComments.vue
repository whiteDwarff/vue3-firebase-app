<template>
  <div>
    <div class="text-subtitle1 text-weight-bold q-mb-lg">
      댓글 {{ comments.length }}
    </div>
    <!-- 댓글 작성 input -->

    <div v-if="isActive">
      <q-form @submit="handleAddComment">
        <q-input
          v-model="message"
          type="textarea"
          outlined
          hide-bottom-space=""
          :rules="[validateRequired]"
        />
        <div class="flex justify-end q-gutter-x-sm q-mt-sm">
          <q-btn label="취소" @click="toggleActive" color="dark" unelevated />
          <q-btn
            :loading="isLoading"
            type="submit"
            label="등록"
            color="primary"
            unelevated
          />
        </div>
      </q-form>
    </div>

    <BaseCard v-if="!isActive" @click="toggleActive" class="cursor-pointer">
      <q-card-section class="flex items-center">
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="text-grey-6 q-ml-md">댓글을 작성해보세요.</div>
      </q-card-section>
    </BaseCard>

    <!-- 댓글 리스트 -->
    <CommentList
      :items="comments"
      :post-id="$route.params.id"
      @deleted="executeGetComments(0)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import { useAsyncState } from '@vueuse/core';
import { userAuthStore } from 'src/stores/auth';
import { addComment, getComments } from 'src/service';
import { baseNotify } from 'src/utils/notify';

import CommentList from 'src/components/apps/comments/CommentList.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import { validateRequired } from 'src/utils/validate-rules';

const authStore = userAuthStore();
const route = useRoute();

const toggleActive = () => {
  if (!isActive.value && !authStore.isAuthenticated)
    if (!authStore.isAuthenticated)
      return baseNotify('로그인 후 이용할 수 있습니다.', null, false, {
        type: 'warning',
      });
  isActive.value = !isActive.value;
};
const isActive = ref(false);
const message = ref('');

const { state: comments, execute: executeGetComments } = useAsyncState(
  () => getComments(route.params.id),
  [],
  {
    /*
    !!!! resetOnExecute
     - default: true,
     - comments의 상태를 다시 조회 시 기본값인 [] 빈 배열 상태로 돌아갔다가 데이터를 다시 받아온다.
     - 변수의 상태를 유지하기 위함
    */
    resetOnExecute: false,
  },
);
const { isLoading, execute: executeAddComment } = useAsyncState(
  addComment,
  null,
  {
    immediate: false,
    throwError: true,
    onSuccess: () => {
      message.value = '';
      isActive.value = false;
      executeGetComments(0);
    },
  },
);

const handleAddComment = async () => {
  await executeAddComment(0, route.params.id, {
    message: message.value,
    uid: authStore.uid,
  });
};
</script>

<style lang="scss" scoped></style>
