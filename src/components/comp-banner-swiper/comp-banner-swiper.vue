<template>
  <swiper
    class="swiper"
    circular
    indicator-dots
    autoplay
    indicator-color="rgba(255, 255, 255, .3)"
    indicator-active-color="rgb(255, 255, 255)"
    :interval="4000"
    :duration="500"
  >
    <swiper-item v-for="item in imgUrl" :key="item">
      <image :src="item" mode="widthFix" class="swiper-img-item" />
    </swiper-item>
  </swiper>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
  imgUrl: {
    type: Array,
    default: () => []
  }
})
const imgUrl = ref(props.imgUrl)
</script>
<style>
.swiper {
  width: 100%;
  height: 400rpx;
}
.swiper-img-item {
  display: block;
  width: 100%;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
  background-color: aqua;
}
</style>
