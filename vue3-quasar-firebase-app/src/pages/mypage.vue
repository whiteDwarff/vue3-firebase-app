<template>
  <div>
    <div class="text-h4">MyPage</div>
    <ul>
      <li>
        <router-link to="/mypage/profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/mypage/password">Password</router-link>
      </li>
      <li>
        <router-link to="/mypage/bookmark">Bookmark</router-link>
      </li>
    </ul>

    <!-- 상위 router-link를 클릭하면 랜더링되는 view !!! -->
    <router-view></router-view>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>