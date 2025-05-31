<template>
  <view class="content page">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
    </view>
    <view @click="handleClick">跳转到商品页</view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const title = ref('Hello')
const handleClick = () => {
  uni.navigateTo({
    url: '/pages-subpackages/address/page'
    // url: '/pages/commodity/index'
  })
}
onMounted(() => {
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/commodity/page'
    })
    // uni.navigateTo({
      // url: '/pages-subpackages/address/page'
      // url: '/pages/commodity/list/page?store=67e2c54ae2b84713db7b72ec'
    // })
  }, 0)
})
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
