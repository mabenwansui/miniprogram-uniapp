import Component from './comp-form-input.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-form-input': typeof Component
  }
}