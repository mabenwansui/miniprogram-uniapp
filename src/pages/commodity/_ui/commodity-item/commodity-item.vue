<template>
  <view class="product-section-item">
    <view class="img" :style="`width: ${props.imgSize}`">
      <comp-commodity-image lazy-load :img-url="props.data?.commodity.coverImageUrl" />
    </view>
    <view class="content">
      <view class="title">{{ props.data.commodity.name }}</view>
      <view class="description">{{ props.data.commodity.description }}</view>
      <view class="price">
        <comp-price>{{ props.data.price }}</comp-price>
      </view>
      <view class="action">
        <comp-add-cart
          :quantity="quantity"
          :btn-size="26"
          :addToCartAnimation="{ left: -40, bottom: 50 }"
          :onChange="handleOnChange"
        />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Branch } from '@/common/types/branch'
interface Props {
  data: Branch
  quantity: number
  /** 要带单位, 如200rpx */
  imgSize?: string
  onQuantityChange?: (item: Branch, quantity: number) => void
}
const props = defineProps<Props>()
const quantity = computed(() => props.quantity || 0)

const handleOnChange = (quantity: number) => {
  props.onQuantityChange?.(props.data, quantity)
}
</script>
<style scoped lang="scss">
.product-section-item {
  display: flex;
  position: relative;
  font-size: 32rpx;
  .img {
    margin-right: 28rpx;
  }
  .content {
    flex: 1;
    .title {
      font-weight: bold;
      font-size: $uni-font-size-lg;
      margin-bottom: 8rpx;
    }
    .description {
      font-size: $uni-font-size-sm;
      color: $uni-text-color-grey;
      min-height: 34px;
    }
    .price {
      font-weight: bold;
    }
    .action {
      display: flex;
      position: absolute;
      right: 0;
      bottom: 2px;
      .quantity {
        position: relative;
        top: 6rpx;
        padding: 0 8rpx;
      }
    }
  }
}
</style>
