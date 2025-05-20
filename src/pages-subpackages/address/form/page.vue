<template>
  <view class="address-page page" v-if="!isLoading">
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
          <uni-forms-item label="标签">
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
import { ref, getCurrentInstance } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { SexType } from '@/common/types/user'
import useLoading from '@/common/hooks/useLoading'
import type { Address } from '@/common/types/address'
import { getInfo } from '../_api'

const { isLoading, showLoading, hideLoading } = useLoading()

onLoad(async (params) => {
  if (params && params.id) {
    showLoading()
    const { flag, data } = await getInfo(params.id)
    hideLoading()
    if (flag === 1) {
      formData.value = data
    }
  }
})

const instance = getCurrentInstance()
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
const formData = ref<Address>({
  id: '',
  contactName: '',
  title: '家',
  sex: SexType.male,
  phoneNumber: '',
  address: {
    name: '',
    address: ''
  },
  details: '',
  isDefault: false
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
          if (!value.name) {
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

const handleSubmit = async () => {
  await formRef.value?.validate()
  const _instance: any = instance?.proxy
  const eventChannel = _instance.getOpenerEventChannel()
  if (formData.value?.id) {
    eventChannel.emit('updateAddress', formData.value)
  } else {
    eventChannel.emit('createAddress', formData.value)
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
