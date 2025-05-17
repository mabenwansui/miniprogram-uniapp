<template>
  <button
    class="comp-btn"
    :size="props.size"
    :type="props.type"
    :plain="props.plain"
    :disabled="props.disabled"
    :loading="props.loading"
    :form-type="props.formType"
    @click="handleClick"
  >
    <slot />
  </button>
</template>
<script setup lang="ts">
import type { StyleValue } from 'vue'
interface Props {
  class?: any
  style?: StyleValue
  size: 'default' | 'mini'
  type: 'primary' | 'default' | 'warn'
  disabled: boolean
  loading: boolean
  plain: boolean
  formType: 'submit' | 'reset'
}
const props = defineProps<Partial<Props>>()
const emit = defineEmits<{ (e: 'click', event: Event): void }>()
const handleClick = (event: Event) => emit('click', event)
</script>
<style scoped lang="scss">
.comp-btn {
  background-color: $uni-color-primary;
}
</style>
