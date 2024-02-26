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
      
      <!-- <DIsplayError :code="error?.code"/> -->

      <div>
        <q-btn
          type="submit"
          label="로그인하기" 
          class="full-width" 
          unelevated
          color="primary" 
          :loading="isLoading"
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
import { getErrorMessage } from 'src/utils/firebase/error-message.js';


const emit = defineEmits(['changeView', 'closeDialog']);
const $q = useQuasar();

const form = ref({
  email : '',
  password: '',
});
const isLoading = ref(false);
const error = ref(null);

// Google Login
const handleSignInGoogle = async () => {
  isLoading.value = true;
  await signInWithGoogle();
  $q.notify('로그인에 성공하였습니다.');
  emit('closeDialog');
}
// Email Login
const handleSignInEmail = async () => {

  if(form.value.email && form.value.password) {
    try {
      isLoading.value = true;
      const user = await signInWithEmail(form.value);
      $q.notify(`${user.displayName}님 환영합니다.`);
      emit('closeDialog');
    } catch({code}) {
        $q.notify({
          type: 'negative',
          message: getErrorMessage(code),
        });
    } finally {
      isLoading.value = false;
    }
  } else {
    $q.notify({
      type: 'negative',
      message: '이메일/비밀번호를 입력해주세요.'
    })
  }
}
</script>

<style lang="scss" scoped></style>