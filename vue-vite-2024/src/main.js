import { createApp } from 'vue';
import App from './App.vue';
import './app/scss/main.scss';
import router from './app/router';

const app = createApp(App);

app.use(router).mount('#app');
