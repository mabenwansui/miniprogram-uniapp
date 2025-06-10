import { post } from '@/common/js/request'
import type { User } from '@/common/types/user'

const TagType = {
  REMARK: 'remark'
} as const
type TagType = ValueOf<typeof TagType>

interface TagItem {
  id: string
  type: TagType
  name: string
  sort?: number
  isSystem: boolean
  creator: User
}

export interface Response {
  list: TagItem[]
}

export function getTagsList() {
  return post<Response>('/api/tag/remark/list')
}

export function delTag(id: string) {
  return post<Record<never, never>>('/api/tag/delete', { id })
}

export function createTag(name: string) {
  return post<{id: string}>('/api/tag/create', {
    type: TagType.REMARK,
    name
  })
}