<template>
  <view class="commodity-list" v-if="props.order">
    <comp-card title="待下单">
      <view class="order-list">
        <view v-for="item in props.order.commoditys" :key="item.branch.id" class="list-item">
          <view class="img">
            <comp-commodity-image size="small" :imgUrl="item.branch.commodity.coverImageUrl" />
          </view>
          <view class="content">
            <view class="title">
              {{ item.branch.commodity.name }}
            </view>
            <view class="secondary"> × {{ item.quantity }} 份 </view>
          </view>
          <view class="aside">
            <view class="price">
              <comp-price>{{ item.branch.originalPrice }}</comp-price>
            </view>
            <view class="price-important">
              <text class="help">优惠后</text>
              <comp-price>{{ item.branch.price }} </comp-price>
            </view>
          </view>
        </view>
      </view>
      <view class="simple-wrap">
        <view class="list-item">
          <view class="title">打包费用</view>
          <view class="aside">
            <comp-price>10</comp-price>
          </view>
        </view>
      </view>
      <view class="footer">
        <view></view>
        <view>
          总计
          <comp-price class="amount">{{ props.order.actualAmount }}</comp-price>
        </view>
      </view>
    </comp-card>
  </view>
</template>

<script setup lang="ts">
import type { OrderInfo } from '@/common/types/order'
const props = defineProps<{ order?: OrderInfo }>()
</script>

<style scoped lang="scss">
.commodity-list {
  .order-list {
    margin-top: 32rpx;
    .list-item {
      display: flex;
      margin-bottom: 28rpx;
      position: relative;
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
        .secondary {
          color: $uni-text-color-secondary;
          padding-bottom: 10rpx;
        }
      }
      .aside {
        position: absolute;
        top: 0;
        right: 0;
        text-align: right;
        .price-important {
          color: $uni-color-error;
          font-weight: bold;
          font-size: 32rpx;
          padding-top: 4rpx;
          .help {
            font-weight: normal;
            font-size: 24rpx;
            margin-right: 8rpx;
          }
        }
      }
    }
  }
  .simple-wrap {
    .list-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 28rpx;
    }
  }
  .footer {
    display: flex;
    padding: 20rpx 0 8rpx;
    justify-content: space-between;
    border-top: 1px solid $uni-border-light-color;
    .amount {
      margin-left: 8rpx;
      color: $uni-color-error;
      font-weight: bold;
      font-size: 32rpx;
    }
  }
}
</style>
