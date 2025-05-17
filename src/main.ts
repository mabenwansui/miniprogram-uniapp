import { createSSRApp } from 'vue'
import App from './App.vue'
import '@/common/css/common.scss'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
