<template>
  <view class="commodity-wrap page">
    <select-store v-if="showStore" :onChange="handleChange" />
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import SelectStore from './_ui/select-store/select-store.vue'

const showStore = ref(false)

const navigateToStore = (storeId: string) => uni.navigateTo({ url: `/pages/commodity/list/page?store=${storeId}` })

onLoad((searchParams) => {
  if (searchParams?.store) {
    navigateToStore(searchParams?.store)
  } else {
    showStore.value = true
  }
})

const handleChange = (storeId: string) => navigateToStore(storeId)
</script>

<style scoped lang="scss">
.header {

}
</style>
