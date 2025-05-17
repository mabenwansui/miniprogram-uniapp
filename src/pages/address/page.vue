<template>
  <view class="address-wrap page">
    <view class="header">
      <view class="title">当前位置</view>
      <view class="aside">
        <view class="btn">重新定位</view>
      </view>
    </view>
    <view class="list">
      <comp-card>
        <view class="add">
          <comp-icons type="plusempty" color="primary" class="icon-add" />
          新增收货地址
        </view>
      </comp-card>
      <!-- <comp-card>
        <view class="title">{{ title }}</view>
        <view class="address">{{ addr2ess }}</view>
        <view class="info"> {{ receiverInfo }} </view>
        <view class="aside">
          <view class="link" @click="handleEdit">编辑</view>
        </view>
      </comp-card> -->
    </view>
  </view>
</template>
<script setup lang="ts">
import { SexType } from '@/common/types/user'
// const receiverInfo = computed(() => `${props.name}${props.sex} ${props.phoneNumber}`)
</script>
<style scoped lang="scss">
.header {
  background: $uni-bg-color-container;
  display: flex;
  justify-content: space-between;
  padding: 28rpx 24rpx;
}
.icon-add {
  margin-right: 8rpx;
  position: relative;
  top: 2rpx;
}
.aside {
  position: absolute;
  top: 12rpx;
  right: 12rpx;
}
</style>
