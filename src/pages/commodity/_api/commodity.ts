import { post } from '@/common/js/request'
import type { Commodity } from '@/common/types/commodity'
import type { Page } from '@/common/types/page'

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
  return await post<{ list: Commodity[] } & Page>('/api/commodity/search', { category, curPage, pageSize })
}

