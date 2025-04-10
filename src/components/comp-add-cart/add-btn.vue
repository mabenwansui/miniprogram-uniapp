<template>
  <view
    class="helper"
    v-for="(item, index) in helpers"
    :id="index"
    :key="index"
    :style="{
      transition: `transform ${cssAnimationTime}`,
      transitionTimingFunction: `linear`,
      opacity: item.runing ? 1 : 0,
      transform: `translateX(${item.transformLeft}px)`
    }"
  >
    <view
      class="child"
      :style="{
        transition: `transform ${cssAnimationTime}`,
        transitionTimingFunction: `cubic-bezier(0.55, 0, 0.85, 0.36)`,
        transform: `translateY(${item.transformTop}px)`
      }"
    ></view>
  </view>
  <uni-icons @click="handleClick" class="comp-btn" type="plus-filled" :size="props.size" :color="theme['uni-color-primary']" />
</template>
<script setup lang="ts">
import { nextTick, ref, computed } from 'vue'
import theme from '@/common/theme'
import useQuery from '@/common/hooks/useQuery'
import { getSystemInfo } from '@/common/js/systemInfo'
import type { ClientRect } from '@/common/hooks/useQuery'
const props = defineProps<{
  /** 点击add后，小红点动画位置，默认左下角，如left: -20rpx; 距左下角的左20rpx */
  left?: number
  size?: number
  /** 点击add后，小红点动画位置，默认左下角 */
  bottom?: number
  onClick?: () => void
}>()
interface runItem {
  runing: boolean
  lock: boolean
  transformTop: number
  transformLeft: number
}
const helpers = ref<runItem[]>([])
const query = useQuery()
const { windowHeight } = getSystemInfo()
const animationTime = ref(400)
const cssAnimationTime = computed(() => `${animationTime.value / 1000}s`)
let rapidClickCountLock = false

function addItem() {
  helpers.value.push({
    lock: false,
    runing: false,
    transformTop: 0,
    transformLeft: 0
  })
  return helpers.value[helpers.value.length - 1]
}

function run(item: any) {
  nextTick(async () => {
    item.runing = true
    item.lock = true
    const res = (await query.boundingClientRect('.comp-btn')) as ClientRect
    item.transformTop = windowHeight - res.top - (props.bottom || 0)
    item.transformLeft = -res.left - (props.left || 0)
    setTimeout(() => {
      item.transformTop = 0
      item.transformLeft = 0
      item.runing = false
    }, animationTime.value)
    setTimeout(() => {
      item.lock = false
    }, animationTime.value * 2)  // 需要计算设置为0后的动画执行时间，加上移动到底部的时间，所以是2倍
  })
}

const handleClick = async () => {
  if (rapidClickCountLock === true) return
  rapidClickCountLock = true
  setTimeout(() => (rapidClickCountLock = false), 150)
  let res = helpers.value.find((item) => item.lock === false)
  if (!res) {
    res = addItem()
  }
  run(res)
  props.onClick?.()
}
</script>
<style scoped lang="scss">
.helper {
  width: 36rpx;
  height: 36rpx;
  opacity: 0;
  position: absolute;
  pointer-events: none;
  top: calc(50% - 15rpx);
  left: calc(50% - 15rpx);
  z-index: 200;
  .child {
    width: 100%;
    height: 100%;
    position: absolute;
    background: $uni-color-error;
    border-radius: 50%;    
    z-index: 200;
  }
}
</style>
