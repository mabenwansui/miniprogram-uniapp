import { ref } from 'vue'

interface Props {
  delay?: number
  title?: string
}

let timer: number | null = null
export default function useLoading() {
  const isLoading = ref(false)
  return {
    isLoading,
    showLoading: (props: Props = {}) => {
      const { delay = 500, title = '加载中' } = props
      isLoading.value = true
      timer = setTimeout(() => uni.showLoading({ title }), delay)
    },
    hideLoading: () => {
      isLoading.value = false
      timer && clearTimeout(timer)
      uni.hideLoading()
    }
  }
}
