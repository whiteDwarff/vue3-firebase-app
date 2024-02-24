<template>
  <!-- page (Layout)단위 component는 반드시 <q-layout>으로 생성되어야 한다. -->
  <q-layout view="lHh Lpr lff" class="bg-grey-2">

    <q-header bordered class="bg-white text-grey-9">
      <q-toolbar> 
          <q-btn flat dense to="/">
            <q-toolbar-title>
              <q-avatar>
                <img src="/captin.jpeg">
              </q-avatar>
              Title
            </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-btn stretch flat label="Home" to="/home" />
        <q-btn 
          stretch
          flat 
          label="수강하기"
          href="https://google.com"
          target="_blank"
        />
        <q-btn 
          stretch
          flat 
          label="온라인 강의"
          href="https://edu.gymcoading.co"
          target="_blank"
        />
        <q-btn 
          stretch
          flat 
          label="유튜브"
          href="https://youtube.com"
          target="_blank"
        />
    
        <q-separator class="q-my-md q-mr-md" vertical />

        <q-btn 
          v-if="!authStore.isAuthenticated"
          @click="openAuthDialog"
          unelevated 
          rounded 
          color="primary" 
          label="로그인 / 회원가입"
        />

        <!-- 로그인 시  사용자 썸네일 노출-->
        <q-btn  v-if="authStore.isAuthenticated" round flat>
          <q-avatar>
            <img :src="authStore.user.photoURL || generageDefaultPhotoURL(authStore.user.uid)">
          </q-avatar>
          <q-menu>
            <q-list style="min-width: 170px">
              <!-- 이메일 인증이 완료된  사용자  -->
            <q-item 
              v-if="authStore.user.emailVerified"
              clickable
              v-close-popup
              to="/mypage/profile"
            >
              <q-item-section>프로필</q-item-section>
            </q-item>
            <!-- 이메일 인증이 완료되지 않은 사용자 -->
              <q-item 
                v-else
                clickable
                v-close-popup
              >
                <q-item-section 
                  @click="verifyEmail"
                  class="text-red"
                >이메일을 인증해주세요.</q-item-section>
              </q-item>
              <q-item @click="handleLogOut" clickable v-close-popup>
                <q-item-section>로그아웃</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container :style="pageContainerStyles">
      <router-view />
    </q-page-container>

    <AuthDialog v-model="authDialog" />

  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userAuthStore } from 'src/stores/auth';
import { logOut, generageDefaultPhotoURL, sendVerificationEmail } from 'src/service';
import { useQuasar } from 'quasar';
import AuthDialog from 'src/components/auth/AuthDialog.vue';

const $q = useQuasar();
const authStore = userAuthStore();
const route = useRoute();
const router = useRouter();

const handleLogOut = async () => {
  await logOut();
  $q.notify('로그아웃 되었습니다.');
  router.push('/');
}

const verifyEmail = async () => {
  try {
    await sendVerificationEmail();
    $q.notify('이메일로 인증메일을 발송하였습니다.');
  } catch({code}) {
    return code == 'auth/network-request-failed' ? $q.notify('네트워크 연결이 원활하지 않습니다') : '';
  }
}

const pageContainerStyles = computed(() => ({
  // route의 meta 속성에 width가 있다면 width, 없다면 1080px 
  // <router lang="yaml"> 속성
  maxWidth :  route.meta?.width || '1080px',
  margin : '0 auto',
}));

const authDialog = ref(false);
const openAuthDialog = () => authDialog.value = true;

</script>