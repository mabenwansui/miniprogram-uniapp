<template>
  <view class="summary-wrap">
    <view class="summary-wrap-main">
      <view class="amount-block">
        合计
        <comp-price class="amount">{{ props.order?.actualAmount }}</comp-price>
      </view>
    </view>
    <view class="actions">
      <button @click="emit('submit')" type="primary" hover-class="button-hover" class="btn-primary">下单并支付</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { OrderInfo } from '@/common/types/order'
const props = defineProps<{ order?: OrderInfo }>()
const emit = defineEmits(['submit'])
</script>
<style scoped lang="scss">
.summary-wrap {
  width: 100vw;
  position: fixed;
  z-index: 50;
  bottom: 0;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 32rpx 36rpx 32rpx 36rpx;
  background: #fff;
  .summary-wrap-main {
    display: flex;
    margin-left: 8rpx;
    align-items: center;
  }
  .icon-shopping-cart {
    width: 60rpx;
    height: 60rpx;
  }
  .amount-block {
    font-size: $uni-font-size-lg;
    .amount {
      margin: 4rpx 0 0 8rpx;
      font-size: 48rpx;
      font-weight: 700;
      color: $uni-color-error;
    }
  }

  .actions {
    .btn-primary {
      padding-left: 48rpx;
      padding-right: 48rpx;
      border-radius: $uni-border-radius-round;
    }
  }
}
</style>
