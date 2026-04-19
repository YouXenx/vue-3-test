import { defineStore } from "pinia";
import Cookies from "js-cookie";
import api from "@/utils/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loading: false,
    error: null,
    success: null,
    token: Cookies.get("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },

  actions: {
    async login(credentials) {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const { data } = await api.post("/login", credentials);

        // 🔥 FIX STRUKTUR RESPONSE
        const token = data?.data?.token;
        const user = data?.data?.user;

        if (!token) {
          throw new Error("Token tidak ditemukan dari server");
        }

        this.token = token;
        this.user = user;

        Cookies.set("token", token, {
          expires: 7,
          secure: false,
        });

        this.success = "Login berhasil";
        return true;
      } catch (err) {
        // 🔥 VALIDATION ERROR LARAVEL
        if (err.response?.status === 422) {
          this.error = err.response.data.errors;
        } else if (err.response?.status === 401) {
          this.error = {
            general: "Email atau password salah",
          };
        } else {
          this.error = {
            general:
              err.response?.data?.message || err.message || "Login gagal",
          };
        }

        return false;
      } finally {
        this.loading = false;
      }
    },

    // 👤 CHECK AUTH
    async checkAuth() {
      const token = Cookies.get("token");

      if (!token) {
        this.logout();
        return false;
      }

      this.token = token;

      try {
        const { data } = await api.get("/me");
        this.user = data;
        return true;
      } catch (err) {
        this.logout();
        return false;
      }
    },

    // 🚪 LOGOUT
    logout() {
      this.user = null;
      this.token = null;
      this.error = null;
      this.success = null;

      Cookies.remove("token");
    },
  },
});
