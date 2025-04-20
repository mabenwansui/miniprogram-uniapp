<template>
  <view class="page">
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
          :onAddClick="handleQuantityClick"
          :onSubClick="handleQuantityClick"
        />
      </template>
      <template #footer>
        <ShoppingCart
          :list="cart"
          :onPay="handlePay"
          :onClear="handleClear"
          :onAddClick="handleQuantityClick"
          :onSubClick="handleQuantityClick"
        />
      </template>
    </comp-nav-layout>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Commodity } from '@/common/types/commodity'
import type { OrderCommodity } from '@/common/types/order'
import { ORDER_TYPE, PAYMENT_TYPE } from '@/common/types/order'
import { getCommodityCategory, getCommodityListByCategory, changeCart, getCartList, createOrder } from './api'
import type { ClickProps as AddToCartProps } from './ui/commodity-item.vue'
import CommodityItem from './ui/commodity-item.vue'
import ShoppingCart from './ui/shopping-cart/shopping-cart.vue'
interface DataList extends Record<string, any> {
  id: string
  node: string
  children?: Commodity[]
}
const dataList = ref<DataList[]>([])
const curPage = ref(1)
const cart = ref<OrderCommodity[]>([])
const commodityQuantityRecord = ref<Record<string, number>>({})

onMounted(async () => {
  // 初始加载商品分类数据，而后在handleLoad中根据当前选中的分类加载对应的商品列表
  async function setNav() {
    const { flag, data } = await getCommodityCategory()
    if (flag === 1) {
      dataList.value = data.list.map((item) => ({
        id: item.id,
        node: item.title
      }))
    }
  }
  await setNav()
})

const handleLoad = async (categoryId: string, index: number) => {
  // 加载当前选中分类对应的商品列表
  const { flag, data } = await getCommodityListByCategory({
    category: categoryId,
    curPage: 1
  })
  if (flag === 1) {
    dataList.value[index].children = data.list
    curPage.value = data.curPage
  }
}

function updateCart(cartItem: OrderCommodity) {
  commodityQuantityRecord.value[cartItem.commodityId] = cartItem.quantity
  const index = cart.value.findIndex((item) => item.commodityId === cartItem.commodityId)
  if (index > -1) {
    if (cartItem.quantity <= 0) {
      cart.value.splice(index, 1)
      return
    }
    cart.value[index].quantity = cartItem.quantity
  } else {
    cart.value.push(cartItem)
  }
}
const handleQuantityClick = async ({ categoryId, commodityId, quantity }: AddToCartProps) => {
  const item = dataList.value
    .find((item) => item.id === categoryId)
    ?.children?.find((item) => item.commodityId === commodityId)
  if (!item) return
  updateCart({
    commodityId: item.commodityId,
    name: item.name,
    categoryId: item.categoryId,
    price: item.price,
    coverImageUrl: item.coverImageUrl,
    quantity
  })
}
const handleClear = () => {
  commodityQuantityRecord.value = {}
  cart.value = []
}
const handlePay = async () => {
  const { flag, data } = await createOrder({
    orderType: ORDER_TYPE.DINE_IN,
    paymentType: PAYMENT_TYPE.WECHAT,
    table_number: '1',
    commoditys: cart.value.slice()
  })
  // createOrder()
}
</script>
<style scoped lang="scss">
.page {
  font-size: $uni-font-size-base;
}
</style>
