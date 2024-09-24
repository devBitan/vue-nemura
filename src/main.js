import './assets/main.scss'

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';


import App from './App.vue'
import router from './router/index';

const app = createApp(App)

// Crea la instancia de Pinia
const pinia = createPinia();
// Usa el plugin de persistencia
pinia.use(piniaPluginPersistedstate);

// Usa Pinia y el router en la aplicación
app.use(pinia);
app.use(router)

app.mount('#app')

