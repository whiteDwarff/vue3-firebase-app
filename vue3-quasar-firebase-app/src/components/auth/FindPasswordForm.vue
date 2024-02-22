<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">비밀번호 찾기</div>
    <q-form class="q-gutter-y-md" @submit.prevent="handleSubmit">
      <q-input
        v-model="email"
        outlined
        dense 
        placeholder="가입한 이메일"
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

const $q = useQuasar();

const emit = defineEmits(['changeView', 'closeDialog']);
const email = ref('');

// 비밀번호 재설정 이메일 보내기 
const handleSubmit = async () => {
  try {
    await sendPasswordReset(email.value);
    $q.notify('이메일로 비밀번호 재설정 링크를 발송하였습니다.');
    emit('closeDialog')
  } catch(err) {
    return err.code == 'auth/invalid-email' ? $q.notify('가입되지 않은 이메일입니다.') : $q.notify('네트워크 연결이 원활하지 않습니다.');
  }
}
</script>