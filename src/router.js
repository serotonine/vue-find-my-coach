import { createRouter, createWebHistory } from "vue-router";
import CoachesPage from "./pages/coaches/CoachesPage.vue";
// Navigation guard.
import store from "./store/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesPage },
    {
      path: "/coaches/:id",
      component: () => import("./pages/coaches/CoachPage.vue"),
      name: "Coach",
      // This id is passed via props.
      props: true,
      children: [
        {
          props: true,
          path: "contact",
          component: () => import("./pages/coaches/ContactPage.vue"),
        },
      ],
    },
    {
      path: "/register",
      component: () => import("./pages/coaches/RegisterPage.vue"),
      meta: { requireAuth: true },
    },
    {
      path: "/requests",
      component: () => import("./pages/request/RequestPage.vue"),
    },
    {
      path: "/login",
      component: () => import("./pages/auth/UserAuthPage.vue"),
      meta: { requireUnAuth: true },
    },
    {
      path: "/:404(.*)",
      component: () => import("./pages/QuatreCentQuatre.vue"),
    },
  ],
});
// Navigation guards.
router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  } else {
    next();
  }
});
export default router;
