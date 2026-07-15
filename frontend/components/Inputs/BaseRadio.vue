<template>
  <section>
    <div class="flex flex-wrap gap-2">
      <label v-for="option in options" :key="option.id" class="cursor-pointer">
        <input
          type="radio"
          :value="option.id"
          v-model="selectedOptionId"
          @change="$emit('update:modelValue', selectedOptionId)"
          class="hidden"
        />
        <div
          class="px-4 py-2 rounded-full text-sm font-bold border-2 cursor-pointer base-trans"
          :class="[
            selectedOptionId === option.id
              ? selectedColorClass(option.id)
              : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-primary hover:text-white',
          ]"
        >
          {{ option.name }}
        </div>
      </label>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    options: {
      required: true,
    },
    modelValue: {
      type: [String, Number, null],
      default: null,
    },
    colors: {
      type: Object,
      default: () => ({}), // { [id]: "bg-red-500 text-white border-red-500" }
    },
  });

  let selectedOptionId = ref(props.modelValue);

  const selectedColorClass = (id) => {
    return props.colors[id] || "bg-primary text-white border-primary";
  };
</script>
