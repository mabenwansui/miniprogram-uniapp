import { post } from '@/common/js/request'
import type { OrderInfo } from '@/common/types/order'

export async function getOrder(orderId: string) {
  return await post<OrderInfo>('/api/order/get-info', { orderId })
}