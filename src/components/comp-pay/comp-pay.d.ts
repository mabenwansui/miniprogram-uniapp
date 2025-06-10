import Component from './comp-pay.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-pay': typeof Component
  }
}