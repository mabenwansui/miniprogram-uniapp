<template>
  <view class="commodity-list page">
    <comp-nav-layout :data="dataList" :onLoad="handleLoad">
      <template #header>
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
      </template>
      <template #navItem="{ item }">{{ item.node }}</template>
      <template #commodityTitle="{ item }">{{ item.node }}</template>
      <template #commodityItem="{ item }">
        <commodity-item
          :quantity="commodityQuantityRecord[item.id]"
          :data="item"
          :imgSize="`160rpx`"
          :onQuantityChange="handleQuantityChange"
        />
      </template>
      <template #footer>
        <ShoppingCart
          :quantityRecord="commodityQuantityRecord"
          :list="cart"
          :onQuantityChange="handleQuantityChange"
          :onPay="handlePay"
          :onClear="handleClear"
        />
      </template>
    </comp-nav-layout>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { Branch } from '@/common/types/branch'
import type { Cart } from '@/common/types/cart'
import useSearchParams from '@/common/hooks/useSearchParams'
import { getCategory, getCommodityListByCategory } from '../_api/commodity'
import { updateCart, deleteCart, getCartList } from '../_api/cart'
import { createOrder } from '../_api/order'

import CommodityItem from '../_ui/commodity-item/commodity-item.vue'
import ShoppingCart from '../_ui/shopping-cart/shopping-cart.vue'

interface DataList extends Record<string, any> {
  id: string
  node: string
  children?: Branch[]
}
const dataList = ref<DataList[]>([])
const curPage = ref(1)
const cart = ref<Branch[]>([])
const commodityQuantityRecord = ref<Record<string, number>>({})
const { searchParams, ready } = useSearchParams()

watchEffect(async ()=> {
  if (ready.value === false) return
  // 初始加载商品分类数据，而后在handleLoad中根据当前选中的分类加载对应的商品列表
  async function loadNav() {
    const { flag, data } = await getCategory()
    if (flag === 1) {
      dataList.value = data.list.map((item) => ({
        id: item.id,
        node: item.title
      }))
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  }
  await loadNav()
})

onMounted(async () => {
  async function loadCart() {
    const { flag, data } = await getCartList()
    if (flag === 1) {
      data?.list?.forEach((item: Cart) => {
        cart.value.push(item.branch)
        commodityQuantityRecord.value[item.branch.id] = item.quantity
      })
    }
  }
  await loadCart()
})

const handleLoad = async (categoryId: string, index: number) => {
  // 加载当前选中分类对应的商品列表
  const { flag, data } = await getCommodityListByCategory({
    categoryId,
    curPage: 1
  })
  if (flag === 1) {
    dataList.value[index].children = data.list
    curPage.value = data.curPage
  }
}

const handleQuantityChange = async (item: Branch, quantity: number) => {
  commodityQuantityRecord.value[item.id] = quantity
  const index = cart.value.findIndex((_item) => _item.id === item.id)
  if (index > -1) {
    if (quantity <= 0) {
      cart.value.splice(index, 1)
    }
  } else {
    cart.value.push(item)
  }
  updateCart({ branchId: item.id, quantity: quantity })
}
const handleClear = () => {
  commodityQuantityRecord.value = {}
  cart.value = []
  deleteCart()
}
const handlePay = async () => {
  const { flag, data } = await createOrder({
    storeId: searchParams.value?.store,
    commoditys: cart.value.map((item) => ({
      branchId: item.id,
      quantity: commodityQuantityRecord.value[item.id]
    }))
  })
  if (flag === 1) {
    uni.navigateTo({
      url: `/pages/order/details/page?order=${data.id}`
    })
  }
}
</script>
<style scoped lang="scss">
.commodity-list {
  background-color: #fff;
}
</style>
