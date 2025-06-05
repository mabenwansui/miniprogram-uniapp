<template>
  <view class="order-details-wrap page">
    <OrderType v-model="orderType" />
    <OrderList :order="order" />
    <OrderFooter :order="order" />
    <OrderMark />
  </view>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import useSearchParams from '@/common/hooks/useSearchParams'
import type { OrderInfo } from '@/common/types/order'
import { ORDER_TYPE } from '@/common/types/order'
import OrderList from '../_ui/order-list.vue'
import OrderType from '../_ui/order-type.vue'
import OrderFooter from '../_ui/order-footer.vue'
import OrderMark from '../_ui/order-mark.vue'
import { getOrder } from '../_api/order'

const { searchParams, ready } = useSearchParams<{ order: string }>()
const order = ref<OrderInfo>()
const orderType = ref<ORDER_TYPE>(ORDER_TYPE.DINE_IN)

watchEffect(async () => {
  if (ready.value === true) {
    if (searchParams.value) {
      const { flag, data } = await getOrder(searchParams.value.order)
      if (flag === 1) {
        order.value = data
      }
    } else {
      uni.navigateTo({ url: '/pages/index/page' })
    }
  }
})
</script>

<style scoped lang="scss"></style>
