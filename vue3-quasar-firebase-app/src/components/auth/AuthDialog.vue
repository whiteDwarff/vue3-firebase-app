<template>
  <q-dialog 
    :model-value="modelValue"
    @update:model-value="(val) => $emit('update:modelValue', val)"
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
        <SignInForm />
      </q-card-section>
      
    </q-card>
  </q-dialog>
</template>

<script setup>
import SignUpForm from './SignUpForm.vue';
import SignInForm from './SignInForm.vue';
import FindPsswordForm from './Findpasswordform.vue';
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped></style>