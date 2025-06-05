import Component from './comp-price.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-price': typeof Component
  }
}