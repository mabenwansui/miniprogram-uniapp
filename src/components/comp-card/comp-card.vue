<template>
  <view class="list-card" @click="handleClick">
    <slot />
  </view>
</template>
<script setup lang="ts">
const emit = defineEmits<{ (e: 'click', event: Event): void }>()
const handleClick = (event: Event) => emit('click', event)
</script>
<style scoped lang="scss">
.list-card {
  position: relative;
  background: $uni-bg-color-container;
  margin: 40rpx $uni-spacing-page;
  border-radius: $uni-border-radius-lg;
  padding: 28rpx;
}
</style>
