import { ref, watchEffect } from 'vue'
import { post } from '@/common/js/request'
import useGetLocation from './useGetLocation'

export interface ApiResponse {
  /** 国家 */
  nation: string
  /** 省 */
  province: string
  /** 市 */
  city: string
  /** 区 */
  district: string
  /** 街道 */
  street: string
  /** 门牌号 */
  street_number: string
}

export default function useGeoToAdress() {
  const addressInfo = ref<Partial<ApiResponse>>({})
  const location = useGetLocation()

  watchEffect(async ()=> {
    if (location.value.isLoading) return
    const { flag, data } = await post<ApiResponse>('/api/map/geo-to-address', {
      lon: location.value.longitude,
      lat: location.value.latitude
    })
    if (flag === 1) {
      addressInfo.value = data
    }
  })

  return addressInfo
}
