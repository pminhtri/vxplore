import { App, router } from '@/app';
import { createApp } from 'vue';
import './index.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
