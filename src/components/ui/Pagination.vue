<script setup>
const props = defineProps({
  meta: {
    type: Object,
    required: true,
  },
  serverOptions: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:serverOptions"]);
</script>

<template>
  <nav id="Pagination">
    <ul class="flex items-center gap-3">
      <li class="group">
        <button
          @click="
            meta.current_page > 1 &&
            emit('update:serverOptions', {
              ...serverOptions,
              page: meta.current_page - 1,
            })
          "
          class="flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow hover:bg-desa-dark-green transition-setup"
        >
          <img
            src="@/assets/images/icons/arrow-left-dark-green.svg"
            alt="icon"
            class="flex size-6 shrink-0 group-hover:hidden"
          />

          <img
            src="@/assets/images/icons/arrow-left-dark-green.svg"
            alt="icon"
            class="hidden size-6 shrink-0 group-hover:flex"
          />
        </button>
      </li>

      <li
        v-for="page in meta.last_page"
        :key="page"
        class="group"
        :class="{ active: page === meta.current_page }"
      >
        <a
          @click="serverOptions.page = page"
          class="flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow group-hover:bg-desa-dark-green group-[.active]:bg-desa-dark-green transition-setup"
        >
          <span
            class="text-desa-dark-green font-semibold group-[.active]:text-desa-foreshadow group-hover:text-desa-foreshadow transition-setup"
          >
            {{ page }}
          </span>
        </a>
      </li>

      <li class="group">
        <button
          @click="
            meta.current_page < meta.last_page &&
            emit('update:serverOptions', {
              ...serverOptions,
              page: meta.current_page + 1,
            })
          "
          class="flex size-11 shrink-0 items-center justify-center rounded-full bg-desa-foreshadow hover:bg-desa-dark-green transition-setup"
        >
          <img
            src="@/assets/images/icons/arrow-right-soft-green.svg"
            alt="icon"
            class="flex size-6 shrink-0 group-hover:hidden"
          />

          <img
            src="@/assets/images/icons/arrow-right-soft-green.svg"
            alt="icon"
            class="hidden size-6 shrink-0 group-hover:flex"
          />
        </button>
      </li>
    </ul>
  </nav>
</template>
