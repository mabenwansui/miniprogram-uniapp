import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export default function useSearchParams<T extends AnyObject>() {
  const ready = ref(false)
  const searchParams = ref<T>()
  onLoad((params) => {
    searchParams.value = params as T
    ready.value = true
  })
  return {
    ready,
    searchParams
  }
}
