import { onUnmounted, getCurrentInstance } from 'vue'

const threshold = 400
export default function useObserverSectionLoad() {
  let observer: UniNamespace.IntersectionObserver
  onUnmounted(() => observer?.disconnect())
  return function fn(cb: (menuCode: string, index: number) => void) {
    const instance = getCurrentInstance()
    if (observer) {
      observer.disconnect()
    }
    observer = uni.createIntersectionObserver(instance, {
      thresholds: [0],
      nativeMode: true,
      observeAll: true
    } as any)
    observer
      .relativeToViewport({
        top: threshold,
        bottom: threshold
      })
      .observe('.page >>> .nav-section', (res) => {
        const {
          intersectionRect,
          dataset: { id, index }
        } = res as UniApp.ObserveResult & { dataset: { id: string; index: number } }
        const { width, height } = intersectionRect
        if (width > 0 || height > 0) {
          cb(id, index)
        }
      })
  }
}
