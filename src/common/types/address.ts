export enum SexType {
  male = 'male',
  female = 'female'
}

export interface AddressFormObject {
  name: string,
  address?: string,
  latitude?: number,
  longitude?: number
}

export interface Address {
  /** id */
  id?: string
  /** 联系人，必填 */
  contactName: string
  /** 性别 */
  sex: SexType
  /** 城市，必填 */
  city?: string
  /** 区域详细, 来自地图选择 必填 */
  address: AddressFormObject
  /** 联系电话，必填 */
  phoneNumber: string
  /** 地址标签, 家、公司 */
  title: string
  /** 手写详细地址 */
  details: string
  /** 是否为默认地址，默认为 false */
  isDefault: boolean
}

