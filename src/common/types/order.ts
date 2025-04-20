import type { Commodity } from "./commodity";

export type OrderCommodity = Pick<Commodity, 'categoryId' | 'price' | 'coverImageUrl' | 'description' | 'name'> & {
  commodityId: string,
  quantity: number
}

export enum ORDER_TYPE {
  /** 堂食 */
  DINE_IN = 'dine-in',
  /** 外卖 */
  TAKE_OUT = 'takeout',
  /** 配送 */
  DELIVERY = 'delivery'
}

export enum ORDER_STATUS {
  /** 待支付 */
  PENDING = 'pending',
  /** 处理中 */
  PROCESSING = 'processing',
  /** 待取餐 */
  READY = 'ready',
  /** 已取消 */
  CANCELLED = 'cancelled',
  /** 申请退款 */
  REFUND_REQUESTED = 'refund_requested',
  /** 退款中 */
  REFUNDING = 'refunding',
  /** 退款失败 */
  REFUND_FAILED = 'refund_failed',
  /** 退款完成 */
  REFUNDED = 'refunded',
  /** 已完成 */
  COMPLETED = 'completed'
}

export enum PAYMENT_TYPE {
  /** 微信支付 */
  WECHAT = 'wechat',
  /** 支付宝支付 */
  ALIPAY = 'alipay'
}

export enum PAYMENT_STATUS {
  /** 未支付 */
  UNPAID = 'unpaid',
  /** 已支付 */
  PAID = 'paid',
  /** 支付失败 */
  FAILED = 'failed'
}

export interface OrderInfo {
  orderType: ORDER_TYPE // 订单类型
  orderStatus?: ORDER_STATUS // 订单状态
  paymentType: PAYMENT_TYPE // 支付类型
  paymentStatus?: PAYMENT_STATUS // 支付状态
  table_number?: string // 桌号  
  remark?: string
  commoditys: OrderCommodity[]
}
