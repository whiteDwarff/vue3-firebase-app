<template>
  <div class="text-h4">
    Home
    <div>{{ $route.name }}</div>
    <div>{{ $route.meta }}</div>
  </div>
</template>

<script setup>

</script>


<!-- 
  unplutin-vue-route의 router 관련 설정 
-->
<route lang="yaml">
name : home-page
meta:
  requiresAuth: true
</route>

<style lang="scss" scoped>

</style>