<template>
  <view class="address-page page">
    <comp-card>
      <view class="forms">
        <uni-forms :label-width="54" ref="formRef" :border="true" :model="formData" :rules="rules">
          <uni-forms-item class="form-item" label="联系人" name="contactName">
            <uni-easyinput
              type="text"
              placeholder="姓名"
              placeholder-style="font-size: 14px;"
              v-model="formData.contactName"
              :input-border="false"
              :clearable="false"
            />
            <uni-data-checkbox class="sex" mode="tag" v-model="formData.sex" :localdata="sexOption" />
          </uni-forms-item>
          <uni-forms-item label="标签2">
            <uni-data-checkbox mode="tag" v-model="formData.title" :localdata="tagOption" />
          </uni-forms-item>
          <uni-forms-item label="手机号" name="phoneNumber">
            <uni-easyinput
              type="text"
              v-model="formData.phoneNumber"
              placeholder="手机号"
              placeholder-style="font-size: 28rpx;"
              :input-border="false"
            />
          </uni-forms-item>
          <uni-forms-item label="地址" name="address">
            <comp-form-address v-model="formData.address" />
          </uni-forms-item>
          <uni-forms-item label="门牌号" name="details">
            <uni-easyinput
              type="text"
              v-model="formData.details"
              placeholder="选择收货地址"
              placeholder-style="font-size: 28rpx;"
              :input-border="false"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </comp-card>
    <view class="action">
      <button type="primary" @click="handleSubmit">保存</button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import { SexType } from '@/common/types/user'
import type { Address, AddressLocation } from '@/common/types/address'

export interface FormData extends Omit<Address, keyof AddressLocation> {
  address: {
    poiName: string
    poiAddress: string
    longitude?: number
    latitude?: number
  }
}

const instance = getCurrentInstance()?.proxy

const formRef = ref<any>(null)
const sexOption = [
  { value: SexType.male, text: '先生' },
  { value: SexType.female, text: '女士' }
]
const tagOption = [
  { value: '家', text: '家' },
  { value: '公司', text: '公司' },
  { value: '学校', text: '学校' },
  { value: '父母家', text: '父母家' }
]
const formData = ref<FormData>({
  id: '',
  contactName: '',
  title: '家',
  sex: SexType.male,
  phoneNumber: '',
  isDefault: false,
  details: '',
  address: {
    poiName: '',
    poiAddress: ''
  }
})
const rules = ref({
  contactName: {
    rules: [{ required: true, errorMessage: '请输入联系人姓名' }]
  },
  phoneNumber: {
    rules: [{ required: true, errorMessage: '请输入手机号' }]
  },
  address: {
    rules: [
      {
        validateFunction: (rule: any, value: any, data: any, callback: any) => {
          if (!value.poiName) {
            callback('请选择收货地址')
          }
          return true
        }
      }
    ]
  },
  details: {
    rules: [{ required: true, errorMessage: '请输入门牌号' }]
  }
})

onMounted(() => {
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.on('initAddress', (data: FormData) => {
    formData.value = data
  })
})

onUnmounted(() => {
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.off('initAddress')
})

const handleSubmit = async () => {
  await formRef.value?.validate()
  const eventChannel = (instance as any).getOpenerEventChannel()

  if (formData.value?.id) {
    eventChannel.emit('updateAddress', { ...formData.value })
  } else {
    eventChannel.emit('createAddress', { ...formData.value })
  }

  uni.navigateBack()
}
</script>
<style scoped lang="scss">
.forms {
  padding: 0 28rpx 0;
  .form-item {
    position: relative;
    :global(.uni-easyinput) {
      position: relative;
      top: 1px;
    }
  }
  .name {
    position: relative;
  }
  .sex {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }
}
.action {
  margin: 0 $uni-spacing-page;
}
</style>
