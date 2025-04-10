import type { Commodity } from '@/common/types/commodity'
import { post } from '@/common/js/request'

interface CategoryResponseList {
  id: string
  title: string
  parentId?: string
  level: number
  children: CategoryResponseList[]
}
export async function getCommodityCategory() {
  return await post<{ list: CategoryResponseList[] }>('/api/commodity/category/list')
}

interface GetCommodityListByCategory {
  category: string
  curPage: number
  pageSize?: number
}
export async function getCommodityListByCategory({ category, curPage = 1, pageSize = 10 }: GetCommodityListByCategory) {
  return await post<{
    list: Commodity[]
    pageSize: number
    curPage: number
    total: number
  }>('/api/commodity/search', { category, curPage, pageSize })
}

interface ChangeCart {
  commodityId: string
  quantity: number
}
export async function changeCart(params: ChangeCart) {
  return await post<Record<never, never>>('/api/cart/change', params)
}

export async function getCartList() {
  return await post<{ list: Commodity[] }>('/api/cart/list')
}