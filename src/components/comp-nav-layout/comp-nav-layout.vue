<template>
  <view class="layout">
    <view className="nav-left" style="top: 100rpx">
      <view
        v-for="item in navList"
        :key="item.id"
        class="nav-left-item"
        :class="{ active: activeMenu === item.id }"
        @click="handleNavClick"
      >
        {{ item.node }}
      </view>
    </view>
    <view class="nav-content">
      <view v-for="item in contentList" :key="item.id" class="nav-section">
        <view class="nav-title">{{ item.node }}</view>
        <view class="nav-content">
          <view v-for="child in item.children" :key="item.id" class="nav-content-item">
            
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Item {
  id: string
  node: any
}
interface ContentItem extends Item {
  menuCode: string
  children: Item[]
}
const props = defineProps<{
  navList: Item[]
  contentList: ContentItem[]
}>()
const { navList = [], contentList = [] } = props
const activeMenu = ref('2')
const handleNavClick = () => {
  console.log('handleNavClick')
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
    height: 200vh;
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
