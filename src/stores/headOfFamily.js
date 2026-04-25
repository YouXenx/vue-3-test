import { defineStore } from "pinia";
import axiosInstance from "@/plugins/axios"; // sesuaikan path axios kamu

export const useHeadOfFamilyStore = defineStore("head-of-family", {
  state: () => ({
    headOfFamilies: [],
    meta: {
      current_page: 1,
      last_page: 1,
      per_page: 10,
      total: 0,
    },
    loading: false,
    error: null,
    success: null,
  }),

  actions: {
    async fetchHeadOfFamilies(params) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get("head-of-family", {
          params,
        });

        this.headOfFamilies = response.data.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchHeadOfFamiliesPaginated(params) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.get("head-of-family", {
          params,
        });

        this.headOfFamilies = response.data.data;

        this.meta = response.data.meta || {
          current_page: 1,
          last_page: 1,
          per_page: params.row_per_page,
          total: this.headOfFamilies.length,
        };
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
