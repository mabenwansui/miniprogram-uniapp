<template>
  <view class="store-wrap">
    <view class="store-list">
      <view v-for="item in list" :key="item.id" class="item" @click="() => handleClick(item.id)">
        <view class="name">{{ item.name }}</view>
        <view class="address">{{ item.address }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getStoreList } from '../../_api/store'
import type { Store } from '../../_api/store'

interface Props {
  onChange?: (id: string) => void
}

const props = defineProps<Props>()

// 定义响应式数据
const list = ref<Store[]>([])

// 页面加载时执行的逻辑
onMounted(async () => {
  const { flag, data } = await getStoreList()
  if (flag === 1) {
    list.value = data.list
  }
})
const handleClick = (id: string) => props?.onChange?.(id)
</script>

<style lang="scss" scoped>
.store-list {
  .item {
    background: #fff;
    padding: 36rpx 40rpx;
    margin: 40rpx;
    cursor: pointer;
    border-radius: $uni-border-radius-lg;
    box-shadow: $uni-shadow-base;
  }
  .address {
    margin-top: 12rpx;
    font-size: $uni-font-size-sm;
    color: $uni-text-color-secondary;
  }
}
</style>
