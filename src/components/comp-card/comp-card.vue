<template>
  <view class="list-card" @click="handleClick">
    <view v-if="props.title" class="list-card-title">{{ props.title }}</view>
    <slot />
  </view>
</template>
<script setup lang="ts">
const props = defineProps<{
  title?: string
}>()
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
  .list-card-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 20rpx;
    &:before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 14px;
      margin-right: 8rpx;
      border-radius: $uni-border-radius-sm;
      background-color: $uni-color-primary;
    }
  }
}
</style>
