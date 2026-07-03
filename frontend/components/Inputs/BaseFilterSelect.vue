<template>
  <div ref="selectWrapper" class="">
    <label :for="label" class="block pl-1 font-semibold text-left mb-2">
      {{ label }}
      <span class="text-red-600" v-if="required">*</span>
    </label>
    <div class="relative group">
      <a
        @click="toggleMenu"
        class="block w-full p-3 border rounded-lg focus:border-blue-500"
      >
        {{ selectedItem ? selectedItem : placeholder }}
        <svg
          :class="[
            isOpen ? 'rotate-180' : '',
            'pointer-events-none  absolute top-0 right-3 h-full w-6 text-gray-400   base-trans',
          ]"
          viewBox="0 0 20 20"
          fill="black"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 mt-2 w-full bg-white border rounded-sm shadow-lg p-1 flex flex-col',
          isStartTop ? 'top-[40px]' : 'bottom-[50px]  flex-col-reverse ',
        ]"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="w-full p-2 border-b border"
        />
        <ul class="max-h-60 overflow-y-auto">
          <li
            v-for="item in filteredItems"
            :key="item.name"
            @click="selectItem(item)"
            class="p-2 hover:bg-gray-200 cursor-pointer"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    options: {
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "Select an Option",
    },
    modelValue: {
      type: [String, Number, Object],
      default: "",
    },
    selectedOption: {
      type: [String, Number, Object],
      default: "",
    },
  });

  const emit = defineEmits(["update:modelValue", "clickedItem"]);

  let isStartTop = ref(false);
  let isOpen = ref(false);
  let search = ref("");
  let selectedItem = ref("");
  let selectWrapper = ref(null);

  const toggleMenu = (event) => {
    isOpen.value = !isOpen.value;
    isStartTop.value = event.pageY >= 1000 ? false : true;
    document.addEventListener("mousedown", handleClickOutside);
  };

  const selectItem = (item) => {
    selectedItem.value = item?.name;
    isOpen.value = false;
    search.value = "";
    emit("update:modelValue", `${item?.id}`);
    emit("clickedItem", item);
  };

  const filteredItems = computed(() => {
    return props.options.filter((item) =>
      item.name.toLowerCase().includes(search.value.toLowerCase())
    );
  });

  const handleClickOutside = (event) => {
    if (selectWrapper.value && !selectWrapper.value.contains(event.target)) {
      isOpen.value = false;
    }
  };

  watch(
    () => props.selectedOption,
    () => {
      selectItem(props?.selectedOption);
    },
    { immediate: true }
  );
</script>
