<script setup>
import { computed, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

const isActive = computed(() => route.path === props.item.path);

const isChildActive = computed(() => {
  return (
    props.item.children?.some((child) => route.path === child.path) || false
  );
});

const isOpen = ref(isChildActive.value);

// auto open jika child aktif
watch(isChildActive, (val) => {
  isOpen.value = val;
});

// toggle accordion
const toggle = () => {
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <!-- SIMPLE ITEM -->
  <li v-if="!item.children" class="group" :class="{ active: isActive }">
    <RouterLink
      :to="item.path"
      class="flex items-center h-14 gap-2 rounded-2xl p-4 group-hover:bg-desa-foreshadow group-[.active]:bg-desa-foreshadow transition-setup"
    >
      <!-- ICON -->
      <div
        class="relative flex size-6 shrink-0"
        v-if="item.iconActive && item.iconInactive"
      >
        <img
          :src="item.iconActive"
          class="absolute size-6 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-setup"
          alt="icon"
        />
        <img
          :src="item.iconInactive"
          class="absolute size-6 opacity-100 group-hover:opacity-0 group-[.active]:opacity-0 transition-setup"
          alt="icon"
        />
      </div>

      <!-- LABEL -->
      <span
        class="flex-1 text-left leading-5 text-desa-secondary group-hover:text-desa-dark-green group-[.active]:text-desa-dark-green group-[.active]:font-medium transition-setup"
      >
        {{ item.label }}
      </span>
    </RouterLink>
  </li>

  <!-- PARENT ITEM -->
  <li v-else class="accordion flex flex-col gap-1 w-full">
    <button
      @click="toggle"
      class="group flex w-full items-center h-14 gap-2 rounded-2xl p-4 transition-setup"
      :class="{ active: isActive }"
    >
      <!-- ICON KIRI -->
      <div class="relative flex size-6 shrink-0">
        <img
          :src="item.iconActive"
          class="absolute size-6 opacity-0 transition-setup"
          :class="{ 'opacity-100': isOpen }"
          alt="icon"
        />
        <img
          :src="item.iconInactive"
          class="absolute size-6 opacity-100 transition-setup"
          :class="{ 'opacity-0': isOpen }"
          alt="icon"
        />
      </div>

      <!-- TEXT -->
      <span
        class="flex-1 text-left leading-5 transition-setup"
        :class="
          isOpen ? 'text-desa-dark-green font-medium' : 'text-desa-secondary'
        "
      >
        {{ item.label }}
      </span>

      <!-- ICON RIGHT -->
      <div class="relative flex size-6 shrink-0">
        <img
          src="@/assets/images/icons/arrow-circle-dark-green-up.svg"
          class="absolute size-6"
          :class="{ 'opacity-100': isOpen, 'opacity-0': !isOpen }"
          alt="icon"
        />
        <img
          src="@/assets/images/icons/arrow-circle-secondary-green-down.svg"
          class="absolute size-6"
          :class="{ 'opacity-0': isOpen, 'opacity-100': !isOpen }"
          alt="icon"
        />
      </div>
    </button>

    <!-- CHILDREN -->
    <ul class="flex flex-col flex-1 pl-[28px]" :class="{ hidden: !isOpen }">
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </ul>
  </li>
</template>
