<template>
  <view class="address-page page">
    <comp-card>
      <view class="forms">
        <uni-forms :label-width="54" ref="formRef" :border="true" :model="formData" :rules="rules">
          <uni-forms-item class="form-item" label="联系人" name="name">
            <comp-form-input
              type="text"
              v-model="formData.name"
              placeholder="姓名"
              :input-border="false"
              :clearable="false"
            />
            <uni-data-checkbox class="sex" mode="tag" v-model="formData.sex" :localdata="sexOption" />
          </uni-forms-item>
          <uni-forms-item label="手机号" name="phoneNumber">
            <comp-form-input type="text" v-model="formData.phoneNumber" placeholder="手机号" :input-border="false" />
          </uni-forms-item>
          <uni-forms-item label="地址" name="address">
            <comp-form-address v-model="formData.address" />
          </uni-forms-item>
          <uni-forms-item label="门牌号" name="details">
            <comp-form-input type="text" v-model="formData.details" placeholder="选择收货地址" :input-border="false" />
          </uni-forms-item>
        </uni-forms>
      </view>
    </comp-card>
    <view class="action">
      <comp-form-button type="primary" @click="handleSubmit">保存</comp-form-button>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import { SexType } from '@/common/types/user'

const formRef = ref<any>(null)
const sexOption = [
  {
    value: SexType.male,
    text: '先生'
  },
  {
    value: SexType.female,
    text: '女士'
  }
]
const formData = ref({
  name: '',
  sex: SexType.male,
  phoneNumber: '',
  address: {
    name: '',
    address: '',
    latitude: undefined,
    longitude: undefined
  },
  details: ''
})

const rules = ref({
  name: {
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
  const data = await formRef.value?.validate()
  const instance: any = getCurrentInstance()?.proxy
  if (!instance) {
    const eventChannel = instance.getOpenerEventChannel()
    eventChannel.emit('createAddress', { data })
  }
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
