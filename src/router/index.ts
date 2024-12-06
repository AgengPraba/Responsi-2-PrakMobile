import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import HomePage from "@/views/HomePage.vue";
import LoginPage from "@/views/LoginPage.vue";
import RegisterPage from "@/views/RegisterPage.vue";
import { useAuthStore } from "@/stores/auth";
import ProfilePage from "@/views/ProfilePage.vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    meta: {
      isAuth: false,
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomePage,
    meta: {
      isAuth: true,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta: {
      isAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Tunggu hingga status autentikasi diketahui
  await new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Update user di store secara manual jika diperlukan
      if (user) {
        authStore.user = user;
      }
      resolve();
      unsubscribe();
    });
  });

  // Cek rute yang membutuhkan autentikasi
  if (to.meta.isAuth && !authStore.isAuth) {
    next("/login");
  }
  // Cek jika mencoba mengakses login saat sudah login
  else if (to.path === "/login" && authStore.isAuth) {
    next("/home");
  }
  // Lanjutkan ke rute yang diminta
  else {
    next();
  }
});

export default router;
