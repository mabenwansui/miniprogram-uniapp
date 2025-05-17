import { post } from '@/common/js/request'
import type { OrderCommodity } from '@/common/types/order'
import type { AddressInterface } from '@/common/types/address'

type CreateDto = AddressInterface
export async function create(dto: CreateDto) {
  return await post<Record<never, never>>('/api/address/create', dto)
}

type UpdateDto = CreateDto & { id: string }
export async function update(dto: UpdateDto) {
  return await post<{ id: string; list: OrderCommodity[] }>('/api/address/update', dto)
}

export async function del(id: string) {
  return await post<Record<never, never>>('/api/address/delete', { id })
}

export async function list() {}
