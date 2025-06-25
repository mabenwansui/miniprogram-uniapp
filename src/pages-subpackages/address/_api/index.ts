import { post } from '@/common/js/request'
import type { OrderInfo } from '@/common/types/order'
import type { Address } from '@/common/types/address'

const getInfoUrl = '/api/address/get-info'

export async function create(dto: Omit<Address, 'id'>) {
  return await post<Record<never, never>>('/api/address/create', dto)
}

export async function update(dto: Address) {
  return await post<{ id: string; list: OrderInfo['commoditys'] }>('/api/address/update', dto)
}

export async function del(id: string) {
  return await post<Record<never, never>>('/api/address/delete', { id })
}

export async function getList() {
  return await post<{ list: Address[] }>('/api/address/list')
}

export async function getInfo(id: string) {
  return await post<Address>('/api/address/get-info', { id })
}

// export async function getInfo4Form(id: string) {
//   const { flag, data } = await post<Address>(getInfoUrl, { id })
//   const { poiName, poiAddress, location, ...rest } = data
//   return {
//     flag,
//     data: {
//       ...rest,
//       address: {
//         poiName,
//         poiAddress,
//         longitude: location?.coordinates[0],
//         latitude: location?.coordinates[1]
//       }
//     }
//   }
// }
