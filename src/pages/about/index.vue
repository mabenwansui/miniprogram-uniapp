<template>
  <div>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
    <Child :num="num" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Child from './Child.vue'

const num = ref(0)

const decrease = () => {
  if (num.value > 0) num.value--
}

const increase = () => {
  num.value++
}
</script>