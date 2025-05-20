import { post } from '@/common/js/request'
import type { OrderCommodity } from '@/common/types/order'
import type { Address } from '@/common/types/address'

type CreateDto = Address
export async function create(dto: CreateDto) {
  return await post<Record<never, never>>('/api/address/create', dto)
}

type UpdateDto = Address
export async function update(dto: UpdateDto) {
  return await post<{ id: string; list: OrderCommodity[] }>('/api/address/update', dto)
}

export async function del(id: string) {
  return await post<Record<never, never>>('/api/address/delete', { id })
}

export async function getList() {
  return await post<{ list: Address[] }>('/api/address/list')
}

export async function getInfo(id: string) {
  return await post<Address>('/api/address/get-info', { id })
}
