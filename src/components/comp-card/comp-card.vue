<template>
  <view class="list-card">
    <slot />
  </view>
</template>
<script setup lang="ts"></script>
<style scoped lang="scss">
.list-card {
  position: relative;
  background: $uni-bg-color-container;
  margin: 40rpx $uni-spacing-page;
  border-radius: $uni-border-radius-lg;
  padding: 28rpx;
}
</style>
