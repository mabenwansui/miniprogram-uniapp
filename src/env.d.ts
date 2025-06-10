/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare global {
  /**
   * 提取对象 value 的联合类型
   * 用于代替 typeof Obj[keyof typeof Obj] 的简写
   */
  type ValueOf<T> = T[keyof T]
}
export {}