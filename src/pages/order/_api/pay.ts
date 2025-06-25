import { post } from '@/common/js/request'

export async function pay(orderId: string) {
  return await post<Record<never, never>>('/api/order/pay', { orderId })
}
