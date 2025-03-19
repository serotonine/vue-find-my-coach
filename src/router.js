import { createRouter, createWebHistory } from "vue-router";
import QuatreCentQuatre from "./pages/QuatreCentQuatre.vue";
import CoachesPage from "./pages/coaches/CoachesPage.vue";
import CoachPage from "./pages/coaches/CoachPage.vue";
import RegisterPage from "./pages/coaches/RegisterPage.vue";
import ContactPage from "./pages/coaches/ContactPage.vue";
import RequestPage from "./pages/request/RequestPage.vue";
import UserAuthPage from "./pages/auth/UserAuthPage.vue";
// Navigation guard.
import store from "./store/store";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/coaches" },
    { path: "/coaches", component: CoachesPage },
    {
      path: "/coaches/:id",
      component: CoachPage,
      name: "Coach",
      // This id is passed via props.
      props: true,
      children: [{ props: true, path: "contact", component: ContactPage }],
    },
    { path: "/register", component: RegisterPage, meta: { requireAuth: true } },
    { path: "/requests", component: RequestPage },
    { path: "/login", component: UserAuthPage, meta: { requireUnAuth: true } },
    { path: "/:404(.*)", component: QuatreCentQuatre },
  ],
});
// Navigation guards.
router.beforeEach((to, _, next) => {
  if (to.meta.requireAuth && !store.getters.isAuthenticated) {
    next("/login");
  } else if (to.meta.requireUnAuth && store.getters.isAuthenticated) {
    next("/coaches");
  }
  else{
    next();
  }
});
export default router;
