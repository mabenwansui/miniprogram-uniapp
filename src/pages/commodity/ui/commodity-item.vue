<template>
  <view class="product-section-item">
    <view class="img" :style="`width: ${props.imgSize}`">
      <image :style="`width: ${props.imgSize}; height: ${props.imgSize};`" class="img-item" :src="imgUrl" :lazy-load="true" />
    </view>
    <view class="content">
      <view class="title">{{ props.title }}</view>
      <view class="description">{{ props.description }}</view>
      <view class="price">{{ props.price }}</view>
      <view class="action">
        <uni-icons @click="handleClick" type="plus-filled" size="30" :color="theme['uni-color-primary']"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import commodityPlacholderUrl from '@/common/images/commodity-placholder.svg'
import theme from '@/common/theme'
interface Props {
  title: string
  price: string
  description?: string
  /** 要带单位, 如200rpx */
  imgSize?: string
  imgUrl?: string
}
const props = defineProps<Props>()
const imgUrl = computed(()=> props.imgUrl || commodityPlacholderUrl)
const handleClick = () => {
  uni.showToast({
    title: '添加成功',
    icon: 'success'
  })
}
</script>
<style scoped lang="scss">
.product-section-item {
  display: flex;
  position: relative;
  font-size: 32rpx;
  .img {
    margin-right: 28rpx;
  }
  .content {
    flex: 1;
    .title { font-weight: bold; font-size: $uni-font-size-lg; margin-bottom: 8rpx; }
    .description { 
      font-size: $uni-font-size-sm; 
      color: $uni-text-color-grey;
      min-height: 36px;
    }
    .action {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
