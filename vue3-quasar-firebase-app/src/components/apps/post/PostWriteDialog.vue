<template>
  <q-dialog persistent v-bind="$attrs" @hide="onHide">
    <q-card :style="{ minwidth: '660px'}">
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
        <q-btn v-close-popup flat round dense icon="close"></q-btn>
      </q-toolbar>

      <q-separator />

      <PostForm 
        v-model:title="form.title"
        v-model:content="form.content"
        v-model:tags="form.tags"
      />
    </q-card>
  </q-dialog>
  </template>


<script>
/*
TODO: Fallthrough, $attrs 속성 공식문서 확인
Fallthrough 속성 제어 
  export default {
    inheritAttrs: false,
  }
*/
const getInitailForm = () => ({
  title: '',
  content: '',
  category: '',
  tags: [],
})
</script>
<script setup>
import { ref } from 'vue';
import { getCategories } from 'src/service/category.js';
import PostForm from 'src/components/apps/post/PostForm.vue';

const form = ref(getInitailForm());
const onHide = () => {
  form.value = getInitailForm();
}
</script>

<style lang="scss" scoped></style>