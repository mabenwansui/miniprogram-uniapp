import Component from './comp-nav-layout.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-nav-layout': typeof Component
  }
}