<template>
  <view class="order-details-wrap page">
    <OrderType v-model="orderType" />
    <OrderList :order="order" />
    <OrderMark v-model="remarkModel" />
    <OrderFooter :order="order" @submit="handleToPay" />
    <comp-pay @submit="handleConfirmPay" :data="{ price: order?.actualAmount! }" v-model:open="payOpen" />
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
import { getOrder, submitOrder } from '../_api/order'
import { pay } from '../_api/pay'

const { searchParams, ready } = useSearchParams<{ order: string }>()
const payOpen = ref(false)
const order = ref<OrderInfo>()
const orderType = ref<ORDER_TYPE>(ORDER_TYPE.DINE_IN)
const remarkModel = ref({ remark: '' })

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

/** 去支付 */
const handleToPay = async () => {
  if (order.value?.actualAmount && order.value?.actualAmount > 0) {
    const { flag } = await submitOrder({
      orderId: order.value?.id!,
      orderType: orderType.value,
      paymentType: 'wechat',
      remark: remarkModel.value.remark
    })
    if (flag === 1) {
      payOpen.value = true
    }
  }
}

/** 确认支付 */
const handleConfirmPay = async () => {
  const { flag } = await pay(order.value?.id!)
  if (flag === 1) {
    console.log('ok')
  }
}
</script>

<style scoped lang="scss"></style>
