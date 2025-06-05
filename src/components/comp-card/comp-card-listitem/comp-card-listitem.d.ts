import Component from './comp-card-listitem.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-card-listitem': typeof Component
  }
}