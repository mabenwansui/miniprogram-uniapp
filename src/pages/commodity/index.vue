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
    <comp-nav-layout :data="dataList" :onMenuChange="handleMenuChange">
      <template #navItem="{ item }">{{ item.node }}</template>
      <template #commodityTitle="{ item, index }">{{ item.node }}</template>
      <template #commodityItem="{ item }">
        <view>{{item.description}}</view>
        <view>{{ item.name }}</view>
        <view>{{ item.originalPrice }}</view>
        <view>{{ item.price }}</view>
      </template>
    </comp-nav-layout>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getCommodityCategory, getCommodityListByCategory } from './api'
const dataList = ref([])
const curPage = ref(1)
onMounted(async () => {
  async function setNav() {
    const { flag, data } = await getCommodityCategory()
    if (flag === 1) {
      dataList.value = data.list.map((item) => {
        return {
          id: item.id,
          node: item.title
        }
      })
    }
  }
  await setNav()
})

const handleMenuChange = async ({categoryId, index}) => {
  const { flag, data } = await getCommodityListByCategory({
    category: categoryId,
    curPage: 1
  })
  if (flag === 1) {
    dataList.value[index].children = data.list
    curPage.value = data.curPage
  }
}
</script>
<style>
.content {
  background-color: #fff;
}
</style>
