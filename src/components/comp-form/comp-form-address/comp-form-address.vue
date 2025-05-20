<template>
  <view
    :class="{
      ['comp-form-input']: true,
      placeholder: !value,
      error: !!errMsg
    }"
    @click="handleClick"
  >
    {{ errMsg || value || props.placeholder }}
  </view>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

interface Values {
  name?: string
  address?: string
  latitude?: number
  longitude?: number
}

interface Props {
  value?: Values
  inputBorder?: boolean
  placeholder?: string
  placeholderStyle?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请选择收货地址'
})

const model = defineModel<Values>()
const value = computed(() => model.value?.name || model.value?.address || props.value?.name)
const errMsg = ref<string | null>(null)
const emit = defineEmits(['change'])

const handleClick = () => {
  uni.chooseLocation({
    success: function (res) {
      errMsg.value = null
      const { name, address, latitude, longitude } = res
      if (!name) {        
        errMsg.value = '点击地图，在下方列表选择地址'
        return
      }
      model.value = { name, address, latitude, longitude }
      emit('change', model.value)
    },
    fail: function (res) {}
  })
}
</script>
<style scoped lang="scss">
.comp-form-input {
  display: flex;
  align-items: center;
  font-size: $uni-font-size-base;
  padding-left: 10px;
  line-height: 1.4;
  min-height: 36px;
}
.placeholder {
  color: $uni-text-color-placeholder;
}
.error {
  color: $uni-color-error;
}
</style>
