import { getCurrentInstance } from 'vue'

interface Boundary {
  top: number
  left: number
  right: number
  bottom: number
}
export interface Rect extends Boundary {
  scrollTop: number
  scrollLeft: number
}
export interface ScrollOffset {
  scrollHeight: number
  scrollTop: number
  scrollWidth: number
  scrollLeft: number
}
export interface ClientRect extends Boundary {
  width: number
  height: number
}
export default function useQuery() {
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
    boundingClientRect: (selector: string): Promise<ClientRect | ClientRect[]> => {
      return new Promise((resolve) => {
        query
          .select(selector)
          .boundingClientRect((data) => resolve(data as ClientRect | ClientRect[]))
          .exec()
      })
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
        query
          .selectViewport()
          .scrollOffset((res) => {
            resolve(res as unknown as ScrollOffset)
          })
          .exec()
      })
    }
  }
}
