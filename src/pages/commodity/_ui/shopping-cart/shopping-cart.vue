<template>
  <uni-transition :mode-class="['fade']" class="mask-warp" :show="listShow" @click="handleCloseList">
    <view class="mask"></view>
  </uni-transition>
  <uni-transition mode-class="slide-bottom" class="shopping-cart-wrap" :show="show">
    <view class="shopping-cart-content">
      <uni-transition mode-class="slide-bottom" :show="listShow">
        <view class="selected-commodity-list">
          <view class="section-title">
            已选商品
            <view class="aside" @click="handleClear">
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
                <view class="actions">
                  <comp-add-cart
                    :quantity="props.quantityRecord[item.id]"
                    :btn-size="26"
                    :onChange="(quantity: number)=> handleChange(item, quantity)"
                  />
                </view>
              </view>
            </view>
          </view>
        </view>
      </uni-transition>
      <view class="summary-wrap" @click="handleTriggerList">
        <view class="summary-wrap-main">
          <uni-badge type="error" :text="badge" absolute="rightTop">
            <image class="icon-shopping-cart" :src="iconShoppingCart" />
          </uni-badge>
          <view class="amount">{{ totalAmount }}</view>
        </view>
        <view class="actions">
          <comp-form-button type="primary" class="btn-primary" @click.stop="handlePay">去结算</comp-form-button>
        </view>
      </view>
    </view>
  </uni-transition>
</template>
<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue'
import type { Commodity } from '@/common/types/commodity'
import theme from '@/common/theme'
import iconShoppingCart from './images/icon-shoppingcart.svg'

const props = defineProps<{
  quantityRecord: Record<string, number>
  list: Commodity[]
  onPay?: () => void
  onClear?: () => void
  onQuantityChange?: (item: Commodity, quantity: number) => void
}>()
const totalAmount = computed(() => props.list?.reduce((total, item) => total + item.price * props.quantityRecord[item.id], 0))
const badge = computed(() => props.list?.reduce((total, item) => total + props.quantityRecord[item.id], 0))
const show = computed(() => props.list?.length > 0)
const listShow = ref(false)

watchEffect(() => {
  if (props.list?.length <= 0) {
    listShow.value = false
  }
})
const handleCloseList = () => {
  listShow.value = false
}
const handleTriggerList = () => {
  listShow.value = !listShow.value
}
const handleClear = () => props?.onClear?.()
const handleChange = (item: Commodity, quantity: number) => {
  props?.onQuantityChange?.(item, quantity)
}
const handlePay = () => props?.onPay?.()
</script>
<style scoped lang="scss">
.mask-warp {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  .mask {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
}
.shopping-cart-wrap {
  width: 100vw;
  position: fixed;
  z-index: 1010;
  bottom: 0;
  align-items: center;
  .shopping-cart-content {
    .summary-wrap {
      display: flex;
      justify-content: space-between;
      padding: 32rpx 36rpx 32rpx 36rpx;
      position: relative;
      z-index: 2;
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
          border-radius: $uni-border-radius-round;
        }
      }
    }
  }
  .selected-commodity-list {
    background: #fff;
    .section-title {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 36rpx;
      align-items: center;
      .aside {
        color: $uni-text-color-grey;
        .icon-trash {
          position: relative;
          top: 2rpx;
        }
      }
    }
    .card-list {
      padding: 0 36rpx;
      max-height: calc(100vh - 340rpx);
      overflow-y: auto;
      .card-item {
        display: flex;
        margin: 12rpx 0;
        .content {
          width: 100%;
          margin-left: 20rpx;
          position: relative;
          .title {
            font-size: $uni-font-size-lg;
            height: 62rpx;
          }
          .price {
            font-size: $uni-font-size-lg;
            font-weight: bold;
            color: $uni-color-error;
          }
          .actions {
            position: absolute;
            right: 0;
          }
        }
      }
    }
  }
}
</style>
