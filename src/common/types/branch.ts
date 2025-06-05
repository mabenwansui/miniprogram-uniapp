import type { Commodity } from '@/common/types/commodity'

export interface Branch {
  id: string
  commodity: Commodity
  stockConunt?: number
  soldCount?: number
  originalPrice?: number // 原价
  price: number
  isOnShelf?: boolean
  createdAt: Date
}