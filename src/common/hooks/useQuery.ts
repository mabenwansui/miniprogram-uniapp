import { getCurrentInstance } from 'vue'
interface Rect {
  top: number
  left: number
  right: number
  bottom: number
  scrollTop: number
  scrollLeft: number
}
interface ScrollOffset {
  scrollHeight: number
  scrollTop: number
  scrollWidth: number
  scrollLeft: number
}
export function useQuery() {
  const instance = getCurrentInstance()
  const query = uni.createSelectorQuery().in(instance?.proxy)
  return {
    rect: (selector: string): Promise<Rect | Rect[]> => {
      return new Promise((resolve) =>
        query
          .select(selector)
          .fields({ rect: true }, (data) => resolve(data as Rect | Rect[]))
          .exec()
      )
    },
    dataset: (selector: string): Promise<any> => {
      return new Promise((resolve) =>
        query
          .select(selector)
          .fields({ dataset: true }, (data) => resolve(data))
          .exec()
      )
    },
    scrollOffset: (): Promise<ScrollOffset> => {
      return new Promise((resolve) => {
        query.selectViewport().scrollOffset((res) => {
          resolve(res as unknown as ScrollOffset)
        }).exec()
      })
    }
  }
}

// query
// .select('.a67e2c54ae2b84713db7b7319')
// .fields(
//   {
//     rect: true
//   },
//   (res) => {
//     console.log('maben:res', res)
//   }
// )
// .exec()
