import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export default function useSearchParams() {
  const isLoading = ref(true)
  const searchParams = ref<Record<string, any>>()
  onLoad((params) => {
    searchParams.value = params
    isLoading.value = false
  })
  return {
    isLoading,
    searchParams
  }
}
