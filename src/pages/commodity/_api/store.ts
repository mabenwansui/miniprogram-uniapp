import { post } from '@/common/js/request'
import type { Store } from '@/common/types/store'
import type { Category } from '@/common/types/category'

export type { Store }

export async function getStoreList() {
  return await post<{ list: Store[] }>('/api/store/search')
}

interface GetNearStoreParams {
  lon: number
  lat: number
}
export async function getNearStore(params: GetNearStoreParams) {
  return await post<Store>('/api/store/get-near', params)
}

export async function getCategory() {
  return await post<Category>('/api/branch/category-list')
}