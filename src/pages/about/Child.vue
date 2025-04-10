<!-- 子组件 Child.vue -->
<template>
  <view>{{props.num}}</view>
</template>
<script setup>
import { watch } from 'vue'

const props = defineProps({ num: Number })

watch(() => props.num, (newVal, oldVal) => {
  console.log(`num changed from ${oldVal} to ${newVal}`)
})
</script>