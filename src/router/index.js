import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router);

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/monitor-dashboard',
      name: 'Principal',
      component: () => import('@/containers/DefaultContainer'),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/pages/Dashboard/Dashboard'),
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'monitor-dashboard',
          name: 'Monitoreo',
          component: () => import('@/pages/Monitor/Monitor'),
          meta: {
            requiresAuth: true
          }
        }
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login/Login'),
    },
  ]
});

router.beforeEach((to, from, next) => {
  let isAuth = store.getters['user/isLoggedIn'];
  let requiresAuth = to.meta.requiresAuth || false;

  store.commit('loading');

  if(requiresAuth && !isAuth) {
    next('/login');
  }

  next();
});
/*
router.beforeEach((to, from, next)=>{
  store.commit('loading');
  next()
});*/

router.afterEach((to, from)=>{
  store.commit('endLoading');
});


export default router;
