<template>
  <uni-transition mode-class="slide-bottom" class="shopping-cart-wrap" :show="show">
    <view class="shopping-cart-content">
      <view class="selected-commodity-list">
        <view class="section-title">
          已选商品
          <view class="aside">
            <uni-icons class="icon-trash" :color="theme['uni-text-color-grey']" type="trash" size="18" />清空
          </view>
        </view>
        <view class="card-list">
          <view v-for="item in props.list" :key="item.id" class="card-item">
            <view class="img">
              <comp-commodity-image :imgUrl="item.coverImageUrl" size="small" />
            </view>
            <view class="content">
              <view class="title">{{ item.name }}</view>
              <view class="price">¥ {{ item.price }}</view>
              <view class="action"> </view>
            </view>
          </view>
        </view>
      </view>
      <view class="summary-wrap">
        <view class="summary-wrap-main">
          <uni-badge type="error" :text="badge" absolute="rightTop">
            <image class="icon-shopping-cart" :src="iconShoppingCart" />
          </uni-badge>
          <view class="amount">{{ totalAmount }}</view>
        </view>
        <view class="actions">
          <button type="primary" class="btn-primary">去结算</button>
        </view>
      </view>
    </view>
  </uni-transition>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import theme from '@/common/theme'
import iconShoppingCart from './images/icon-shoppingcart.svg'

export interface CartItem {
  id: string
  coverImageUrl: string
  name: string
  price: number
  quantity: number
}
const props = defineProps<{ list: CartItem[] }>()
const totalAmount = computed(() => props.list?.reduce((total, item) => total + item.price * item.quantity, 0))
const badge = computed(() => props.list?.reduce((total, item) => total + item.quantity, 0))
const show = computed(() => props.list?.length > 0)
</script>
<style scoped lang="scss">
.shopping-cart-wrap {
  width: 100vw;
  position: fixed;
  z-index: 100;
  bottom: 0;
  align-items: center;
  .shopping-cart-content {
    background: #fff;
    .summary-wrap {
      display: flex;
      justify-content: space-between;
      padding: 32rpx 36rpx 32rpx 36rpx;
      .summary-wrap-main {
        display: flex;
        margin-left: 8rpx;
        align-items: center;
      }
      .icon-shopping-cart {
        width: 60rpx;
        height: 60rpx;
      }
      .amount {
        margin: 4rpx 0 0 20rpx;
        font-size: 48rpx;
        font-weight: 700;
        color: #333;
        &::before {
          content: '￥';
          font-size: 32rpx;
        }
      }
      .actions {
        .btn-primary {
          padding-left: 48rpx;
          padding-right: 48rpx;
        }
      }
    }
  }
  .selected-commodity-list {
    .section-title {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 36rpx;
      align-items: center;
      .aside {
        color: $uni-text-color-grey;
        .icon-trash {
          position: relative;
          top: 4rpx;
        }
      }
    }
    .card-list {
      padding: 0 36rpx;
      .card-item {
        display: flex;
        margin: 12rpx 0;
        .content{
          margin-left: 20rpx;
          .title {
            font-size: $uni-font-size-lg;
            height: 62rpx;
          }
          .price {
            font-size: $uni-font-size-lg;
            font-weight: bold;
            color: $uni-color-error;
          }
        }
      }
    }
  }
}
</style>
