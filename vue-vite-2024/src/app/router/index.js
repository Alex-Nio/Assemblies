import { createWebHistory, createRouter } from 'vue-router';
import { ref } from 'vue';

export const loading = ref(true);

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '',
      path: '/',
      component: () => import('@/pages/Home.vue'),
    },
    {
      name: 'search',
      path: '/search',
      component: () => import('@/pages/Search.vue'),
    },
    {
      name: 'ui',
      path: '/ui',
      component: () => import('@/pages/UI.vue'),
    },
  ],
});

// Хук перед сменой маршрута
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});

// Хук после завершения смены маршрута
router.afterEach(() => {
  setTimeout(() => {
    loading.value = false;
  }, 500);
});

export default router;
