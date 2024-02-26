<template>
  <div v-if="code" class="text-red text-center">
    {{  errorMessage  }}
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getErrorMessage } from '/src/utils/firebase/error-message.js';

const props = defineProps({
  code: {
    type: String
  }
});

const errorMessage = computed(() => getErrorMessage[props.code] || '관리자에게 문의해주세요.')
</script>

<style lang="scss" scoped>

</style>