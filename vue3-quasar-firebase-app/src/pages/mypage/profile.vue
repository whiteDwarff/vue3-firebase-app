<template>
  <div class="q-gutter-y-md">
    <BaseCard>
      <q-form @submit.prevent="handleConfirmMessage(handleSubmitProfile)"> 
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">프로필 변경 </div>
          <q-input v-model="displayName" outlined dense label="닉네임" />
        </q-card-section>
        
        <q-separator class="q-my-md"></q-separator>
        
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary"/>
        </q-card-actions>
      </q-form>
    </BaseCard>

    <BaseCard>
      <q-form @submit.prevent="handleConfirmMessage(handleSubmitEmail, '이메일')">
        <q-card-section class="q-gutter-y-md">
          <div class="text-h6">이메일 변경</div>
          <q-input v-model="email" outlined dense label="이메일" />
        </q-card-section>
        
        <q-separator class="q-my-md"></q-separator>
        
        <q-card-actions>
          <q-space />
          <q-btn type="submit" label="저장하기" flat color="primary"/>
        </q-card-actions>
      </q-form>
    </BaseCard>
  </div>
</template>

<script setup>
import { updateUserEmail, updateUserProfile } from 'src/service';
import { ref, watchEffect } from 'vue';
import { userAuthStore } from 'src/stores/auth';
import { useQuasar } from 'quasar';
import BaseCard from 'src/components/base/BaseCard.vue';

const authStore = userAuthStore();
const $q = useQuasar();

const displayName = ref('');
const email = ref('');

// notify로 confirm 활성화
const handleConfirmMessage = (asyncFunction, info="프로필") => {
  $q.notify({
    message:
      `<div class="q-px-xl text-weight-bold">${info}을 수정하시겠습니까?</div><hr>`,
    html: true,
    progress: true,
    actions: [
      { label : '취소', color: 'red',handler: () => { return } },
      { label : '확인', handler: () => {  asyncFunction();  } }
    ]
  });
}

const handleSubmitProfile = async () => {
  if(!displayName.value.trim()) return $q.notify('프로필을 입력해주세요');

  try {
    await updateUserProfile(displayName.value);
    $q.notify('프로필이 수정되었습니다.');
  } catch {
    $q.notify('네트워크 연결이 원활하지 않습니다.');
  }
}

const handleSubmitEmail = async () => {
  if(!email.value.trim()) return $q.notify('이메일을 입력해주세요');

  try {
    await updateUserEmail(email.value);
    $q.notify('이메일이 수정되었습니다.');
  } catch ({code}){
    console.log(code);
    $q.notify('네트워크 연결이 원활하지 않습니다.');
  }
}

watchEffect(() => {
  displayName.value = authStore.user?.displayName;
  email.value = authStore.user?.email;
});
</script>

<style lang="scss" scoped>

</style>