import './css/styles.css'
import { createApp, defineAsyncComponent } from 'vue';
// FormKit.
import { plugin, defaultConfig } from '@formkit/vue'
import router from './router';
import store from './store/store';

// Global Components
import BasicContainer from './components/UI/BasicContainer.vue';
import CartContainer from './components/UI/CartContainer.vue';
// Use BaseDialog whenever it is needed.
const BaseDialog = defineAsyncComponent(()=> import('@/components/UI/BaseDialog.vue'));

import App from './App.vue'

const app = createApp(App);
app.component('BasicContainer', BasicContainer);
app.component('CartContainer', CartContainer);
app.component('base-dialog', BaseDialog);
// FormKit.
app.use(plugin, defaultConfig);
app.use(router);
app.use(store);
app.mount('#app');
