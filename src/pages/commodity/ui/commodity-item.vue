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
        <uni-icons
          class="comp-btn"
          type="minus"
          size="26"
          :color="theme['uni-color-primary']"
          :onClick="handleSubBtnClick"
          v-if="props.data.quantity"
        />
        <view v-if="props.data.quantity" class="quantity">{{ quantity }}</view>
        <addBtn :left="-40" :bottom="50" :size="26" :onClick="handleAddBtnClick" />
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import theme from '@/common/theme'
import type { Commodity } from '@/common/types/commodity'
import addBtn from './add-btn.vue'
interface Props {
  parentIndex: number
  data: Commodity & {
    /** 购买数量 */
    quantity: number
  }
  /** 要带单位, 如200rpx */
  imgSize?: string  
  onAddClick?: (item: ClickProps) => void
  onSubClick?: (item: ClickProps) => void
}
export interface ClickProps {
  parentIndex: number
  id: string
}
const props = defineProps<Props>()
const quantity = computed(() => props.data.quantity || 0)

const handleAddBtnClick = () => {
  props.onAddClick?.({ id: props.data.id, parentIndex: props.parentIndex })
}
const handleSubBtnClick = () => props.onSubClick?.({ id: props.data.id, parentIndex: props.parentIndex })
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
