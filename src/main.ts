import { createSSRApp } from 'vue'
import App from './App.vue'
import '@/common/css/theme.scss'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
