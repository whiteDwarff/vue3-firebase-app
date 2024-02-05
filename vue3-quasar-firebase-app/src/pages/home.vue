<template>
  <!-- -->
  <q-page>
    <div class="text-h4">Home</div>
      <q-card v-for="id in 100" :key="id">
        <q-card-section>{{ id }} 게시글</q-card-section>
      </q-card>
  </q-page>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>

<!-- 
  unplutin-vue-route의 router 관련 설정 
-->
<route lang="yaml">
name : home-page
meta:
  requiresAuth: true
  width: 600px
</route>

<style lang="scss" scoped>

</style>