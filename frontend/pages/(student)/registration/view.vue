<!-- pages/registration.vue -->
<template>
  <div class="min-h-screen bg-emerald-50 py-8 rounded-2xl shadow-xl">
    <div class="sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="bg-white rounded-lg shadow-md mb-6 p-3 sm:p-6 border-t-4 border-emerald-500"
      >
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-lg sm:text-3xl font-bold text-emerald-900 mb-2">
              Registration Details
            </h1>
            <p class="text-emerald-600">View registration form information</p>
          </div>
          <div class="text-right">
            <div class="bg-emerald-100 px-2 sm:px-4 sm:py-2 rounded-lg">
              <span class="text-emerald-800 font-semibold">
                Reg No: {{ studentInfoStore.form?.reg_no }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Registration Form Data -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <!-- Basic Information -->
        <div class="mb-8">
          <h3
            class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Basic Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Name (English)
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.name_en }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Name (Bangla)
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.name_bn }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Date of Birth
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ formatDate(studentInfoStore.form?.dob) }}
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Phone
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.phone }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Address
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.address }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Occupation
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.occupation }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Educational Background -->
        <div class="mb-8">
          <h3
            class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Educational Background
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Education Level
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{
                    getEducationText(
                      studentInfoStore.form?.education_background
                    )
                  }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  School Name
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.school_name }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  College Name
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.college_name }}
                </div>
              </div>
            </div>
            <div class="space-y-3">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  University Name
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.university_name }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Madrasah Name
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.madrasah_name || "N/A" }}
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">
                  Madrasah Study Details
                </label>
                <div class="p-3 bg-gray-50 rounded-lg">
                  {{ studentInfoStore.form?.madrasah_study_details || "N/A" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mb-8">
          <h3
            class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"
          >
            Additional Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">
                Season ID
              </label>
              <div class="p-3 bg-gray-50 rounded-lg">
                {{ studentInfoStore.form?.season_id }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">
                Is Recitation
              </label>
              <div class="p-3 bg-gray-50 rounded-lg flex items-center">
                <div
                  class="w-3 h-3 rounded-full mr-2"
                  :class="
                    studentInfoStore.form?.is_recitation
                      ? 'bg-emerald-500'
                      : 'bg-gray-400'
                  "
                ></div>
                {{ studentInfoStore.form?.is_recitation ? "Yes" : "No" }}
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">
                Need Training
              </label>
              <div class="p-3 bg-gray-50 rounded-lg">
                {{ studentInfoStore.form?.need_training || "N/A" }}
              </div>
            </div>
          </div>
        </div>

        <!-- Form Metadata -->
        <div class="bg-emerald-50 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-emerald-800 mb-4">
            Form Information
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span class="block text-sm font-medium text-gray-600">
                Form ID
              </span>
              <span class="text-emerald-800 font-semibold">
                {{ studentInfoStore.form?.id }}
              </span>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-600">
                Created At
              </span>
              <span class="text-emerald-800 font-semibold">
                {{ formatDateTime(studentInfoStore.form?.created_at) }}
              </span>
            </div>
            <div>
              <span class="block text-sm font-medium text-gray-600">
                Updated At
              </span>
              <span class="text-emerald-800 font-semibold">
                {{ formatDateTime(studentInfoStore.form?.updated_at) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action Button -->
        <div class="mt-8 pt-6 border-t border-gray-200">
          <NuxtLink
            to="/profile"
            class="inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
          >
            <svg
              class="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Profile
          </NuxtLink>
        </div>
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
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getEducationText = (level) => {
    const levels = {
      1: "General",
      2: "Madrasa",
      3: "(General + Madrasa)",
    };
    return levels[level] || `Level ${level}`;
  };

  // Set page title
  useHead({
    title: "Registration Details",
  });

  onMounted(() => {
    studentInfoStore.fetchUserProfile();
  });
</script>
