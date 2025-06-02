<template>
  <view class="commodity-list">
    <comp-card>
      <view class="cart-title">待下单</view>
      <view class="list">
        <view v-for="item in props.commoditys" :key="item.branch.id" class="list-item">
          <view class="img">
            <comp-commodity-image size="small" :imgUrl="item.branch.commodity.coverImageUrl" />
          </view>
          <view class="content">
            <view class="title">
              {{ item.branch.commodity.name }}
            </view>
            <view class="footer"> × {{ item.quantity }} 份 </view>
          </view>
          <view class="aside">
            <view class="price">
              {{ '¥' + item.branch.commodity.originalPrice }}
            </view>
            <view class="price-important">
              {{ '¥' + item.branch.price }}
            </view>
          </view>
        </view>
      </view>
    </comp-card>
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { OrderInfo } from '@/common/types/order'
const props = defineProps<{ commoditys: OrderInfo['commoditys'] }>()
</script>

<style scoped lang="scss">
.commodity-list {
  .cart-title {
    display: flex;
    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 8rpx;
      border-radius: $uni-border-radius-sm;
      background-color: $uni-color-primary;
    }
    align-items: center;
    font-weight: bold;
  }
  .list {
    margin-top: 32rpx;
    .list-item {
      display: flex;
      margin-bottom: 28rpx;
      &:last-child {
        margin-bottom: 0;
      }
      .img {
        margin-right: 20rpx;
      }
      .content {
        display: flex;
        flex-wrap: wrap;
        align-content: space-between;
        .title {
          width: 100%;
        }
        .footer {
          color: $uni-text-color-secondary;
          padding-bottom: 10rpx;
        }
      }
    }
  }
}
</style>
