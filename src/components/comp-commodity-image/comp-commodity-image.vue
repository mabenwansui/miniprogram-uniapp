<template>
  <image
    :style="`width: ${size}; height: ${size};`"
    :class="[`img-item`, `com-commodity-image-${sizeClass}`, props.class]"
    :src="imgUrl"
    :lazy-load="lazyLoad"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import commodityPlacholderUrl from '@/common/images/commodity-placholder.svg'
interface Props {
  size?: 'middle' | 'large' | 'small'
  lazyLoad?: boolean
  class?: string
  imgUrl?: string
}
const props = defineProps<Props>()
const imgUrl = computed(() => props.imgUrl || commodityPlacholderUrl)
const lazyLoad = computed(() => props.lazyLoad || false)
const sizeClass = computed(() => props.size || 'middle')

</script>
<style scoped lang="scss">
.com-commodity-image-large {
  width: 300rpx;
  height: 300rpx;
}
.com-commodity-image-middle {
  width: 160rpx;
  height: 160rpx;
}
.com-commodity-image-small {
  width: 100rpx;
  height: 100rpx;
}
</style>
