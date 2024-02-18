<template>
  <StickySideBar>
    <q-card flat bordered>

      <q-list bordered separator>
        <!-- :actice  : 현재 탭이 어딘지 확인가능한 속성 -->
        <q-item
          :active="true"
          clickable
          v-ripple
        >
          <q-item-section>전체</q-item-section>
        </q-item>
        <q-item
          v-for="category in categories" :key="category.value"
          clickable
          v-ripple
        >
          <q-item-section>{{ category.label }}</q-item-section>
        </q-item>
      </q-list>

    </q-card>

  </StickySideBar>
</template>

<script setup>
import StickySideBar from 'src/components/StickySideBar.vue';
import { getCategories } from 'src/service/category.js';

const categories = getCategories();
</script>

<style lang="scss" scoped>
</style>