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
      <template #commodityTitle="{ item, index }">{{ item.node }}</template>
      <template #commodityItem="{ item, parentIndex }">
        <commodity-item
          :parentIndex="parentIndex"
          :data="item"
          :imgSize="`160rpx`"
          :onAddClick="handleAddClick"
          :onSubClick="handleSubClick"
        />
      </template>
      <template #footer><ShoppingCart :list="cart" /></template>
    </comp-nav-layout>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCommodityCategory, getCommodityListByCategory, changeCart, getCartList } from './api'
import CommodityItem from './ui/commodity-item.vue'
import ShoppingCart from './ui/shopping-cart/shopping-cart.vue'
import type { CartItem } from './ui/shopping-cart/shopping-cart.vue'
interface DataList extends Record<string, any> {
  id: string
  children?: DataList[]
}
const dataList = ref<DataList[]>([])
const curPage = ref(1)
const cart = ref<CartItem[]>([])

onMounted(async () => {
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
  const { flag, data } = await getCommodityListByCategory({
    category: categoryId,
    curPage: 1
  })
  if (flag === 1) {
    dataList.value[index].children = data.list
    curPage.value = data.curPage
  }
}

function updateCart(cartItem: CartItem) {
  const index = cart.value.findIndex((item) => item.id === cartItem.id)
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

function SetCart(parentIndex: number, id: string, type: 'add' | 'sub') {
  const item = dataList.value[parentIndex]?.children?.find((item) => item.id === id)
  if (!item) return
  let quantity = item.quantity || 0
  if (type === 'add') {
    quantity++
  } else {
    quantity = Math.max(quantity - 1, 0)
  }
  item.quantity = quantity
  updateCart({ id: item.id, name: item.name, price: item.price, coverImageUrl: item.coverImageUrl, quantity: quantity })
}

const handleAddClick = async ({ parentIndex, id }: { parentIndex: number; id: string }) => {
  SetCart(parentIndex, id, 'add')
}
const handleSubClick = ({ parentIndex, id }: { parentIndex: number; id: string }) => {
  SetCart(parentIndex, id, 'sub')
}
</script>
<style scoped lang="scss">
.page {
  font-size: $uni-font-size-base;
}
</style>
