import { SexType } from './user'

export { SexType }
export interface AddressFormObject {
  name: string,
  address?: string,
  latitude?: number,
  longitude?: number
}
export interface LocationPoint {
  type: 'Point'
  coordinates: [number, number]
}
export interface AddressLocation {
  // city?: string
  poiName: string
  poiAddress: string  
  location?: LocationPoint
}

export interface Address extends AddressLocation  {
  /** id */
  id?: string
  /** 联系人，必填 */
  contactName: string
  /** 性别 */
  sex: SexType
  /** 联系电话，必填 */
  phoneNumber: string
  /** 地址标签, 家、公司 */
  title: string
  /** 是否为默认地址，默认为 false */
  isDefault: boolean
  /** 地址详细信息 */
  details?: string
}

