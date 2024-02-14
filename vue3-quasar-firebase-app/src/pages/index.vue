<template>
  <!-- -->
  <q-page padding>
    <div class="text-h4">커뮤니티 목록</div>
    <section class="q-gutter-y-sm q-mt-lg">
      <PostList :items="posts" />
    </section>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PostList from 'src/components/apps/post/PostList.vue';

const router = useRouter();
const goPostDetails = id => router.push(`/posts/${id}`);

const posts = Array.from(Array(20), (_, index) =>({
  id: index,
  title: 'Vue3 Firebase' + index,  
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore dolor eos cupiditate beatae, accusantium at veritatis est inventore eveniet omnis porro in rerum quis exercitationem esse, quas autem deserunt nam?',
  readCount: 1,
  commentCount: 2,
  likeCount: 3,
  bookmarkCount: 4,
  tags: ['html', 'css', 'javascript'],
  uid: 'uid',
  category: '카테고리' + index,
}))
</script>

<style lang="scss" scoped>

</style>
<!-- 
  router-link :to="" : 
    => <a> 태그 랜더링, SEO 최적화에 좋음 (검색엔진에 노출이 되기 싶다 )
  
  router.push()
    => eventListener
-->