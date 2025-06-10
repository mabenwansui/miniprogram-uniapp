<template>
  <view class="tag">
    <view class="title">
      快捷标签
      <view class="aside" v-if="showEditBtn">
        <view v-if="!isEdit" @click="handleEdit(true)">
          <comp-icons class="icon" type="compose" size="small" />编辑
        </view>
        <view v-else @click="handleEdit(false)"> <comp-icons class="icon" type="checkbox" size="small" />完成 </view>
      </view>
    </view>
    <view class="content">
      <view
        v-for="item in list"
        :key="item.id"
        @click="() => handleClick(item)"
        class="tag-item"
        :class="isEdit && item.isSystem ? 'disabled' : ''"
      >
        {{ item.name }}
        <view v-if="isEdit && !item.isSystem" class="del" @click.stop="() => handleDel(item.id)">
          <comp-icons class="icon" color="error" size="small" type="minus-filled" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Response } from '../_api'

const props = defineProps<{
  list: Response['list']
}>()

const emit = defineEmits<{
  (e: 'change', name: string): void
  (e: 'del', id: string): void
}>()

const isEdit = ref(false)
const showEditBtn = computed(() => {
  return isEdit.value === true || props.list.filter((item) => item.isSystem === false).length > 0 ? true : false
})
const handleClick = (item: any) => {
  if (isEdit.value === true) return
  emit('change', item.name)
}
const handleEdit = (val: boolean) => (isEdit.value = val)
const handleDel = async (id: string) => emit('del', id)
</script>

<style scoped lang="scss">
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
</style>
