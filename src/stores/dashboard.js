import { defineStore } from "pinia";
import api from "@/plugins/axios";
import { getErrorMessage } from "@/helpers/errorHelper";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    dashboardData: {},
    loading: false,
    error: null,
  }),

  actions: {
    async fetchDashboardData() {
      this.loading = true;

      try {
        const response = await api.get("/dashboard/get-dashboard-data");

        console.log("🔥 RESPONSE:", response.data);

        this.dashboardData = response.data.data;

        console.log("🔥 SET DATA:", this.dashboardData);
      } catch (error) {
        console.log("❌ ERROR:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
