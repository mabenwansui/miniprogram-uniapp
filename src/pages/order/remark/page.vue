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
import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue'
import useTagList from './_hooks/useTagList'
import { createTag, delTag } from './_api'
import Tag from './_ui/tag.vue'

interface FormData {
  remark: string
}

const formData = ref<FormData>({ remark: '' })
const instance = getCurrentInstance()?.proxy
const { list, mutate, isLoading } = useTagList()

const autoSaveRemarkToTag = () => {
  const remark = formData.value.remark.trim()
  if (remark.length <= 1 || remark.length > 20) return
  if (list.value.some((item) => item.name === remark)) return
  createTag(remark)
}

onMounted(() => {
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.on('initOrderMark', (data: FormData) => {
    formData.value = data
  })
})

onUnmounted(() => {
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.off('initOrderMark')
})

const handleSubmit = () => {
  autoSaveRemarkToTag()
  const eventChannel = (instance as any).getOpenerEventChannel()
  eventChannel.emit('updateRemark', { ...formData.value })
  uni.navigateBack()
}

const handleTagDel = async (id: string) => {
  const { flag } = await delTag(id)
  if (flag) mutate(list.value.filter((item) => item.id !== id))
}

const handleTagChange = (name: string) => {
  let val = name
  if (formData.value.remark && !/[, 、;，；]$/.test(formData.value.remark)) {
    val = ' ' + name
  }
  formData.value.remark = formData.value.remark + val
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
