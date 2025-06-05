<template>
  <uni-icons v-if="isCustomIcon" custom-prefix="iconfont" :type="props.type" :color="color" :size="size" />
  <uni-icons v-else :type="props.type" :color="color" :size="size" />
</template>
<script setup lang="ts">
// https://uniapp.dcloud.net.cn/component/uniui/uni-icons.html
// https://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=4938225
import { computed } from 'vue'

type IconType = 'icon-shopping' | 'icon-meal'

const props = defineProps<{
  size?: 'base' | 'small' | 'large' | number
  type: IconType | string
  color?: 'primary' | 'default' | 'success' | 'reverse' | 'error' | string
}>()

const isCustomIcon = computed(() => {
  return props.type.startsWith('icon-')
})

const color = computed(() => {
  switch (props.color) {
    case 'primary':
      return '#008041'
    case 'success':
      return '#4cd964'
    case 'error':
      return '#dd524d'
    case 'inverse':
      return '#fff'
    default:
      if (props.color?.startsWith('#')) {
        return props.color
      }
      return '#909399'
  }
})

const size = computed(() => {
  const _size = props.size || 'base'
  switch (_size) {
    case 'base':
      return 24
    case 'small':
      return 16
    case 'large':
      return 32
    default:
      return _size
  }
})
</script>
