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
      <Tag v-if="isLoading === false" :list="list" @del="handleTagDel" @change="handleTagChange" />
    </comp-card>
  </view>
</template>
<script setup lang="ts">
import { ref, getCurrentInstance } from 'vue'
import useTagList from './_hooks/useTagList'
import { delTag } from './_api'
import Tag from './_ui/tag.vue'

const formData = ref({ remark: '' })
const instance = getCurrentInstance()?.proxy
const { list, isLoading } = useTagList()

const handleTagDel = async (id: string) => {
  const { flag } = await delTag(id)
  if (flag) {
    list.value = list.value.filter(item => item.id !== id)
  }
}

const handleTagChange = (name: string) => {
  let val = name
  if (formData.value.remark && !/[, 、;，；]$/.test(formData.value.remark)) {
    val = ' ' + name
  }
  formData.value.remark = formData.value.remark + val
}

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
}
</style>
