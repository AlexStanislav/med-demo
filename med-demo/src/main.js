import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import router from './router/index'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import 'primeicons/primeicons.css';
import { createPinia } from 'pinia';
const pinia = createPinia();
const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(PrimeVue)
app.use(ToastService)
app.mount('#app')
