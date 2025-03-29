<template>
  <view class="banner">
    <comp-banner-swiper
      :imgUrl="[
        'https://p0.itc.cn/q_70/images03/20220427/c96862bd084a4ce89b122eb4b4f58a5a.png',
        'http://img2.baidu.com/it/u=3943847741,107751631&fm=253&app=138&f=JPEG?w=1200&h=800',
        'https://p7.itc.cn/images01/20200827/3d85322c6b0d4b28ab86731634fd1d43.png'
      ]"
    />
  </view>
  <view class="content"> </view>
  <view class="list">
    <comp-nav-layout :navList="navList" :contentList="contentList" />
  </view>
</template>
<script setup>
const navList = [
  {
    id: '1',
    node: '酒水饮料'
  },
  {
    id: '2',
    node: '新零售'
  }
]
const contentList = [
  {
    id: '1',
    node: '酒水饮料',
    menuCode: '1',
    children: [
      {
        id: '211',
        node: '商品1',
      }
    ]
  }
]
</script>
<style>
.content {

}
</style>
