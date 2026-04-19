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

watch(isChildActive, (newVal) => {
  isOpen.value = newVal;
});
</script>

<template>
  <li class="group" :class="{ active: isActive }" v-if="!item.children">
    <RouterLink :to="item.path">
      href="kd-dashboard.html" class="flex items-center h-14 gap-2 rounded-2xl
      p-4 group-hover:bg-desa-foreshadow group-[.active]:bg-desa-foreshadow
      transition-setup" >
      <div
        class="relative flex size-6 shrink-0"
        v-if="item.iconActive && item.iconInactive"
      >
        <img
          src="@/assets/images/icons/chart-square-dark-green.svg"
          class="absolute flex size-6 shrink-0 opacity-0 group-hover:opacity-100 group-[.active]:opacity-100 transition-setup"
          alt="icon"
        />
        <img
          src="@/assets/images/icons/chart-square-secondary-green.svg"
          class="absolute flex size-6 shrink-0 opacity-100 group-hover:opacity-0 group-[.active]:opacity-0 transition-setup"
          alt="icon"
        />
      </div>
      <span
        class="text-left leading-5 text-desa-secondary flex flex-1 group-hover:text-desa-dark-green group-[.active]:text-desa-dark-green group-[.active]:font-medium transition-setup"
      >
        {{ item.label }}
      </span>
    </RouterLink>
  </li>

  <template v-if="item.children">
    <div class="accordion group/accordion flex flex-col gap-1 w-full">
      <button
        @click="toggle"
        :class="[
          'group flex w-full shrink-0 items-center h-14 gap-2 rounded-2xl p-4 transition-setup',
          { active: isActive },
        ]"
      >
        <!-- ICON KIRI -->
        <div class="relative flex size-6 shrink-0">
          <img
            src="@/assets/images/icons/bag-2-dark-green.svg"
            class="absolute size-6 opacity-0 transition-setup"
            :class="{ 'opacity-100': isActive }"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/bag-2-secondary-green.svg"
            class="absolute size-6 opacity-100 transition-setup"
            :class="{ 'opacity-0': isActive }"
            alt="icon"
          />
        </div>

        <!-- TEXT -->
        <span
          class="text-left leading-5 flex flex-1 transition-setup"
          :class="isActive ? 'text-desa-dark-green' : 'text-desa-secondary'"
        >
          {{ item.label }}
        </span>

        <!-- ICON KANAN -->
        <div class="relative flex size-6 shrink-0">
          <img
            src="@/assets/images/icons/arrow-circle-dark-green-up.svg"
            class="absolute size-6 opacity-0 transition-setup"
            :class="{ 'opacity-100': isActive }"
            alt="icon"
          />
          <img
            src="@/assets/images/icons/arrow-circle-secondary-green-down.svg"
            class="absolute size-6 opacity-100 transition-setup"
            :class="{ 'opacity-0': isActive }"
            alt="icon"
          />
        </div>
      </button>
      <ul
        :id="`accordion-${item.label.replace(/\s+/g, '-')}`"
        class="flex flex-col flex-1 pl-[28px]"
        :class="{ hidden: !isOpen }"
      >
        <SidebarItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
        />
      </ul>
    </div>
  </template>
</template>
