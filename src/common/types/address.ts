export enum SexType {
  male = 'male',
  female = 'female'
}

export interface AddressInterface {
  /** id */
  id: string
  /** 收件人，必填 */
  name: string
  /** 性别 */
  sex: SexType
  /** 城市，必填 */
  city: string
  /** 区域，必填 */
  address: string
  /** 联系电话，必填 */
  phoneNumber: string
  /** 地址标签, 家、公司 */
  title: string
  /** 是否为默认地址，默认为 false */
  isDefault: boolean
}
