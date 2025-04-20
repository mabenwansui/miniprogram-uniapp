<template>
  <view class="action">
    <uni-icons
      v-if="quantity > 0"
      class="comp-btn"
      type="minus"
      :size="btnSize"
      :color="theme['uni-color-primary']"
      @click="handleSubBtnClick"
    />
    <view v-if="quantity > 0" class="quantity">{{ quantity }}</view>
    <addBtn
      v-if="props.addToCartAnimation"
      :left="props.addToCartAnimation.left"
      :bottom="props.addToCartAnimation.bottom"
      :size="btnSize"
      :onClick="handleAddBtnClick"
    />
    <uni-icons
      v-else
      class="comp-btn"
      type="plus-filled"
      :size="btnSize"
      :color="theme['uni-color-primary']"
      @click="handleAddBtnClick"
    />
  </view>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/common/theme'
import addBtn from './add-btn.vue'
interface Props {
  quantity?: number
  btnSize?: number
  addToCartAnimation?: {
    left: number
    bottom: number
  }
  onAddClick?: (quantity: number) => void
  onSubClick?: (quantity: number) => void
}
export interface ClickProps {
  parentIndex: number
  id: string
}
const props = defineProps<Props>()
const quantity = computed(() => props.quantity || 0)
const btnSize = computed(() => props.btnSize || 26)
const handleAddBtnClick = () => props.onAddClick?.(quantity.value + 1)
const handleSubBtnClick = () => props.onSubClick?.(Math.max(quantity.value - 1, 0))
</script>

<style scoped lang="scss">
.action {
  display: flex;
  position: absolute;
  right: 0;
  bottom: 2px;
  .quantity {
    line-height: 54rpx;
    position: relative;
    min-width: 22rpx;
    padding: 0 8rpx;
  }
}
</style>
