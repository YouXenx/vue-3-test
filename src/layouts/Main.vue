<script setup>
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Topbar from "@/components/Topbar.vue";
</script>

<template>
  <div class="flex min-h-screen w-full">
    <!-- SIDEBAR -->
    <Sidebar />

    <!-- MAIN -->
    <div class="flex flex-col flex-1 ml-[280px]">
      <Topbar />

      <router-view />
    </div>
  </div>
</template>
