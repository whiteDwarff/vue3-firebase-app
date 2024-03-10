<template>
  <q-page>
    <BaseCard>
      <q-toolbar>
        <q-toolbar-title>글쓰기</q-toolbar-title>
      </q-toolbar>

      <q-separator />

      <PostForm 
        v-model:title="form.title"
        v-model:content="form.content"
        v-model:tags="form.tags"
        @submit.prevent
      />
    </BaseCard>
  </q-page>
</template>


<script>
const getInitailForm = () => ({
  title: '',
  content: '',
  category: '',
  tags: [],
})
</script>

<script setup>
import { ref } from 'vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import PostForm from 'src/components/apps/post/PostForm.vue';

const form = ref(getInitailForm());

</script>

<style lang="scss" scoped></style>

<route lang="yaml">
  meta:
    width: 800px
</route>