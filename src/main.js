import '@/assets/fontes/fontawesome-free-6.1.1-web/css/all.css'
import '@/assets/bootstrap5/bootstrap-5.2.0-beta1-dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

export const http = axios.create({

  baseURL: 'http://localhost:8000'

})


const app = createApp(App)

app.use(router)

app.mount('#app')
