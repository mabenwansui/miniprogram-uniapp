<template>
  <uni-icons :type="props.type" :class="props.class" :color="color" :size="size" />
</template>
<script setup lang="ts">
// https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html
import { computed } from 'vue'
const props = defineProps<{
  class?: string
  size?: 'base' | 'small' | 'large' | number
  type: string
  color?: 'primary' | 'info' | 'success' | string
}>()

const color = computed(() => {
  switch (props.color) {
    case 'primary':
      return '#008041'
    case 'info':
      return '#909399'
    case 'success':
      return '#4cd964'
    default:
      return props.color
  }
})

const size = computed(() => {
  switch (props.size) {
    case 'base':
      return 24
    case 'small':
      return 16
    case 'large':
      return 32
    default:
      return props.size
  }
})
</script>
<style scoped lang="scss"></style>