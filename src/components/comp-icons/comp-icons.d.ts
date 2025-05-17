import Component from './comp-icons.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-icons': typeof Component
  }
}