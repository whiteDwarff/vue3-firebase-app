<template>
  <q-list class="q-mt-lg bg-white" bordered separator>
    <CommentItem
      v-for="item in items"
      :key="item.id"
      v-bind="item"
      @delete="handleDeleteComments"
    />
  </q-list>
</template>

<script setup>
import { useAsyncState } from '@vueuse/core';
import { deleteComments } from 'src/service';
import { baseNotify } from 'src/utils/notify';

import CommentItem from './CommentItem.vue';
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  postId: {
    type: String,
  },
});
const emit = defineEmits(['deleted']);

const { execute } = useAsyncState(deleteComments, null, {
  immediate: false,
  onSuccess: () => {
    emit('deleted');
    baseNotify('댓글이 삭제되었습니다.');
  },
});
const handleDeleteComments = commentId => {
  const message =
    '<div class="q-px-xl text-weight-bold">댓글을 삭제하시겠습니까?</div><hr>';
  baseNotify(
    message,
    () => {
      execute(0, props.postId, commentId);
    },
    true,
  );
};
</script>

<style lang="scss" scoped></style>
