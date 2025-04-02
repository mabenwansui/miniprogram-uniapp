<!--
observer检测原理: 通过将top，与bottom，将观测视口压缩成1px的线，以精准判断当前进入唯一的元素
-->

<template>
  <view class="layout" id="comp-layout">
    <view class="nav-left" :style="{ top: `${top}px` }">
      <view
        v-for="(item, index) in props.data"
        :key="item.id"
        :class="{ active: activeMenu === item.id }"
        @click="() => handleNavClick(item.id, index)"
        class="nav-left-item"
      >
        <slot name="navItem" :item="item"></slot>
      </view>
    </view>
    <view class="nav-content">
      <view v-for="(item, index) in props.data" :key="item.id" :id="item.id" class="nav-section">
        <view class="nav-title" :style="{ top: `${top}px` }">
          <slot name="commodityTitle" :index="index" :item="item"></slot>
        </view>
        <view class="nav-content">
          <view v-if="item?.children" v-for="child in item.children" :key="child.id" class="nav-content-item">
            <slot name="commodityItem" :index="index" :item="child"></slot>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed, onUnmounted, getCurrentInstance } from 'vue'
import { getSystemInfo } from '@/common/js/systemInfo'
interface Item {
  id: string
  nodeData: any
  children: Item[]
}
const props = defineProps<{
  top: number
  data: Item[]
  onMenuChange?: (arg: { categoryId: string; index: number }) => void
}>()
const activeMenu = ref<string>()
const instance = getCurrentInstance()
const windowHeight = getSystemInfo().windowHeight
const top = computed(() => props.top || 0)
let observer: UniNamespace.IntersectionObserver
onUnmounted(() => observer?.disconnect())
function setMenu(categoryId: string, index?: number, pageIndex?: number) {
  activeMenu.value = categoryId
  index !== undefined && props?.onMenuChange?.({ categoryId, index })
}
function observerFn() {
  if (observer) {
    observer.disconnect()
  }
  const titleItemHeight = 20
  observer = uni.createIntersectionObserver(instance, { thresholds: [0], nativeMode: true, observeAll: true } as any)
  observer
    .relativeToViewport({
      top: -(top.value + titleItemHeight - 1),
      bottom: -(windowHeight - top.value - titleItemHeight)
    })
    .observe('.nav-section', (res) => {
      const { intersectionRect, id } = res as UniApp.ObserveResult & { id: string }
      const { width, height } = intersectionRect
      if (width > 0 || height > 0) {
        setMenu(id)
      }
    })
}

watchEffect(() => {
  if (props.data.length > 0) {
    setMenu(props.data[0].id, 0)
    observerFn()
  }
})
const handleNavClick = (categoryId: string, index: number) => {
  setMenu(categoryId, index)
}
</script>
<style scoped lang="scss">
.layout {
  display: flex;
  .nav-left {
    width: 214rpx;
    overflow-y: auto;
    background-color: red;
    position: sticky;
    height: 100vh;
    .nav-left-item {
      text-align: center;
      font-size: 28rpx;
      line-height: 60rpx;
      padding: 16rpx 0;
      &.active {
        background-color: #fff;
      }
    }
  }
  .nav-content {
    flex: 1;
    .nav-section {
      background-color: green;
      .nav-title {
        background-color: rgb(255, 145, 0);
        position: sticky;
        z-index: 10;
      }
      .nav-content {
        .nav-content-item {
          min-height: 400rpx;
          background-color: rgb(255, 255, 0);
          border-bottom: 1rpx solid #000;
        }
      }
    }
  }
}
</style>
