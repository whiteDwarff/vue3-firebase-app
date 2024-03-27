<template>
  <BaseCard class="q-pa-lg">
    <div class="flex q-mb-mdd">
      <q-btn
        @click="$router.back()"
        icon="sym_o_arrow_back"
        flat
        round
        dense
        color="grey"
        size="16px"
      />
      <q-space />
      <q-btn icon="sym_o_favorite" flat round dense color="red" size="16px" />
      <q-btn icon="sym_o_bookmark" flat round dense color="blue" size="16px" />
    </div>

    <div class="flex items-center">
      <q-avatar>
        <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      <div class="q-ml-md">
        <div>{{ post.displayName }}</div>
        <div class="text-grey-6">
          {{ post.createdAt }}
          <!-- {{ date.formatDate(post.createdAt, 'YYYY. MM. DD HH:mm:ss') }} -->
        </div>
      </div>
      <q-space />
      <!-- 더보기 btn -->
      <q-btn icon="more_horiz" round flat>
        <q-menu>
          <q-list style="min-width: 100px">
            <q-item
              clickable
              v-close-popup
              :to="`/posts/${$route.params.id}/edit`"
            >
              <q-item-section>수정하기</q-item-section>
            </q-item>
            <q-item @click="handleDeletePost" clickable v-close-popup>
              <q-item-section>삭제하기</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </div>

    <div class="q-mt-md text-h5 text-weight-bold">{{ post.title }}</div>
    <div class="text-teal">
      <span v-for="tag in post.tags" :key="tag"> #{{ tag }}&nbsp; </span>
      {{ post.category }}
    </div>

    <!-- icon box -->
    <div class="row items-center q-gutter-x-md q-mt-md justify-end">
      <PostIcon name="sym_o_visibility" :label="post.readCount" />
      <PostIcon name="sym_o_sms" :label="post.commentCount" />
      <PostIcon name="sym_o_favorite" :label="post.likeCount" />
      <PostIcon name="sym_o_bookmark" :label="post.bookmarkCount" />
    </div>
    <q-separator class="q-my-lg" />

    <TiptabViewer v-if="post.content" :content="post.content" />
  </BaseCard>
</template>

<script setup>
import { date } from 'quasar';
import { deletePost, getPost } from 'src/service';
import { useAsyncState } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { baseNotify } from 'src/utils/notify';
import { formatRelativeTime } from 'src/utils/relative-time-format';

import PostIcon from 'src/components/apps/post/PostIcon.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import TiptabViewer from 'src/components/tiptab/TiptabViewer.vue';

const route = useRoute();
const router = useRouter();

const { state: post, error } = useAsyncState(
  () => getPost(route.params.id),
  {},
);
const isDeleteState = ref(false);

const { execute: executeDeletePost } = useAsyncState(deletePost, null, {
  immediate: false,
  onSuccess: () => {
    if (isDeleteState.value) {
      baseNotify('삭제가 완료되었습니다');
      router.push('/');
    }
  },
});

const handleDeletePost = () => {
  const message =
    '<div class="q-px-xl text-weight-bold">게시글을 삭제하시겠습니까?</div><hr>';
  baseNotify(
    message,
    () => {
      executeDeletePost(0, route.params.id);
      isDeleteState.value = true;
    },
    true,
  );
};
</script>

<style lang="scss" scoped></style>
