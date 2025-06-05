<template>
  <comp-card>
    <comp-card-listitem title="订单备注" aside-title="口味、偏好等需求" @click="handleClick" />
  </comp-card>
</template>
<script setup lang="ts">
const model = defineModel<{
  remark: string
}>()
const handleClick = () => uni.navigateTo({ url: '/pages/order/remark/page' })
</script>
<style scoped lang="scss"></style>
