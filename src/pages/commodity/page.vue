<template>
  <view class="commodity-wrap page"></view>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import useGetLocation from '@/common/hooks/useGetLocation'
import useSearchParams from '@/common/hooks/useSearchParams'
import { getNearStore } from './_api/store'

const location = useGetLocation()
const params = useSearchParams()
const navigateToStore = (storeId: string) => uni.navigateTo({ url: `/pages/commodity/list/page?store=${storeId}` })

watchEffect(async () => {
  if (params.isLoading.value === false && params.searchParams.value?.store) {
    navigateToStore(params.searchParams.value.store)
  } else if (location.value?.latitude) {
    const { flag, data } = await getNearStore({ lon: location.value.longitude!, lat: location.value.latitude }) 
    if (flag === 1) {
      navigateToStore(data.id)
    }
  }
})
</script>

<style scoped lang="scss"></style>
