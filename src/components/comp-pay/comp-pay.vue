<template>
  <uni-popup ref="popupRef" :safe-area="false" @change="handleChange" type="bottom">
    <view class="pay-wrap">
      <view class="close-icon">
        <comp-icons type="clear" size="large" color="inverse" @click="handleClose" />
      </view>
      <view class="content">
        <view class="title">
          请支付金额 : <comp-price class="price">{{ props.data.price }}元</comp-price>
        </view>
        <view class="pay-code">
          <image mode="widthFix" src="/static/pay/payment-code.png" />
        </view>
        <view class="description"> 请长按二维码进行支付，<br />支付完成后请点击下方的确认支付按钮 </view>
        <view class="action" @click="handlePay">
          <button type="warn" class="wx-button">我已付款，下一步</button>
        </view>
      </view>
    </view>
  </uni-popup>
  <uni-popup ref="confirmPopupRef" type="dialog">
    <uni-popup-dialog
      type="info"
      cancelText="关闭"
      confirmText="是的, 我已付款"
      content="请确认您已完成支付"
      @confirm="handleDialogConfirm"
    />
  </uni-popup>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
interface PayProps {
  price: number
}
const props = defineProps<{ data: PayProps }>()
const emit = defineEmits<{ submit: [] }>()

const popupRef = ref()
const confirmPopupRef = ref()
const open = defineModel<boolean>('open', { default: false })

const handleDialogConfirm = () => emit('submit')
const handleClose = () => {
  open.value = false
}
const handlePay = () => confirmPopupRef.value?.open()
const handleChange = ({ show }: { show: boolean }) => {
  if (open.value === show) return
  open.value = show
}
watchEffect(() => {
  const method = open.value === true ? 'open' : 'close'
  popupRef.value?.[method]()
})
</script>
<style scoped lang="scss">
.pay-wrap {
  width: 100vw;
  padding-top: 40rpx;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  &::before {
    content: '';
    position: absolute;
    top: -34px; /* 根据需要微调 */
    left: -25vw;
    width: 150vw;
    height: 440px; /* 控制弧度深浅 */
    background-color: #07c060; /* 微信绿 */
    border-bottom-left-radius: 100% 50%;
    border-bottom-right-radius: 100% 50%;
    z-index: 1;
  }
  .close-icon {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    z-index: 10;
  }
  .content {
    position: relative;
    z-index: 5;
    width: 100vw;
    .title {
      text-align: center;
      color: #fff;
      font-size: 36rpx;
      margin: 16rpx 0 40rpx;
      .price {
        font-size: 48rpx;
        font-weight: bold;
        border-radius: $uni-border-radius-round;
      }
    }
    .description {
      padding-top: 12rpx;
      color: #fff;
      text-align: center;
      line-height: 44rpx;
    }
    .pay-code {
      display: flex;
      width: 460rpx;
      height: 460rpx;
      background: #fff;
      justify-content: center;
      border-radius: $uni-border-radius-lg;
      margin: 20rpx auto;
      padding: 44rpx;
    }
    .action {
      padding: 140rpx 0;
      display: flex;
      align-items: center;
      .wx-button {
        background-color: $uni-color-wx;
      }
    }
  }
}
</style>
