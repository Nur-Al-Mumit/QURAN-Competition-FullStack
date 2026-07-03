<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Competition Forms</h1>
        <p class="mt-2 text-gray-600">
          Manage and view all user competition form submissions
        </p>
      </div>

      <!-- Filters Section -->
      <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2>

        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          <!-- Search -->
          <div class="xl:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by name, phone, or reg no..."
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <!-- Gender Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              v-model="filters.gender"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Genders</option>
              <option value="1">Male</option>
              <option value="2">Female</option>
            </select>
          </div>

          <!-- Education Background Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Education
            </label>
            <select
              v-model="filters.education_background"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Education</option>
              <option value="1">General</option>
              <option value="2">Madrasah</option>
              <option value="3">Both</option>
            </select>
          </div>

          <!-- Is Recitation Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Recitation
            </label>
            <select
              v-model="filters.is_recitation"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <!-- Need Training Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Need Training
            </label>
            <select
              v-model="filters.need_training"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>

          <!-- Is Active Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              v-model="filters.is_active"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <!-- SMS Sent Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              SMS Status
            </label>
            <select
              v-model="filters.is_sms_sent"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All SMS</option>
              <option value="1">Sent</option>
              <option value="0">Not Sent</option>
            </select>
          </div>

          <!-- Clear Filters Button -->
          <div class="flex items-end">
            <button
              @click="clearFilters"
              class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Results Summary -->
      <div class="mb-4 flex items-center justify-between">
        <p class="text-sm text-gray-600">
          Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
          {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of
          {{ filteredData.length }} results
        </p>
        <div class="flex items-center space-x-2">
          <label class="text-sm text-gray-600">Show:</label>
          <select
            v-model="itemsPerPage"
            class="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-hidden rounded-lg bg-white shadow">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Registration Info
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Personal Details
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Education
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Contact
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr
                v-for="form in paginatedData"
                :key="form.id"
                class="hover:bg-gray-50"
              >
                <!-- Registration Info -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm">
                    <div class="font-medium text-gray-900">
                      {{ form.reg_no }}
                    </div>
                    <div class="text-gray-500">ID: {{ form.id }}</div>
                  </div>
                </td>

                <!-- Personal Details -->
                <td class="px-6 py-4">
                  <div class="text-sm">
                    <div class="font-medium text-gray-900">
                      {{ form.name_en }}
                    </div>
                    <div class="text-gray-600 mb-1">{{ form.name_bn }}</div>
                    <div class="flex items-center space-x-2">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          form.gender === 1
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-pink-100 text-pink-800'
                        "
                      >
                        {{ form.gender === 1 ? "Male" : "Female" }}
                      </span>
                      <span class="text-gray-500">
                        {{ calculateAge(form.dob) }} years
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Education -->
                <td class="px-6 py-4">
                  <div class="text-sm">
                    <div
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1"
                      :class="getEducationBadgeClass(form.education_background)"
                    >
                      {{ getEducationBackground(form.education_background) }}
                    </div>
                    <div class="text-gray-600 text-xs">
                      <div v-if="form.school_name">
                        School: {{ form.school_name }}
                      </div>
                      <div v-if="form.college_name">
                        College: {{ form.college_name }}
                      </div>
                      <div v-if="form.university_name">
                        University: {{ form.university_name }}
                      </div>
                      <div v-if="form.madrasah_name">
                        Madrasah: {{ form.madrasah_name }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Contact -->
                <td class="px-6 py-4">
                  <div class="text-sm">
                    <div class="text-gray-900">{{ form.phone }}</div>
                    <div class="text-gray-600 text-xs">{{ form.address }}</div>
                    <div
                      v-if="form.occupation"
                      class="text-gray-500 text-xs mt-1"
                    >
                      {{ form.occupation }}
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="space-y-1">
                    <div class="flex items-center space-x-1">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          form.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{ form.is_active ? "Active" : "Inactive" }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          form.is_recitation
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        "
                      >
                        {{
                          form.is_recitation ? "Recitation" : "No Recitation"
                        }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span
                        v-if="form.need_training !== null"
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          form.need_training
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800'
                        "
                      >
                        {{
                          form.need_training ? "Needs Training" : "No Training"
                        }}
                      </span>
                    </div>
                    <div class="flex items-center space-x-1">
                      <span
                        class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
                        :class="
                          form.is_sms_sent
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        "
                      >
                        {{ form.is_sms_sent ? "SMS Sent" : "SMS Pending" }}
                      </span>
                    </div>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewDetails(form)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editForm(form)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteForm(form)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="paginatedData.length === 0" class="py-12 text-center">
          <div class="mx-auto h-12 w-12 text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No forms found</h3>
          <p class="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </p>
        </div>

        <nav class="flex items-center space-x-2">
          <button
            @click="goToPage(1)"
            :disabled="currentPage === 1"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>

          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div class="flex space-x-1">
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                'rounded-md px-3 py-2 text-sm font-medium',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
              ]"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

          <button
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Last
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "split",
  });
  // Sample data - replace with your actual data fetching logic
  const data = ref([
    {
      id: 5,
      user_id: 6,
      season_id: 1,
      reg_no: "RC16966",
      name_en: "Nur Al Mumit",
      name_bn: "নুর আল মুমিত",
      dob: "2002-09-11",
      gender: 1,
      phone: "01818623808",
      address: "Kumarpara, sylhet",
      education_background: 1,
      school_name: "Lions school and collage, saidpur",
      college_name: null,
      university_name: null,
      madrasah_name: null,
      madrasah_study_details: null,
      occupation: "Job holder",
      is_recitation: 1,
      need_training: null,
      is_active: 1,
      is_sms_sent: null,
      created_at: "2025-07-21T08:14:12.000000Z",
      updated_at: "2025-07-29T09:19:37.000000Z",
      criteria_id: null,
    },
    {
      id: 6,
      user_id: 13,
      season_id: 1,
      reg_no: "RC113985",
      name_en: "SHAHIN MIAH",
      name_bn: "শাহিন মিয়া",
      dob: "1999-12-12",
      gender: 1,
      phone: "01764931367",
      address: "বানিয়াচং, হবিগঞ্জ",
      education_background: 1,
      school_name: "এল. আর. সরকারি উচ্চ বিদ্যালয়",
      college_name: "জনাব আলী সরকারি ডিগ্রি কলেজ, বানিয়াচং",
      university_name: null,
      madrasah_name: null,
      madrasah_study_details: null,
      occupation: "শিক্ষক (জেনারেল)",
      is_recitation: 1,
      need_training: null,
      is_active: 1,
      is_sms_sent: null,
      created_at: "2025-07-21T08:44:11.000000Z",
      updated_at: "2025-07-21T08:44:11.000000Z",
      criteria_id: null,
    },
  ]);

  // Filters
  const filters = ref({
    search: "",
    gender: "",
    education_background: "",
    is_recitation: "",
    need_training: "",
    is_active: "",
    is_sms_sent: "",
  });

  // Pagination
  const currentPage = ref(1);
  const itemsPerPage = ref(10);

  // Computed properties
  const filteredData = computed(() => {
    let filtered = data.value;

    // Search filter
    if (filters.value.search) {
      const search = filters.value.search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name_en.toLowerCase().includes(search) ||
          item.name_bn.toLowerCase().includes(search) ||
          item.phone.includes(search) ||
          item.reg_no.toLowerCase().includes(search)
      );
    }

    // Gender filter
    if (filters.value.gender) {
      filtered = filtered.filter((item) => item.gender == filters.value.gender);
    }

    // Education background filter
    if (filters.value.education_background) {
      filtered = filtered.filter(
        (item) =>
          item.education_background == filters.value.education_background
      );
    }

    // Is recitation filter
    if (filters.value.is_recitation !== "") {
      filtered = filtered.filter(
        (item) => item.is_recitation == filters.value.is_recitation
      );
    }

    // Need training filter
    if (filters.value.need_training !== "") {
      filtered = filtered.filter((item) => {
        if (filters.value.need_training === "1") {
          return item.need_training === 1;
        } else {
          return item.need_training === 0 || item.need_training === null;
        }
      });
    }

    // Is active filter
    if (filters.value.is_active !== "") {
      filtered = filtered.filter(
        (item) => item.is_active == filters.value.is_active
      );
    }

    // SMS sent filter
    if (filters.value.is_sms_sent !== "") {
      filtered = filtered.filter((item) => {
        if (filters.value.is_sms_sent === "1") {
          return item.is_sms_sent === 1;
        } else {
          return item.is_sms_sent === null || item.is_sms_sent === 0;
        }
      });
    }

    return filtered;
  });

  const totalPages = computed(() =>
    Math.ceil(filteredData.value.length / itemsPerPage.value)
  );

  const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value;
    const end = start + itemsPerPage.value;
    return filteredData.value.slice(start, end);
  });

  const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push("...");
        for (let i = total - 4; i <= total; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = current - 1; i <= current + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(total);
      }
    }

    return pages.filter((page) => page !== "...");
  });

  // Methods
  const clearFilters = () => {
    filters.value = {
      search: "",
      gender: "",
      education_background: "",
      is_recitation: "",
      need_training: "",
      is_active: "",
      is_sms_sent: "",
    };
    currentPage.value = 1;
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page;
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "N/A";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const getEducationBackground = (type) => {
    switch (type) {
      case 1:
        return "General";
      case 2:
        return "Madrasah";
      case 3:
        return "Both";
      default:
        return "Unknown";
    }
  };  

  const getEducationBadgeClass = (type) => {
    switch (type) {
      case 1:
        return "bg-blue-100 text-blue-800";
      case 2:
        return "bg-green-100 text-green-800";
      case 3:
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const viewDetails = (form) => {
    // Implement view details functionality
    console.log("View details for:", form);
  };

  const editForm = (form) => {
    // Implement edit functionality
    console.log("Edit form:", form);
  };

  const deleteForm = (form) => {
    // Implement delete functionality
    if (confirm("Are you sure you want to delete this form?")) {
      console.log("Delete form:", form);
    }
  };

  // Reset page when filters change
  watch(
    [filters, itemsPerPage],
    () => {
      currentPage.value = 1;
    },
    { deep: true }
  );

  // Page title
  useHead({
    title: "Competition Forms - Admin Dashboard",
  });
</script>
