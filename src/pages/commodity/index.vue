<template>
  <view class="page">
    <view class="banner">
      <comp-banner-swiper
        :imgUrl="[
          'https://p0.itc.cn/q_70/images03/20220427/c96862bd084a4ce89b122eb4b4f58a5a.png',
          'http://img2.baidu.com/it/u=3943847741,107751631&fm=253&app=138&f=JPEG?w=1200&h=800',
          'https://p7.itc.cn/images01/20200827/3d85322c6b0d4b28ab86731634fd1d43.png'
        ]"
      />
    </view>
    <view class="content"></view>
    <view class="list">
      <comp-nav-layout :data="dataList" :onLoad="handleLoad">
        <template #navItem="{ item }">{{ item.node }}</template>
        <template #commodityTitle="{ item, index }">{{ item.node }}</template>
        <template #commodityItem="{ item }">
          <commodity-item :title="item.name" :price="item.price" :description="item.description" :imgSize="`160rpx`" />
        </template>
      </comp-nav-layout>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getCommodityCategory, getCommodityListByCategory } from './api'
import CommodityItem from './ui/commodity-item.vue'
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

const handleLoad = async (categoryId, index) => {
  const { flag, data } = await getCommodityListByCategory({
    category: categoryId,
    curPage: 1
  })
  if (flag === 1) {
    console.log('mm', index)    
    dataList.value[index].children = data.list
    curPage.value = data.curPage
  }
}
</script>
<style>
/* .page{
  height: 100vh;
} */
.content {}
</style>
