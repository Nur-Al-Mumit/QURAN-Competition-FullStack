<template>
  <Modal v-model:is-open="isOpen" ref="modalRef">
    <template #header>
      <div class="p-5 pb-0">
        <h1 class="text-xl font-bold text-center text-gray-800">
          ✨ Update Your Avatar
        </h1>
      </div>
    </template>

    <template #body>
      <div class="p-5">
        <!-- Circular Upload Zone -->
        <div class="relative mx-auto w-40 h-40 mb-6">
          <div
            class="absolute inset-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors overflow-hidden"
          >
            <template v-if="!previewImage && currentImage">
              <img :src="currentImage" class="w-full h-full object-cover" />
            </template>
            <template v-else-if="previewImage">
              <img :src="previewImage" class="w-full h-full object-cover" />
            </template>
            <template v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto text-gray-400 mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p class="text-sm text-gray-500">Add Photo</p>
            </template>
          </div>

          <!-- Camera Icon Button -->
          <label
            class="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />
          </label>

          <!-- Remove Button -->
          <button
            v-if="previewImage || currentImage"
            @click="removeImage"
            class="absolute top-0 right-0 bg-red-500 p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <!-- Size Indicator -->
        <div class="text-center text-sm text-gray-500 mb-6">
          <p>Recommended size: 500×500 pixels</p>
          <p>Max file size: 5MB</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-center gap-3 p-5 pt-0">
        <button
          @click="closeModal"
          class="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
        >
          Maybe Later
        </button>
        <button
          @click="uploadImage"
          :disabled="!selectedFile || isUploading"
          class="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {{ isUploading ? "Uploading..." : "Save Avatar" }}
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
  const props = defineProps({
    isModalOpen: {
      type: Boolean,
      default: false,
    },
    currentImage: String,
  });

  const emit = defineEmits(["update:isModalOpen", "upload"]);

  const modalRef = ref(null);
  const isOpen = ref(props.isModalOpen);
  const selectedFile = ref(null);
  const previewImage = ref(null);
  const isUploading = ref(false);
  let profilePicture = ref({});
  let isUploadBtn = ref(false);

  watch(
    () => props.isOpen,
    (newVal) => {
      if (!newVal) {
        resetForm();
      }
    }
  );

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit");
      return;
    }

    selectedFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  };

  const removeImage = () => {
    selectedFile.value = null;
    previewImage.value = null;
  };

  const uploadImage = async () => {
    if (!selectedFile.value) return;

    isUploading.value = true;
    try {
      emit("upload", selectedFile.value);
      modalRef.value.handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      isUploading.value = false;
    }
  };

  const closeModal = () => {
    emit("update:isModalOpen", false);
  };

  watch(
    () => props.isModalOpen,
    (value) => {
      isOpen.value = value;
    }
  );

  watch(
    () => isOpen.value,
    (value) => {
      emit("update:isModalOpen", value);
    }
  );
  const resetForm = () => {
    selectedFile.value = null;
    previewImage.value = null;
    isUploading.value = false;
  };

  async function uploadProfilePicture() {
    try {
      isUploadBtn.value = true;

      const endpoint = "/user/avatar-change";
      let payload = { profile_picture: profilePicture.value };

      const { data, error } = await callAuthnAxios(endpoint, payload);
      if (data?.data) {
        profilePictureModal.value = false;
        await studentInfoStore.getProfileInfo();
      } else {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
      isUploadBtn.value = false;
    } finally {
      isUploadBtn.value = false;
    }
  }
</script>
