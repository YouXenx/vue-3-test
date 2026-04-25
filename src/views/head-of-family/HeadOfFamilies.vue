<script setup>
import { useHeadOfFamilyStore } from "@/stores/headOfFamily";
import { storeToRefs } from "pinia";
import { onMounted, ref, watch } from "vue";
import CardList from "../../components/head-of-family/CardList.vue";
import { debounce } from "lodash";
import Pagination from "../../components/ui/Pagination.vue";

const headOfFamilyStore = useHeadOfFamilyStore();

const { headOfFamilies, meta, loading, error, success } =
  storeToRefs(headOfFamilyStore);

const { fetchHeadOfFamiliesPaginated } = headOfFamilyStore;

const serverOptions = ref({
  page: 1,
  row_per_page: 10,
});

const filters = ref({
  search: null,
});

const fetchData = async () => {
  await fetchHeadOfFamiliesPaginated({
    ...serverOptions.value,
    ...filters.value,
  });
};

// debounce function (benar)
const debounceFetchData = debounce(() => {
  fetchData();
}, 500);

onMounted(fetchData);

// watch pagination
watch(
  serverOptions,
  () => {
    fetchData();
  },
  { deep: true },
);

// watch filters dengan debounce
watch(
  filters,
  () => {
    debounceFetchData();
  },
  { deep: true },
);
</script>

<template>
  <div
    id="Content"
    class="relative flex flex-col flex-1 gap-6 p-6 pb-[30px] w-full shrink-0"
  >
    <div id="Header" class="flex items-center justify-between">
      <h1 class="font-semibold text-2xl">Kepala Rumah</h1>

      <a
        href="kd-kepala-rumah-add.html"
        class="flex items-center rounded-2xl py-4 px-6 gap-[10px] bg-desa-dark-green"
      >
        <img
          src="@/assets/images/icons/add-square-white.svg"
          class="flex size-6 shrink-0"
          alt="icon"
        />
        <p class="font-medium text-white">Add New</p>
      </a>
    </div>

    <section id="List-Kepala-Rumah" class="flex flex-col gap-[14px]">
      <form id="Page-Search" class="flex items-center justify-between">
        <div class="flex flex-col gap-3 w-[370px] shrink-0">
          <label class="relative group peer w-full valid">
            <input
              type="text"
              v-model="filters.search"
              placeholder="Cari nama Kepala Rumah atau NIK"
              class="appearance-none outline-none w-full h-14 rounded-2xl ring-[1.5px] ring-desa-background focus:ring-desa-black py-4 pl-12 pr-6"
            />
          </label>
        </div>
      </form>

      <div v-if="loading">Loading...</div>

      <CardList
        v-else
        v-for="headOfFamily in headOfFamilies"
        :key="headOfFamily.id"
        :item="headOfFamily"
      />

      <Pagination :meta="meta" :server-options="serverOptions" />
    </section>
  </div>
</template>
