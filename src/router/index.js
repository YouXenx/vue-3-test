import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Cookies from "js-cookie";

import Dashboard from "../views/Dashboard.vue";
import HeadOfFamilies from "../views/head-of-family/HeadOfFamilies.vue";
import HeadOfFamiliy from "../views/head-of-family/HeadOfFamily.vue";
import HeadOfFamiliyCreate from "../views/head-of-family/HeadOfFamilyCreate.vue";

import Login from "../views/Login.vue";
import Main from "@/layouts/Main.vue";

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        name: "dashboard",
        component: Dashboard,
        meta: {
          requiresAuth: true,
          permissions: ["dashboard-menu"],
        },
      },
      {
        path: "head-of-family",
        name: "head-of-family",
        component: HeadOfFamilies,
        meta: {
          requiresAuth: true,
          permissions: ["head-of-family-list"],
        },
      },
      {
        path: "head-of-family/:id",
        name: "manage-head-of-family",
        component: HeadOfFamiliy,
        meta: {
          requiresAuth: true,
          permissions: ["head-of-family-list"],
        },
      },
      {
        path: "head-of-family/create",
        name: "create-head-of-family",
        component: HeadOfFamiliyCreate,
        meta: {
          requiresAuth: true,
          permissions: ["head-of-family-list"],
        },
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresUnAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();

  const token = Cookies.get("token");
  auth.token = token || null;

  if (auth.token && !auth.user) {
    try {
      await auth.checkAuth();
    } catch (err) {
      auth.logout();
      Cookies.remove("token");
      return { name: "login" };
    }
  }

  if (to.meta.requiresAuth && !auth.token) {
    return { name: "login" };
  }

  if (to.meta.requiresUnAuth && auth.token) {
    return { name: "dashboard" };
  }

  if (to.meta.permissions?.length) {
    if (!auth.user) {
      return { name: "login" };
    }

    const userPermissions = Array.isArray(auth.user.permissions)
      ? auth.user.permissions
      : [];

    const hasPermission = to.meta.permissions.every((perm) =>
      userPermissions.includes(perm),
    );

    if (!hasPermission) {
      return { name: "dashboard" };
    }
  }

  return true;
});

export default router;
