<template>
  <div class="min-h-screen bg-white py-8 rounded-2xl shadow-xl">
    <div class="p-6">
      <div class="flex items-center mb-6">
        <div
          class="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center"
        >
          <span
            v-if="studentInfoStore.user?.name_en"
            class="text-2xl font-bold text-white"
          >
            {{ getInitials(studentInfoStore.user?.name_en) }}
          </span>
        </div>
        <div class="ml-4">
          <h2 class="text-2xl font-semibold text-gray-900">
            {{ studentInfoStore.user?.name_en }}
          </h2>
          <p class="text-lg text-emerald-600">
            {{ studentInfoStore.user?.name_bn }}
          </p>
        </div>
      </div>

      <!-- User Details Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Personal Information -->
        <div class="space-y-4">
          <h3
            class="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2"
          >
            Personal Information
          </h3>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">User ID:</span>
            <span class="text-gray-900">{{ studentInfoStore.user?.id }}</span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Phone:</span>
            <span class="text-gray-900">
              {{ studentInfoStore.user?.phone }}
            </span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Email:</span>
            <span class="text-gray-900">
              {{ studentInfoStore.user?.email }}
            </span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Gender:</span>
            <span class="text-gray-900">
              {{ getGenderText(studentInfoStore.user?.gender) }}
            </span>
          </div>
        </div>

        <!-- Account Information -->
        <div class="space-y-4">
          <h3
            class="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2"
          >
            Account Information
          </h3>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Phone Verified:</span>
            <span class="flex items-center">
              <div class="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div>
              <span class="text-emerald-600 font-medium">Verified</span>
            </span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Verified At:</span>
            <span class="text-gray-900">
              {{ formatDate(studentInfoStore.user?.phone_verified_at) }}
            </span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Created:</span>
            <span class="text-gray-900">
              {{ studentInfoStore.user?.created_at }}
            </span>
          </div>

          <div class="flex justify-between items-center py-2">
            <span class="font-medium text-gray-600">Last Updated:</span>
            <span class="text-gray-900">
              {{ studentInfoStore.user?.updated_at }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="mt-8 pt-6 border-t border-gray-200">
        <NuxtLink
          to="/registration/view"
          class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
        >
          View Registration Details
          <svg
            class="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "split",
  });

  const studentInfoStore = useStudentInfoStore();

  // Helper functions
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  const getGenderText = (gender) => {
    return gender === 1 ? "Male" : "Female";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Set page title
  useHead({
    title: "User Profile",
  });

  onMounted(() => {
    studentInfoStore.fetchUserProfile();
  });
</script>
