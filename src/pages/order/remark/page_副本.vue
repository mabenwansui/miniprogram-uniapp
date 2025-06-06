<template>
  <view class="remark-wrap page">
    <comp-card>
      <uni-forms :modelValue="formData">
        <uni-forms-item name="remark">
          <uni-easyinput
            class="remark"
            type="textarea"
            autoHeight
            :inputBorder="false"
            v-model="formData.remark"
            placeholder="请输入口味偏好等要求"
            placeholder-style="font-size: 28rpx"
          />
        </uni-forms-item>
      </uni-forms>
      <view class="btn-action">
        <button type="primary" @click="handleSubmit">保存</button>
      </view>
      <view class="tag">
        <view class="title">
          快捷标签
          <view class="aside">
            <view v-if="!isEdit" @click="handleEdit(true)">
              <comp-icons class="icon" type="compose" size="small" />编辑
            </view>
            <view v-else @click="handleEdit(false)"><comp-icons class="icon" type="checkbox" size="small" />完成</view>
          </view>
        </view>
        <view class="content" v-if="isLoading === false">
          <view
            v-for="item in list"
            :key="item.id"
            @click="() => handleClick(item.name)"
            class="tag-item"
            :class="isEdit && item.isSystem ? 'disabled' : ''"
          >
            {{ item.name }}
            <view v-if="isEdit && !item.isSystem" class="del" @click="() => handleDel(item.id)">
              <comp-icons class="icon" color="error" size="small" type="minus-filled" />
            </view>
          </view>
        </view>
      </view>
    </comp-card>
  </view>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import useTagList from './_hooks/useTagList'
import { delTag } from './_api'

const formData = ref({
  remark: ''
})
const instance = getCurrentInstance()?.proxy
const isEdit = ref(false)

const { list, isLoading } = useTagList()

const handleClick = (name: string) => {
  let val = name
  if (formData.value.remark && !/[, 、;，；]$/.test(formData.value.remark)) {
    val = ' ' + name
  }
  formData.value.remark = formData.value.remark + val
}

const handleDel = async (id: string) => {
  const { flag } = await delTag(id)
  if (flag) {
    list.value = list.value.filter(item => item.id !== id)
  }
}
const handleEdit = (val: boolean) => (isEdit.value = val)

const handleSubmit = () => {
  const eventChannel = (instance as any).getOpenerEventChannel()
  const emitType = formData.value?.remark ? 'updateAddress' : 'createAddress'
  eventChannel.emit(emitType, { ...formData.value })
  uni.navigateBack()
}
</script>
<style scoped lang="scss">
.remark-wrap {
  :deep(.uni-easyinput__content-textarea) {
    margin: 0;
    padding: 20rpx;
    background: $uni-bg-color-grey !important;
    border: none !important;
  }
  .btn-action {
    margin-top: 24rpx;
  }
  .tag {
    margin-top: 32rpx;
    .title {
      display: flex;
      justify-content: space-between;
      color: $uni-text-color-secondary;
      .aside {
        display: flex;
        align-items: center;
        .icon {
          position: relative;
          top: 2rpx;
          margin-right: 4rpx;
        }
      }
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      margin: 20rpx 0;
      .tag-item {
        position: relative;
        padding: 10rpx 20rpx;
        margin: 0 20rpx 20rpx 0;
        border: 1px solid $uni-border-color;
        border-radius: $uni-border-radius-base;

        &.disabled {
          border-color: $uni-border-light-color;
          color: $uni-text-color-secondary;
        }

        .del {
          position: absolute;
          top: -18rpx;
          right: -16rpx;
        }
      }
    }
  }
}
</style>
