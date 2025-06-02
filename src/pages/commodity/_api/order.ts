import { post } from '@/common/js/request'

export interface Props {
  storeId: string
  table_number?: string
  commoditys: {
    branchId: string
    quantity: number
  }[]
}
export async function createOrder(props: Props) {
  return await post<{ id: string }>('/api/order/create', props)
}

export async function getOrderList(props: Props) {
  return await post<{ orderId: string }>('/api/order/create', props)
}
