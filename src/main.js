import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router.js'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Nora from '@primevue/themes/nora'
import Lara from '@primevue/themes/lara'
import 'primeicons/primeicons.css'



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: false
    }
  }
})

app.mount('#app')
