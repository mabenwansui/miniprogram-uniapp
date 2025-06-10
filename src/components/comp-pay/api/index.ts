import { post } from '@/common/js/request'
import type { OrderInfo } from '@/common/types/order'

export async function getOrder(orderId: string) {
  return await post<OrderInfo>('/api/order/get-info', { orderId })
}

type SubmitOrderParams = Required<Pick<OrderInfo, 'orderType' | 'paymentType' | 'remark'>> &
  Partial<Pick<OrderInfo, 'commoditys' | 'table_number'>> & { orderId: string; storeId?: string }
export async function submitOrder(params: SubmitOrderParams) {
  return await post('/api/order/submit', params)
}
