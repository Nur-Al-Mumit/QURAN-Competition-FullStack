<template>
  <label :for="inputId" class="block pl-1 font-semibold text-left w-full">
    <div>
      <p class="mb-2">
        {{ label }}
        <span class="text-red-600 ml-1" v-if="required">*</span>
      </p>
    </div>
    <div class="relative">
      <input
        type="file"
        :id="inputId"
        :accept="accept"
        :required="required"
        @change="handleFileChange"
        class="absolute inset-0 w-full h-full opacity-0 -z-50"
      />
      <!-- :value="modelValue" -->
      <div
        class="flex items-center justify-center w-full py-3 hover:cursor-pointer text-gray-700 bg-white border rounded-md hover:bg-gray-50"
      >
        <span>Choose a file...</span>
      </div>
    </div>
    <div v-if="uploadedFileName || uploadedFile?.fileName" class="mt-2">
      <div>
        Uploaded file:
        <span class="text-black">
          {{ uploadedFileName ?? uploadedFile?.fileName }}
        </span>
      </div>
    </div>
    <div v-if="uploadedFileUrl" class="mt-2">
      <a
        :href="uploadedFileUrl"
        target="_blank"
        class="text-blue-400 hover:text-blue-600 base-trans flex gap-1 items-center"
      >
        <span v-html="getIcons('attachment', 'w-5')"></span>
        <span>View uploaded file</span>
        <span v-html="getIcons('right-arrow', 'w-5')"></span>
      </a>
    </div>
  </label>
</template>

<script setup>
  import getIcons from "~/composables/icon";

  const props = defineProps({
    inputId: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    accept: {
      type: String,
      default: "image/jpeg, application/pdf",
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number, Object],
      default: "",
    },
    uploadedFileUrl: {
      type: [String],
      default: "",
    },
    uploadedFile: {
      type: [String, Object],
      default: "",
    },
    size: {
      type: [Number],
      default: 1024,
    },
  });
  const emit = defineEmits(["update:modelValue"]);

  const maxSize = 1024 * props.size;
  const file = ref(null);
  const error = ref("");
  const uploadedFileName = ref(null);
  let store = ref({});

  function handleFileChange(event) {
    error.value = "";
    // selectedFile = null;
    let selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > maxSize) {
        error.value = `"File size exceeds ${maxSize / 1024 / 1024} MB"`;
        alert(`"File size exceeds ${maxSize / 1024 / 1024} MB"`);
        file.value = null;
        uploadedFileName.value = null;
        selectedFile = null;
      } else {
        uploadedFileName.value = selectedFile.name;
        file.value = selectedFile;

        const reader = new FileReader();
        reader.onloadend = () => {
          // use a regex to remove data url part
          const base64String = reader.result
            .replace("data:", "")
            .replace(/^.+,/, "");
          const fileData = {
            document: base64String,
            fileName: event.target.files[0].name,
            extension: event.target.files[0].name.split(".").pop(),
          };
          store.value = fileData;
          emit("update:modelValue", store.value);
        };
        reader.readAsDataURL(event.target.files[0]);
      }
    } else {
      uploadedFileName.value = null;
    }
  }
</script>
