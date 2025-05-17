import Component from './comp-form-button.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    'comp-form-button': typeof Component
  }
}