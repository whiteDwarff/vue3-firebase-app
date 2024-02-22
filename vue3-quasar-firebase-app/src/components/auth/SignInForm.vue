<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">로그인</div>

    <q-form @submit.prevent="handleSignInEmail" class="q-gutter-y-md">
      <q-input
        v-model="form.email"
        placeholder="이메일"
        outlined 
        dense
      />
      <q-input
        v-model="form.password"
        type="password"
        placeholder="비밀번호"
        outlined 
        dense
      />
      <div>
        <q-btn
          type="submit"
          label="로그인하기" 
          class="full-width" 
          unelevated
          color="primary" 
        />
        
        <div class="flex justify-between">
          <q-btn 
          @click="$emit('changeView', 'FindPasswordForm')"
            label="비밀번호 찾기" 
            color="secondary" 
            flat 
            dense 
            size="13px"
          />
          <q-btn
            @click="$emit('changeView', 'SignUpForm')"
            label="이메일 가입하기"
            color="secondary" 
            flat 
            dense
            size="13px" 
          />
        </div>
    </div>
      
      <q-separator />
      <q-btn 
        @click="handleSignInGoogle"
        label="구글 계정으로 로그인하기"
        class="full-width" 
        unelevated 
        color="primary"
        outline
      />
    </q-form>
  </div>
</template>

<script setup>
import { signInWithGoogle, signInWithEmail } from 'src/service/auth';
import { useQuasar } from 'quasar'; // 컴포저블 함수 
import { ref } from 'vue';

const emit = defineEmits(['changeView', 'closeDialog']);
const $q = useQuasar();

const form = ref({
  email : '',
  password: '',
});

// Google Login
const handleSignInGoogle = async () => {
  await signInWithGoogle();
  $q.notify('로그인에 성공하였습니다.');
  emit('closeDialog');
}
// Email Login
const handleSignInEmail = async () => {
  try {
    const user = await signInWithEmail(form.value);
    $q.notify(`${user.displayName}님 환영합니다.`);
    emit('closeDialog');
  } catch(err) {
    if(err.code == 'auth/invalid-email') $q.notify('가입된 이메일이 없습니다.');
    else if(err.code == 'auth/invalid-credential') $q.notify('비밀번호가 일치하지 않습니다.');
    else $q.notify('네트워크 연결이 원활하지 않습니다.');
  }
}
</script>

<style lang="scss" scoped></style>