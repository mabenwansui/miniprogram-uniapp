<template>
  <uni-easyinput
    :value="value"
    :type="props.type"
    :clearable="props.clearable"
    :autoHeight="props.autoHeight"
    :placeholder="props.placeholder"
    :placeholderStyle="placeholderStyle"
    :focus="props.focus"
    :disabled="props.disabled"
    :maxlength="props.maxlength"
    :confirmType="props.confirmType"
    :clearSize="props.clearSize"
    :trim="props.trim"
    :inputBorder="props.inputBorder"
    :prefixIcon="props.prefixIcon"
    :suffixIcon="props.suffixIcon"
    :styles="props.styles"
    :passwordIcon="props.passwordIcon"
    :adjustPosition="props.adjustPosition"
    :cursorSpacing="props.cursorSpacing"
    :primaryColor="props.primaryColor"
    @click="handleClick"
    @input="handleInput"
    @clear="handleClear"
    @focus="handleFocus"
    @blur="handleBlur"
    @confirm="handleConfirm"
    @iconClick="handleIconClick"
    @change="handleChange"
    @keyboardheightchange="handleKeyboardHeightChange"
  ></uni-easyinput>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps<{
  // 严格遵循文档属性顺序
  value?: string | number
  modelValue?: string | number
  type?: 'text' | 'textarea' | 'password' | 'number' | 'idcard' | 'digit'
  clearable?: boolean
  autoHeight?: boolean
  placeholder?: string
  placeholderStyle?: string
  focus?: boolean
  disabled?: boolean
  maxlength?: number
  confirmType?: 'send' | 'search' | 'next' | 'go' | 'done'
  clearSize?: number
  prefixIcon?: string
  suffixIcon?: string
  trim?: boolean | 'both' | 'left' | 'right' | 'all' | 'none'
  inputBorder?: boolean
  styles?: {
    color?: string
    disableColor?: string
    borderColor?: string
  }
  passwordIcon?: boolean
  adjustPosition?: boolean
  primaryColor?: string
  cursorSpacing?: number
}>()

const value = computed(() => props.modelValue !== undefined ? props.modelValue : props.value)
const placeholderStyle = computed(() => `font-size: 14px; ${props.placeholderStyle}`)

const emit = defineEmits([
  'update:modelValue',
  'click',
  'input',
  'clear',
  'focus',
  'blur',
  'confirm',
  'iconClick',
  'change',
  'keyboardheightchange'
])

// 实现 v-model 双向绑定
const innerValue = ref(props.modelValue)
watch(
  () => props.modelValue,
  (val) => (innerValue.value = val)
)

const handleInput = (e: CustomEvent) => {
  const value = e.detail?.value || ''
  innerValue.value = value
  emit('update:modelValue', value)
  emit('input', e)
}
const handleClear = () => emit('clear')
const handleClick = () => emit('click')
const handleFocus = (e: Event) => emit('focus', e)
const handleBlur = (e: Event) => emit('blur', e)
const handleConfirm = (e: Event) => emit('confirm', e)
const handleIconClick = (type: 'prefix' | 'suffix') => emit('iconClick', type)
const handleChange = (e: CustomEvent) => emit('change', e)
const handleKeyboardHeightChange = (e: CustomEvent) => emit('keyboardheightchange', e)
</script>

<style scoped lang="scss">
// ... existing code ...
</style>
