<template>
  <uni-easyinput
    :value="model"
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
import { computed } from 'vue'
interface Props {
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
}
const props = withDefaults(defineProps<Props>(), {
  trim: true,
  inputBorder: true,
  passwordIcon: true
})

const model = defineModel<string | number>()
const placeholderStyle = computed(() => `font-size: 14px; ${props.placeholderStyle}`)

const emit = defineEmits([
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

const handleInput = (val: string) => {
  model.value = val
  emit('input', val)
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
