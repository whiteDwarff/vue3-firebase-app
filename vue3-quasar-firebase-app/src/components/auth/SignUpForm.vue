<template>
  <div>
    <div class="text-h5 text-center text-weight-bold q-mb-xl">회원가입</div>

    <q-form @submit.prevent="handleSubmit" class="q-gutter-y-md">
      <q-input v-model="form.nickname" placeholder="닉네임" outlined dense></q-input>
      <q-input v-model="form.email" placeholder="이메일" outlined dense></q-input>
      <q-input v-model="form.password" type="password" placeholder="비밀번호(문자, 숫자조합 8자 이상)" outlined dense></q-input>
        <q-btn 
          @click="$emit('changeView', 'SignUpForm')"
          label="가입하기" 
          type="submit"
          class="full-width" 
          unelevated
          color="primary" 
        />
      <q-separator />

      <q-btn 
        @click="$emit('changeView', 'SignInForm')"
        label="로그인하기"
        class="full-width" 
        unelevated 
        flat
      />
    </q-form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'; // 컴포저블 함수 
import { signUpWithEmail } from 'src/service';

const emit = defineEmits(['changeView', 'closeDialog']);

const $q = useQuasar();

const form = ref({
  nickname: '',
  email: '',
  password: '',
});

const handleSubmit = async () => {
  await signUpWithEmail(form.value);
  $q.notify({
    // html 속성이 true라면 html 형식으로 notify를 보여줄 수 있다.
    message:
      `
      <div class="text-center">
        <span>회원가입이 완료되었습니다.</span> <br>
        <span>이메일에서 인증 링크를 확인해주세요.</span>
      </div>`,
    html: true,
  });
  emit('closeDialog');
}

  // $q.notify({
  //     progress: true,
  //     message: '세라에게 메일 왔어요.',
  //     icon: 'mail',
  //     color: 'white',
  //     textColor: 'indigo'
  //   })
</script>

<style lang="scss" scoped></style>