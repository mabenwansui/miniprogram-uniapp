import type { Category } from '@/common/types/category'

export interface Commodity {
  id: string
  name: string // 名称
  category?: Category // 分类
  imgNames?: [string] // 图片
  coverImageUrl?: string // 封面图片
  originalPrice?: number // 原价
  price: number // 现价
  description?: string // 描述
  details?: string // 详情
  tags?: [string] // 标签
  stockConunt?: number // 库存
  soldCount?: number // 已售
  createdAt?: Date // 创建时间
  updatedAt?: Date // 更新时间
}

