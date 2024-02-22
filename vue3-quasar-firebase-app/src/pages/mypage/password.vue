<template>
  <BaseCard>
    <q-form @submit.prevent="handleSubmit" >
      <q-card-section class="q-gutter-y-md">
        <div class="text-h6">비밀번호 변경</div>
        <q-input v-model="form.newPassword" type="password" outlined dense label="새로운 비밀번호" />
        <q-input v-model="form.newPasswordConfirm" type="password" outlined dense label="새로운 비밀번호 확인" />
      </q-card-section>
      
      <q-separator class="q-my-md"></q-separator>
      
      <q-card-actions>
        <q-space />
        <q-btn type="submit" label="저장하기" flat color="primary"/>
      </q-card-actions>
    </q-form>
  </BaseCard>
</template>

<script setup>
import BaseCard from 'src/components/base/BaseCard.vue';
import { updateUserPassword } from 'src/service';
import { useQuasar } from 'quasar';
import { ref } from 'vue';

const $q = useQuasar();

const form = ref({
  newPassword : '',
  newPasswordConfirm : ''
});
// 비밀번호 변경하기
const handleSubmit = async () => {
  if(form.value.newPassword == form.value.newPasswordConfirm) {
    try {
      await updateUserPassword(form.value.newPassword);
      $q.notify('비밀번호가 변경 되었습니다.');
      form.value.newPassword = '';
      form.value.newPasswordConfirm = '';
    } catch(err) {
      $q.notify('네트워크 연결이 원활하지 않습니다.')
    }
  } else {
    $q.notify('비밀번호가 일치하지 않습니다.');
  }
}
</script>

<style lang="scss" scoped>

</style>