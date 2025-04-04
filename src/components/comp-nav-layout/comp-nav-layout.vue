<!--
observer检测原理: 通过将top，与bottom，将观测视口压缩成1px的线，以精准判断当前进入唯一的元素
-->
<template>
  <view class="layout">
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
    <view class="nav-main">
      <uni-list>
        <view class="nav-list">
          <view
            v-for="(item, index) in props.data"
            :key="item.id"
            :data-id="item.id"
            :data-index="index"
            :class="['nav-section', 'id_' + item.id]"
          >
            <view class="nav-title" :style="{ top: `${top}px` }">
              <slot name="commodityTitle" :index="index" :item="item"></slot>
            </view>
            <view class="nav-content">
              <view v-if="loading[index] === true" class="placeholder">
                <uni-load-more status="loading" :showText="false" />
              </view>
              <uni-list-item
                v-else-if="item?.children"
                v-for="child in item.children"
                :key="child.id"
                class="nav-content-item"
              >
                <template #body>
                  <slot name="commodityItem" :index="index" :item="child"></slot>
                </template>
              </uni-list-item>
            </view>
          </view>
        </view>
      </uni-list>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useQuery } from '@/common/hooks/useQuery'
import useObserverMenu from './useObserverMenu'
import useObserverSectionLoad from './useObserverSectionLoad'
interface Item {
  id: string
  nodeData: any
  children: Item[]
}
const props = defineProps<{
  top: number
  data: Item[]
  onLoad?: (categoryId: string, index: number) => Promise<void>
}>()
const query = useQuery()
const activeMenu = ref<string>()
const loading = ref<boolean[]>([])
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
  let top: number
  let scrollFn = null
  if (scrollToTop === true) {
    const rect = (await query.rect(`.id_${menuCode}`)) as any
    top = rect.top
    scrollFn = async () => {
      const { scrollTop } = await query.scrollOffset()
      uni.pageScrollTo({ scrollTop: top + scrollTop })
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
  .nav-main {
    flex: 1;
    .nav-list .nav-section:last-child {
      min-height: 100vh;
    }
    .nav-section {
      .nav-title {
        background-color: rgb(255, 145, 0);
        position: sticky;
        z-index: 10;
      }
      .nav-content {
        .placeholder {
          padding-top: 100rpx;
          min-height: 150vh;
        }
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
