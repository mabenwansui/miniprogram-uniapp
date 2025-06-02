import { post } from '@/common/js/request'
import type { Branch } from '@/common/types/branch'
import type { Page } from '@/common/types/page'
import type { Category } from '@/common/types/category'

export async function getCategory() {
  return await post<{ list: Category[] }>('/api/branch/category-list')
}

interface GetCommodityListByCategory {
  categoryId: string
  curPage: number
  pageSize?: number
}
export async function getCommodityListByCategory({ categoryId, curPage = 1, pageSize = 10 }: GetCommodityListByCategory) {
  return await post<{ list: Branch[] } & Page>('/api/branch/search-commodity', { categoryId, curPage, pageSize })
}
