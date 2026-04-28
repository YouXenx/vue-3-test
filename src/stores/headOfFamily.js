import { defineStore } from "pinia";
import axiosInstance from "@/plugins/axios";
import router from "@/router";

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

    async fetchHeadOfFamily(id) {
      this.loading = true;

      try {
        const response = await axiosInstance.get(`/head-of-family/${id}`);
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    async createHeadOfFamily(data) {
      this.loading = true;
      this.error = null;
      this.success = null;

      try {
        const formData = new FormData();

        formData.append("name", data.name || "");
        formData.append("email", data.email || "");
        formData.append("password", data.password || "");

        formData.append("identity_number", String(data.identity_number || ""));

        formData.append("gender", data.gender || "");
        formData.append("date_of_birth", data.date_of_birth || "");
        formData.append("phone_number", data.phone_number || "");
        formData.append("occupation", data.occupation || "");
        formData.append("material_status", data.material_status || "");

        // 🔥 FILE WAJIB VALID
        if (data.profile_picture instanceof File) {
          formData.append("profile_picture", data.profile_picture);
        }

        const response = await axiosInstance.post("/head-of-family", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        this.success = response.data.message;

        router.push({ name: "head-of-family" });
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },

    async deleteHeadOfFamily(id) {
      this.loading = true;
      this.error = null;

      try {
        const response = await axiosInstance.delete(`/head-of-family/${id}`);

        this.success = response.data.message;
      } catch (error) {
        this.error = error.response?.data || error.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
