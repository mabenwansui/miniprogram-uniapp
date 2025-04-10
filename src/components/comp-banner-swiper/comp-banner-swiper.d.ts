import Component from './comp-banner-swiper.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-banner-swiper': typeof Component
  }
}