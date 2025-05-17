import Component from './comp-card.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-card': typeof Component
  }
}