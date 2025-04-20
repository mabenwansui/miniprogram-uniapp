<template>
  <view class="product-section-item">
    <view class="img" :style="`width: ${props.imgSize}`">
      <comp-commodity-image lazy-load :img-url="props.data?.coverImageUrl" />
    </view>
    <view class="content">
      <view class="title">{{ props.data.name }}</view>
      <view class="description">{{ props.data.description }}</view>
      <view class="price">¥ {{ props.data.price }}</view>
      <view class="action">
        <comp-add-cart
          :quantity="quantity"
          :btn-size="26"
          :addToCartAnimation="{ left: -40, bottom: 50 }"
          :onAddClick="handleAddBtnClick"
          :onSubClick="handleSubBtnClick"
        />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { Commodity } from '@/common/types/commodity'
interface Props {
  data: Commodity
  quantity: number
  /** 要带单位, 如200rpx */
  imgSize?: string
  onAddClick?: (item: ClickProps) => void
  onSubClick?: (item: ClickProps) => void
}
export interface ClickProps {
  quantity: number
  categoryId: string
  commodityId: string
}
const props = defineProps<Props>()
const quantity = computed(() => props.quantity || 0)

const handleAddBtnClick = (quantity: number) => {
  props.onAddClick?.({ commodityId: props.data.commodityId, quantity, categoryId: props.data.categoryId })
}
const handleSubBtnClick = (quantity: number) =>
  props.onSubClick?.({ commodityId: props.data.commodityId, quantity, categoryId: props.data.categoryId })
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
