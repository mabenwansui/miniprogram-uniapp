<template>
  <view class="list-card-item" @click="handleClick">
    <view class="info">{{ props.title }}</view>
    <view class="aside">
      {{ props.asideTitle }}
      <CompIcons size="small" type="right" />
    </view>
  </view>
</template>
<script setup lang="ts">
import CompIcons from '@/components/comp-icons/comp-icons.vue'
const emit = defineEmits<{ (e: 'click', event: Event): void }>()
const handleClick = (event: Event) => emit('click', event)
const props = defineProps<{
  title: string
  asideTitle?: string
}>()
</script>
<style scoped lang="scss">
.list-card-item {
  position: relative;
  display: flex;
  justify-content: space-between;
  .info { flex-shrink: 0; }
  .aside {
    flex-shrink: 1;
    margin-left: 32rpx;
    color: $uni-text-color-secondary;
    margin-right: -12rpx;
  }
}
</style>
