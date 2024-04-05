<template>
  <!-- q-item에 :to="" 속성 사용 시 <div>가 아닌 <a>로 렌더링 된다. -->
  <q-item :to="`/posts/${item.id}`" class="bg-white q-pt-md" clickable>
    <q-item-section avatar top>
      <!-- 유저의 썸네일 -->
      <q-avatar>
        <img :src="postUser?.photoURL" />
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <div class="flex items-center">
        <span>{{ postUser?.displayName }}</span>
        <span class="q-mx-sm">&middot;</span>
        <span> {{ formatRelativeTime(item?.createdAt) }}</span>
        <q-chip class="q-ml-sm" dense color="primary" text-color="white">
          {{ item.category }}
        </q-chip>
      </div>
      <div class="text-h6 q-mt-sm">{{ item.title }}</div>
      <div class="text-primary text-caption">
        <span v-for="tag of item.tags" :key="tag" class="q-mr-sm">
          #{{ tag }}
        </span>
      </div>
      <div
        class="text-grey-6 q-my-sm ellipsis-2-lines"
        v-html="item.content"
      ></div>

      <!-- icon box -->
      <div class="row items-center">
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_visibility"
              :label="item.readCount"
              tooltip="조회수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <PostIcon
              name="sym_o_sms"
              :label="item.commentCount"
              tooltip="댓글수"
            />
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn @click.prevent="toggleLike" class="full-width" flat dense>
              <PostIcon
                :name="isLike ? 'favorite' : 'sym_o_favorite'"
                :label="likeCount"
                tooltip="좋아요"
              />
            </q-btn>
          </div>
        </div>
        <div class="col-3">
          <div class="flex flex-center">
            <q-btn
              @click.prevent="toggleBookmark"
              class="full-width"
              flat
              dense
            >
              <PostIcon
                :name="isBookmark ? 'bookmark' : 'sym_o_bookmark'"
                :label="bookmarkCount"
                tooltip="북마크"
              />
            </q-btn>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { formatRelativeTime } from 'src/utils/relative-time-format';
import { useLike } from 'src/composables/useLike';
import { useBookmark } from 'src/composables/useBookmark';
import { useAsyncState } from '@vueuse/core';
import { getUserById } from 'src/service';

import PostIcon from './PostIcon.vue';

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const { isLike, likeCount, toggleLike } = useLike(props.item.id, {
  initialCount: props.item.likeCount,
});
const { isBookmark, bookmarkCount, toggleBookmark } = useBookmark(
  props.item.id,
  {
    initialCount: props.item.bookmarkCount,
  },
);
const { state: postUser } = useAsyncState(
  () => getUserById(props.item.uid),
  {},
);
</script>

<style lang="scss" scoped></style>
