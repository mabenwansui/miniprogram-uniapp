<template>
  <button
    class="comp-btn"
    :class="props.class"
    :style="props.style"
    :size="props.size"
    :type="props.type"
    :plain="props.plain"
    :disabled="props.disabled"
    :loading="props.loading"
    :form-type="props.formType"
    @click.stop="handleClick"
  >
    {{ props.class }}
    <slot />
  </button>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import type { StyleValue } from 'vue'
import { useAttrs } from 'vue'
interface Props {
  class?: string | string[] | Record<string, boolean>
  style?: StyleValue
  size: 'default' | 'mini'
  type: 'primary' | 'default' | 'warn'
  disabled: boolean
  loading: boolean
  plain: boolean
  formType: 'submit' | 'reset'
}
const props = defineProps<Partial<Props>>()
const attrs = useAttrs()
console.log('attr', attrs)
const emit = defineEmits<{ (e: 'click', event: Event): void }>()
const handleClick = (event: Event) => emit('click', event)
</script>
<style scoped lang="scss">
.comp-btn {
  background-color: $uni-color-primary;
}
</style>
