<template>
  <StickySideBar>
    <q-card flat bordered>
      <q-list bordered separator>
        <!-- :actice  : 현재 탭이 어딘지 확인가능한 속성 -->
        <q-item
          @click="changeCategory(null)"
          :active="category === null || category === ''"
          clickable
          v-ripple
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="cate in categories"
          :key="cate.value"
          clickable
          v-ripple
          @click="changeCategory(cate.value)"
          :active="category === cate.value"
        >
          <q-item-section>{{ cate.label }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/service/category.js';

defineProps({
  category: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['update:category']);

const changeCategory = val => {
  emit('update:category', val);
};
const categories = getCategories();
</script>

<style lang="scss" scoped></style>
