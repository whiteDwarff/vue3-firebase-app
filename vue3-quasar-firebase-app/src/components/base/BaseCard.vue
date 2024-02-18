<template>
  <!-- 
    v-bind="$attrs" 
    부모컴포넌트에서 하위 컴포넌트로 데이터를 전달,
    모든 속성을 포함하는 객체 => 
      - 하위 컴포넌트가 부모 컴포넌트로부터 전달받은 속성들을 그대로 자신의 하위 컴포넌트에 전달할 떄 유용함
      - flat, bordered는 반응형 값이 아니라면 선언할 필요가 없다 !!!
  -->
  <q-card :flat="flat" :bordered="bordered" v-bind="$attrs">
    <template v-for="(_, name) in $slots" :key="name">
      <slot :name="name"></slot>
    </template>
  </q-card>
</template>

<script setup>
defineProps({
  flat: {
    type: Boolean,
    default: true,
  },
  bordered: {
    type: Boolean,
    default: true,
  }
})
</script>

<style lang="scss" scoped>

</style>