export interface Category {
  id: string
  title: string
  parentId?: string
  level?: number
  children?: Category[]
}