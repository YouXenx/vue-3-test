import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Cookies from "js-cookie";

import Dashboard from "../views/Dashboard.vue";
import Login from "../views/Login.vue";
import Main from "@/layouts/Main.vue";

const routes = [
  {
    path: "/",
    component: Main,
    meta: { requiresAuth: true },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
      },
    ],
  },

  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { requiresUnAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  // 🔍 DEBUG START
  console.log("=== AUTH DEBUG ===");
  console.log("TOKEN STORE:", auth.token);
  console.log("COOKIE:", Cookies.get("token"));
  console.log("==================");

  const token = Cookies.get("token");

  // sync token
  auth.token = token || null;

  // validasi user jika token ada
  if (auth.token && !auth.user) {
    try {
      await auth.checkAuth();
    } catch (err) {
      auth.logout();
      Cookies.remove("token");

      console.log("❌ CHECK AUTH FAILED → REDIRECT LOGIN");

      return { name: "login" };
    }
  }

  // butuh login tapi tidak ada token
  if (to.meta.requiresAuth && !auth.token) {
    console.log("❌ NO TOKEN → REDIRECT LOGIN");
    return { name: "login" };
  }

  // sudah login tapi ke login page
  if (to.meta.requiresUnAuth && auth.token) {
    console.log("❌ ALREADY LOGGED IN → REDIRECT DASHBOARD");
    return { name: "dashboard" };
  }

  console.log("✅ ROUTE ALLOWED:", to.name);

  return true;
});

export default router;
