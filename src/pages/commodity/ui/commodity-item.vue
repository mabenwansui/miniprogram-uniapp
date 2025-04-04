<template>
  <view className="product-section-item">
    <view class="img">
      <image style="width: 250rpx; height: 250rpx;" class="img-item" :src="props.imgUrl" :lazy-load="true" />
    </view>
    <view class="content">
      <view class="title">{{ props.title }}</view>
      <view class="price">{{ props.price }}</view>
      <view class="action">
        <uni-icons type="plus" size="30"></uni-icons>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
interface Props {
  title: string
  price: string
  imgUrl?: string
}
const props = defineProps<Props>()
</script>
<style scoped lang="scss">
.product-section-item {
  display: flex;
  align-items: flex-start;
  position: relative;
  padding-bottom: 40rpx;
  .img {
    width: 250rpx;
    background-color: brown;
    .img-item {
      width: 250rpx;
      height: 250rpx;
    }
  }
  .content {
    flex: 1;
  }
}
</style>
