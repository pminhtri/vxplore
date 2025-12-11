import { createRouter, createWebHistory } from 'vue-router';

import { Login } from '@/app/views/auth';
import { Home } from '@/app/views/home';
import { Landing } from '@/app/views/landing';

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
