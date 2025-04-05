<template>
  <view
    class="helper"
    :style="{
      opacity: runing ? 1 : 0,
      transform: `translateX(${transformLeft}px)`
    }"
  >
    <view
      class="child"
      :style="{
        transform: `translateY(${transformTop}px)`
      }"
    ></view>
  </view>
  <uni-icons @click="handleClick" class="comp-btn" type="plus-filled" size="30" :color="theme['uni-color-primary']" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import theme from '@/common/theme'
import useQuery from '@/common/hooks/useQuery'
import { getSystemInfo } from '@/common/js/systemInfo'
import type { ClientRect } from '@/common/hooks/useQuery'
const props = defineProps<{
  left?: number
  bottom?: number
  onClick?: () => void
}>()
const runing = ref(false)
const transformTop = ref(0)
const transformLeft = ref(0)

const query = useQuery()
const { windowHeight } = getSystemInfo()
const handleClick = async () => {
  const res = (await query.boundingClientRect('.comp-btn')) as ClientRect
  runing.value = true
  transformTop.value = windowHeight - res.top - (props.bottom || 0)
  transformLeft.value = -res.left - (props.left || 0)
  console.log(':::', transformLeft.value)
  setTimeout(() => {
    runing.value = false
    transformTop.value = 0
    transformLeft.value = 0
  }, 600)
}
</script>
<style scoped lang="scss">
$transition: transform 0.4s;
.helper {
  width: 30rpx;
  height: 30rpx;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  top: calc(50% - 15rpx);
  left: calc(50% - 15rpx);
  transition: $transition;
  transition-timing-function: linear;
  z-index: 9999;
  .child {
    width: 100%;
    height: 100%;        
    position: absolute;
    background: rgb(255, 34, 200);
    border-radius: 50%;
    border: 4px solid #000;
    transition: $transition;    
    transition-timing-function: cubic-bezier(0.55, 0, 0.85, 0.36);
    z-index: 9999;
  }
}
</style>
