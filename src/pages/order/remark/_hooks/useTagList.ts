import { ref, onMounted } from 'vue'
import { getTagsList } from '../_api/index'
import type { Response } from '../_api/index'

export default function useTagList () {
  const list = ref<Response['list']>([])
  const isLoading = ref(true)
  onMounted(async () => {
    const { flag, data } = await getTagsList()
    isLoading.value = false
    if (flag === 1) {
      list.value = data.list || []
    }
  })
  return {
    list,
    isLoading
  }
}