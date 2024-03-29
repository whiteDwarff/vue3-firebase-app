<template>
  <PostList :items="items" />
</template>

<script setup>
import { getUserBookmark } from 'src/service';
import { userAuthStore } from 'src/stores/auth';
import { useAsyncState } from '@vueuse/core';
import { ref } from 'vue';

import PostList from 'src/components/apps/post/PostList.vue';

const authStore = userAuthStore();

const posts = ref([]);
const { state: items } = useAsyncState(() => getUserBookmark(authStore.uid));
</script>

<style lang="scss" scoped></style>
