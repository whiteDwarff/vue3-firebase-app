<template>
  <!-- -->
  <q-page padding>
    <div class="text-h4">게시글 상세</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <q-card v-for="id in 100" :key="id" @click="goPostDetails(id)">
        <q-card-section>{{ id }} 게시글</q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPostDetails = id => router.push(`/posts/${id}`);

</script>

<style lang="scss" scoped>

</style>
<!-- 
  router-link :to="" : 
    => <a> 태그 랜더링, SEO 최적화에 좋음 (검색엔진에 노출이 되기 싶다 )
  
  router.push()
    => eventListener
-->