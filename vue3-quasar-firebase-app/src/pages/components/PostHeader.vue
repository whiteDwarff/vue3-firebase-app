<template>
  <div class="flex items-center q-mb-lg">
    <div class="text-h5">커뮤니티 목록</div>

    <q-space />

    <q-tabs v-model="sort" narrow-indicator dense>
      <!-- :rapple="false"  : tab을 누르면 발생하는 물방울 모양 이벤트 제거  -->
      <q-tab :rapple="false" label="최신순" name="createdAt" />
      <q-tab :rapple="false" label="조회순" name="readCount" />
      <q-tab :rapple="false" label="좋아요순" name="likeCount" />
    </q-tabs>
  </div>
</template>

<script setup>
const sort = defineModel('sort', {
  type: String,
  default: 'createdAt',
});
/*
defineProps({
  sort: {
    type: String,
    default: 'createdAt',
  },
});
defineEmits('[update:sort]');
*/
</script>

<style lang="scss" scoped></style>
