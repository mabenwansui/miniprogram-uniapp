import { ref, onMounted } from 'vue'

interface GetLocation {
  /** 纬度，浮点数，范围为-90~90，负数表示南纬 */
  latitude: number
  /** 经度，范围为-180~180，负数表示西经 */
  longitude: number
  /** 速度，浮点数，单位m/s */
  speed: number
  /** 位置的精确度 */
  accuracy: number
  /** 高度，单位 m */
  altitude: number
  /** 垂直精度，单位 m（Android 无法获取，返回 0） */
  verticalAccuracy: number
  /** 水平精度，单位 m */
  horizontalAccuracy: number
  /** 地址信息 */
  address?: any
}

const getLocation = (): Promise<GetLocation> =>
  new Promise((resolve) => {
    uni.getLocation({
      success: resolve
    })
  })

export default function useGetLocation() {
  const isLoading = ref(true)
  const location = ref<Partial<GetLocation & { isLoading: boolean }>>({ isLoading: true })
  onMounted(async () => {
    const data = await getLocation()
    location.value = data
    isLoading.value = false
  })
  return location
}
