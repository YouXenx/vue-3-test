<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  errorMessage: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
  filledIcon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- INPUT WRAPPER -->
    <div
      class="flex items-center gap-3 h-[56px] px-4 rounded-2xl border-[1.5px] border-desa-background focus-within:border-blue-500 transition"
      :class="{ 'border-red-500': errorMessage }"
    >
      <!-- ICON -->
      <div class="shrink-0 w-6 h-6 flex items-center justify-center">
        <img v-if="icon && !model" :src="icon" class="w-6 h-6" alt="icon" />

        <img
          v-else-if="filledIcon && model"
          :src="filledIcon"
          class="w-6 h-6"
          alt="icon"
        />
      </div>

      <!-- INPUT -->
      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        class="flex-1 h-full bg-transparent outline-none font-medium leading-5 text-gray-900"
      />
    </div>

    <!-- ERROR -->
    <span v-if="errorMessage" class="text-[12px] text-red-500">
      {{ errorMessage }}
    </span>
  </div>
</template>
