import { createRouter, createWebHashHistory } from 'vue-router';
import Posts from '@/views/Posts.vue';
import Map from '@/views/Map.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'Posts', params: { id: 1 } },
  },
  {
    path: '/posts/:id',
    name: 'Posts',
    component: Posts,
  },
  {
    path: '/map',
    name: 'Map',
    component: Map,
  },
];
``;
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
