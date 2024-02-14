<template>
  <!-- @hide="" q-dialog의 dialog가 닫힐 경우 발생하는 이벤트 -->
  <q-dialog 
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
    @hide="changeViewMode('SignInForm')"
    transition-show="none"
    transition-hide="none"
  >
    <q-card :style="{ width: '400px' }">
      <q-card-section class="flex">
        <q-space />
        <q-btn 
          icon="close"
          flat 
          round 
          dense 
          v-close-popup
        />
      </q-card-section>

      <q-card-section class="q-px-xl q-pb-xl">
        <!--
          v-if를 활용한 조건부 랜더링 **
            <SignInForm
            v-if="viewMode == 'SignInForm'" 
            @change-view="changeViewMode"
            />
            <SignUpForm
            v-else-if="viewMode == 'SignUpForm'"
            @change-view="changeViewMode"
            />
            <FindPasswordForm
            v-else 
            @change-view="changeViewMode"
            />
          -->


          <!-- Dynamic Component -->
          <component 
            :is="authViewComponents[viewMode]" 
            @change-view="changeViewMode"
          />
      </q-card-section>
      
    </q-card>
  </q-dialog>
</template>

<script setup>
/*
import SignUpForm from './SignUpForm.vue';
import SignInForm from './SignInForm.vue';
import FindPasswordForm from './FindPasswordForm.vue';
*/
import { ref, defineAsyncComponent } from 'vue';
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);

// --------------------------------------------------
// 반응형 상태 값
const viewMode = ref('SignInForm');
const changeViewMode = mode => viewMode.value = mode;

// Lazy Loading : defineAsyncComponent()
const authViewComponents = {
  SignInForm: defineAsyncComponent(() => import('./SignInForm.vue')),
  SignUpForm: defineAsyncComponent(() => import('./SignUpForm.vue')),
  FindPasswordForm: defineAsyncComponent(() => import('./FindPasswordForm.vue'))
};

/*
const authViewComponents = {
  SignInForm,
  SignUpForm,
  FindPasswordForm
};
*/

</script>

<style lang="scss" scoped></style>