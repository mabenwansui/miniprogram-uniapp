<template>
  <comp-card title="桌号42">
    <view class="order-type">
      <view
        v-for="item in data"
        class="order-type-item"
        :class="model === item.id ? 'active' : ''"
        :key="item.id"
        @click="() => handleClick(item.id)"
      >
        <comp-icons class="icon" :type="item.icon" :color="item.id === model ? 'primary' : 'default'" size="large" />
        <text>{{ item.title }}</text>
        <view v-if="item.id === model" class="decoration">
          <view class="bg"></view>
          <view class="icon"><comp-icons type="checkmarkempty" size="small" color="inverse" /></view>
        </view>
      </view>
    </view>
  </comp-card>
</template>
<script setup lang="ts">
import { ORDER_TYPE } from '@/common/types/order'

const model = defineModel<ORDER_TYPE>({ default: ORDER_TYPE.DINE_IN })

const data = [
  {
    id: ORDER_TYPE.DINE_IN,
    title: '店内用餐',
    icon: 'icon-meal'
  },
  {
    id: ORDER_TYPE.TAKE_OUT,
    title: '打包带走',
    icon: 'icon-shopping'
  }
]
const handleClick = (id: ORDER_TYPE) => {
  model.value = id
}

</script>
<style scoped lang="scss">
.order-type {
  display: flex;
  justify-content: space-between;
  .order-type-item {
    display: flex;
    width: calc(50% - 16rpx);
    position: relative;
    border: 2px solid $uni-border-color;
    border-radius: $uni-border-radius-base;
    align-items: center;
    justify-content: center;
    padding: 28rpx;
    font-size: $uni-font-size-lg;
    overflow: hidden;
    .decoration {
      position: absolute;
      bottom: 0;
      right: 0;
      .icon {
        position: absolute;
        z-index: 2;
        left: -16px;
        top: -19px;
      }
      .bg {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 180rpx;
        height: 180rpx;
        background: $uni-color-primary;
        transform: rotate(45deg) translate(92px, 0px);
      }
    }
    .icon {
      margin-right: 12rpx;
    }
    &.active {
      border-color: $uni-color-primary;
      color: $uni-color-primary;
      text {
        font-weight: bold;
      }
    }
  }
}
</style>
