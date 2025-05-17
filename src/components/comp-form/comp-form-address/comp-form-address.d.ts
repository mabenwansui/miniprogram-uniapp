import Component from './comp-form-address.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-form-address': typeof Component
  }
}