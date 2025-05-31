<template>
  <view class="address-wrap page">
    <!-- <view class="header">
      <view class="title">当前位置</view>
      <view class="aside">
        <view class="btn">
          <comp-icons type="map-pin-ellipse" color="primary" :size="20" class="icon" />
          重新定位
        </view>
      </view>
    </view> -->
    <view class="list">
      <comp-card @click="handleAdd">
        <view class="add">
          <comp-icons type="plusempty" color="primary" class="icon-add" />
          新增收货地址
        </view>
      </comp-card>
      <comp-card v-for="item in list" :key="item.id">
        <view class="item-header">
          <view class="tag">{{ item.title }}</view>
          <view class="title">{{ item.poiName }}</view>
        </view>
        <view class="address">{{ item.poiAddress }} - {{ item.details }}</view>
        <view class="else">
          {{ item.contactName }}
          {{ formatSex(item.sex) }}
          <text class="phone">{{ item.phoneNumber }}</text>
        </view>
        <view class="aside">
          <view class="link" @click="()=> handleUpdate(item.id!)">编辑</view>
        </view>
      </comp-card>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { create, getList, update, getInfo } from './_api'
import { SexType } from '@/common/types/user'
import type { Address } from '@/common/types/address'
import type { FormData } from './form/page.vue'

const openFormPageUrl = 'form/page'

const list = ref<Address[]>([])

const getListFn = async () => {
  const { flag, data } = await getList()
  if (flag === 1) {
    list.value = data.list
  }
}

onMounted(() => getListFn())
const formatSex = (code: SexType) => (code === SexType.male ? '先生' : '女士')
const handleUpdate = async (id: string) => {
  const { flag, data } = await getInfo(id)
  const { poiName, poiAddress, location, ...rest } = data
  if (flag === 1) {
    const _data = {
      ...rest,
      address: {
        poiName,
        poiAddress,
        longitude: location?.coordinates[0],
        latitude: location?.coordinates[1]
      }
    }
    uni.navigateTo({
      url: `${openFormPageUrl}?id=${id}`,
      events: {
        updateAddress: async (formData: Address) => {
          const { flag } = await update(formData)
          if (flag === 1) getListFn()
        }
      },
      success(res) {
        res.eventChannel.emit('initAddress', _data)
      }
    })
  }
}
const handleAdd = () => {
  uni.navigateTo({
    url: openFormPageUrl,
    events: {
      createAddress: async (formData: FormData) => {
        const { id, address, ...rest } = formData        
        const { flag } = await create({
          ...rest,
          poiName: address?.poiName,
          poiAddress: address?.poiAddress,
          location: {
            type: 'Point',
            coordinates: [address?.longitude!, address?.latitude!]
          }
        })
        if (flag === 1) getListFn()
      }
    }
  })
}
</script>
<style scoped lang="scss">
.header {
  background: $uni-bg-color-container;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 24rpx;
  .btn {
    border: 1px solid $uni-border-light-color;
    border-radius: $uni-border-radius-round;
    display: flex;
    align-items: center;
    padding: 8rpx 22rpx;
    .icon {
      margin-right: 8rpx;
    }
  }
}
.list {
  .add {
    font-size: $uni-font-size-lg;
    display: flex;
    align-items: center;
    .icon-add {
      margin-right: 8rpx;
      position: relative;
    }
  }
  .item-header {
    display: flex;
    margin-bottom: 14rpx;
    .tag {
      background-color: $uni-color-primary;
      color: $uni-text-color-inverse;
      border-radius: $uni-border-radius-base;
      line-height: 1.6;
      text-align: center;
      min-width: 32rpx;
      padding: 0 4rpx 0;
      margin-right: 12rpx;
    }
    .title {
      font-size: $uni-font-size-lg;
    }
  }
  .phone {
    margin-left: 32rpx;
  }
  .address {
    margin-bottom: 8rpx;
  }
  .else {
    color: $uni-text-color-secondary;
  }
  .aside {
    position: absolute;
    top: 26rpx;
    right: 28rpx;
    .link {
      padding: 4rpx 12rpx;
    }
  }
}
</style>
