// observer检测原理: 通过将top，与bottom，将观测视口压缩成1px的线，以精准判断当前进入唯一的元素
import { getSystemInfo } from '@/common/js/systemInfo'
import { onUnmounted, getCurrentInstance } from 'vue'

export default function useObserverMenu() {
  let observer: UniNamespace.IntersectionObserver
  const titleItemHeight = 20
  const windowHeight = getSystemInfo().windowHeight
  onUnmounted(() => observer?.disconnect())
  return function fn(top: number, cb: (menuCode: string, index: number) => void) {
    const instance = getCurrentInstance()
    if (observer) {
      observer.disconnect()
    }
    observer = uni.createIntersectionObserver(instance, { thresholds: [0], nativeMode: true, observeAll: true } as any)
    observer
      .relativeToViewport({
        top: -(top + titleItemHeight - 1),
        bottom: -(windowHeight - top - titleItemHeight)
      })
      .observe('.page >>> .nav-section', (res) => {
        const {
          intersectionRect,
          dataset: { id, index }
        } = res as UniApp.ObserveResult & { dataset: { id: string, index: number } }
        const { width, height } = intersectionRect
        if (width > 0 || height > 0) {
          cb(id, index)
        }
      })
  }
}
