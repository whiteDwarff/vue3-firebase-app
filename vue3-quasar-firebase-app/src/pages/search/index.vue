<template>
  <q-page>
    <ais-instant-search :search-client="searchClient" index-name="dev_posts">
      <ais-search-box />
      <ais-hits :transform-items="transformItems">
        <template v-slot="{ items }">
          <!-- <div>{{ items }}</div> -->
          <template v-for="item in items" :key="item.id">
            <PostItem :item="item" />
          </template>
        </template>
      </ais-hits>
    </ais-instant-search>
  </q-page>
</template>

<script setup>
import algoliasearch from 'algoliasearch/lite';
import 'instantsearch.css/themes/algolia-min.css';
import PostItem from 'src/components/apps/post/PostItem.vue';

const searchClient = algoliasearch(
  'T9V7KUR2EV',
  'a989a9b6edb796eb4aabbdf1ce0c5d3b',
);
const transformItems = items => {
  return items.map(item => ({
    id: item.objectID,
    title: item.title,
    content: item.content,
    category: item.category,
    tags: item.tags,
    createdAt: item.createdAt,
    readCount: item.readCount,
    likeCount: item.likeCount,
    bookmarkCount: item.bookmarkCount,
    commentCount: item.commentCount,
    uid: item.uid,
  }));
};
</script>
