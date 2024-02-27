<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">비밀번호 찾기</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="email"
        outlined
        dense 
        placeholder="가입한 이메일"
        hide-bottom-space
        :rules="[validateRequired, validateEmail]"
      />
      <q-btn
        type="submit"
        label="비밀번호 재설정"
        class="full-width bg-primary text-white"
        unelevated
      />

      <q-separator />

      <q-btn
        label="로그인하기"
        class="full-width"
        flat
        @click="$emit('changeView', 'SignInForm')"
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useQuasar } from 'quasar';
import { sendPasswordReset } from "/src/service/index"
import { getErrorMessage } from 'src/utils/firebase/error-message';
import { validateRequired,  validateEmail } from 'src/utils/validate-rules';

const $q = useQuasar();

const emit = defineEmits(['changeView', 'closeDialog']);
const email = ref('');

// 비밀번호 재설정 이메일 보내기 
const handleSubmit = async () => {
  try {
    await sendPasswordReset(email.value);
    $q.notify('이메일로 비밀번호 재설정 링크를 발송하였습니다.');
    emit('closeDialog')
  } catch({code}) {
    getErrorMessage(code);
  }
}
</script>