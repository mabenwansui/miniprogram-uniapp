<template>
  <comp-form-input
    type="text"
    class="comp-form-address"
    placeholder="选择收货地址"
    v-model="value"
    :inputBorder="false"
    @focus="handleClick"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  modelValue?: {
    name: string
    address: string
    latitude: number | undefined
    longitude: number | undefined
  }
}>()

const value = computed(() => props.modelValue?.name)
const emit = defineEmits(['update:modelValue'])

const handleClick = () => {
  uni.chooseLocation({
    success: function (res) {
      console.log(res)
      const { name, address, latitude, longitude } = res
      emit('update:modelValue', {
        name,
        address,
        latitude,
        longitude
      })
    },
    fail: function (res) {
      console.log(res)
      // throw new Error(res.errMsg, { cause: res })
    }
  })
}
</script>
<style scoped lang="scss"></style>
