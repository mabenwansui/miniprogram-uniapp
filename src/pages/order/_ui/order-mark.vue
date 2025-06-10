<template>
  <comp-card>
    <comp-card-listitem title="订单备注" :aside-title="remarkVal" @click="handleClick" />
  </comp-card>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const placeholder = '口味、偏好等需求'
const remarkVal = computed(() => model.value?.remark || placeholder)

const model = defineModel<{ remark: string }>()
const handleClick = () =>
  uni.navigateTo({
    url: '/pages/order/remark/page',
    events: {
      updateRemark: async (formData: { remark: string }) => {
        if (model.value) {
          model.value.remark = formData.remark
        }
      }
    },
    success: (res) => {
      res.eventChannel.emit('initOrderMark', model.value)
    }
  })
</script>
<style scoped lang="scss"></style>
