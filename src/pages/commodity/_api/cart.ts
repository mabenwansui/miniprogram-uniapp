import { post } from '@/common/js/request'
import type { OrderCommodity } from '@/common/types/order'

interface UpdateCart {
  commodityId: string
  quantity: number
}
export async function updateCart(params: UpdateCart) {
  return await post<Record<never, never>>('/api/cart/update', params)
}

export async function getCartList() {
  return await post<{ id: string; list: OrderCommodity[] }>('/api/cart/list')
}

export async function deleteCart() {
  return await post<Record<never, never>>('/api/cart/delete')
}
