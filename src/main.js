import './css/styles.css'
import { createApp } from 'vue';
import router from './router';
import store from './store/store';

// Global Components
import BasicContainer from './components/UI/BasicContainer.vue';
import CartContainer from './components/UI/CartContainer.vue';

import App from './App.vue'

const app = createApp(App);
app.component('BasicContainer', BasicContainer);
app.component('CartContainer', CartContainer);
app.use(router);
app.use(store);
app.mount('#app');
