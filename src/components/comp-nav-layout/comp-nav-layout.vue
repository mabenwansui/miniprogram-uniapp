<template>
  <scroll-view
    class="scroll-view"
    :scroll-into-view="scrollIntoView"
    :scroll-anchoring="true"
    :scroll-y="true"
    :show-scrollbar="false"
  >
    <slot name="header" />
    <view class="layout">
      <view class="nav-left" :style="{ top: `${top}px` }">
        <view
          v-for="(item, index) in props.data"
          :key="item.id"
          :class="{ active: activeMenu === item.id }"
          @click="() => handleNavClick(item.id, index)"
          class="nav-left-item"
        >
          <slot name="navItem" :item="item" />
        </view>
      </view>
      <view class="nav-main">
        <view
          v-for="(item, index) in props.data"
          :key="item.id"
          :data-id="item.id"
          :data-index="index"
          :class="['nav-section', 'id_' + item.id]"
        >
          <view class="nav-title" :style="{ top: `${top}px` }">
            <slot name="commodityTitle" :index="index" :item="item" />
          </view>
          <view class="nav-content">
            <view v-if="loading[index] === true" class="placeholder">
              <uni-load-more status="loading" :showText="false" />
            </view>
            <view v-else-if="item?.children" v-for="child in item.children" :key="child.id" class="nav-content-item">
              <slot name="commodityItem" class="commodity-item" :parentIndex="index" :item="child" />
            </view>
          </view>
        </view>
      </view>
    </view>
    <slot name="footer" />
  </scroll-view>
</template>
<script setup lang="ts">
/** observer检测原理: 通过将top，与bottom，将观测视口压缩成1px的线，以精准判断当前进入唯一的元素 */
import { ref, watchEffect, computed, nextTick } from 'vue'
import useObserverMenu from './useObserverMenu'
import useObserverSectionLoad from './useObserverSectionLoad'
interface Item extends Record<string, any> {
  id: string
  children: Item[]
}
const props = defineProps<{
  top: number
  data: Item[]
  onLoad?: (categoryId: string, index: number) => Promise<void>
}>()
const activeMenu = ref<string>()
const loading = ref<boolean[]>([])
const scrollIntoView = ref<string>()
let curIndex: number
const observerMenu = useObserverMenu()
const observerSectionLoad = useObserverSectionLoad()
const top = computed(() => props.top || 0)

function setMenu(menuCode: string, index: number) {
  curIndex = index
  activeMenu.value = menuCode
}
async function tirggerLoad(menuCode: string, index: number, scrollToTop: boolean = false) {
  curIndex = index
  let scrollFn = null
  if (scrollToTop === true) {
    scrollFn = async () => {
      scrollIntoView.value = ''
      nextTick(() => (scrollIntoView.value = `.id_${menuCode}`))
    }
  }
  if (!props.data[index]?.children) {
    loading.value[index] = true
    scrollFn && (await scrollFn())
    await props?.onLoad?.(menuCode, index)
    loading.value[index] = false
  } else {
    scrollFn && (await scrollFn())
  }
}

watchEffect(async () => {
  if (props.data.length > 0) {
    const menuCode = props.data[0].id
    setMenu(menuCode, 0)
    await tirggerLoad(menuCode, 0)
    observerMenu(top.value, (menuCode, index) => {
      setMenu(menuCode, index)
    })
    observerSectionLoad((menuCode: string, index: number) => {
      if (index === 0 || index >= props.data.length || curIndex === index) return
      tirggerLoad(menuCode, curIndex > index ? curIndex - 1 : curIndex + 1)
    })
  }
})
const handleNavClick = async (menuCode: string, index: number) => {
  setMenu(menuCode, index)
  tirggerLoad(menuCode, index, true)
}
</script>
<style scoped lang="scss">
.scroll-view {
  height: 100vh;
}

.layout {
  display: flex;
  .nav-left {
    width: 214rpx;
    overflow-y: auto;
    background-color: $uni-bg-color-container;
    position: sticky;
    height: 100vh;
    .nav-left-item {
      text-align: center;
      font-size: $uni-font-size-base;
      color: $uni-text-color-secondary;
      line-height: 40rpx;
      padding: 16rpx 0;
      margin-bottom: 6px;
      &.active {
        color: $uni-color-primary-secondary;
        background-color: $uni-bg-color;
      }
    }
  }

  .nav-main {
    flex: 1;
    .nav-section {
      &:last-child {
        min-height: 100vh;
      }
      .nav-title {
        font-size: $uni-font-size-base;
        position: sticky;
        background: $uni-bg-color;
        line-height: 40rpx;
        padding: 16rpx 0 16rpx 15px;
        z-index: 10;
      }
      .nav-content {
        .placeholder {
          padding-top: 100rpx;
          min-height: 150vh;
        }
        .commodity-item {
          width: 100%;
        }
        .nav-content-item {
          padding: 14rpx 32rpx;
        }
      }
    }
  }
}
</style>
