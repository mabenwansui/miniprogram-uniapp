import Component from './comp-commodity-image.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-commodity-image': typeof Component
  }
}