import Component from './comp-add-cart.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-add-cart': typeof Component
  }
}