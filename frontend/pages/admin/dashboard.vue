<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Competition Forms</h1>
          <p class="mt-2 text-gray-600">
            Manage and view all user competition form submissions
          </p>
        </div>
        <button
          @click="fetchDashboardData()"
          :disabled="loading"
          class="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          <svg
            class="h-4 w-4"
            :class="{ 'animate-spin': loading }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>

      <!-- Statistics Cards -->
      <div
        class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9"
      >
        <div
          v-for="stat in statCards"
          :key="stat.key"
          class="rounded-lg bg-white p-4 shadow-sm border border-gray-100"
        >
          <div class="flex items-center justify-between">
            <span class="text-xs font-medium text-gray-500">
              {{ stat.label }}
            </span>
            <span
              class="h-2.5 w-2.5 rounded-full"
              :class="stat.color"
            ></span>
          </div>
          <div class="mt-1 text-2xl font-bold text-gray-900">
            <span
              v-if="statsLoading"
              class="inline-block h-5 w-10 animate-pulse rounded bg-gray-200"
            ></span>
            <template v-else>{{ statistics[stat.key] ?? 0 }}</template>
          </div>
        </div>
      </div>

      <!-- Filters Section -->
      <div class="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2>

        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
        >
          <!-- Season Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Season
            </label>
            <select
              v-model="filters.season_id"
              class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Seasons</option>
              <option
                v-for="season in seasons"
                :key="season.id"
                :value="season.id"
              >
                {{ season.name }} ({{ season.year }})
                <template v-if="season.is_active"> — Active</template>
              </option>
            </select>
          </div>

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
          <template v-if="!loading && totalRecords > 0">
            Showing
            {{ (currentPage - 1) * itemsPerPage + 1 }} to
            {{ Math.min(currentPage * itemsPerPage, totalRecords) }} of
            {{ totalRecords }} results
          </template>
          <template v-else-if="loading"> Loading... </template>
          <template v-else>No results</template>
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
        <!-- Loading overlay -->
        <div
          v-if="loading"
          class="flex items-center justify-center py-16 text-gray-500"
        >
          <svg
            class="h-6 w-6 animate-spin mr-2 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Loading forms...
        </div>

        <div v-else class="overflow-x-auto">
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
                v-for="form in forms"
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
                          isFormActive(form)
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        "
                      >
                        {{ isFormActive(form) ? "Active" : "Inactive" }}
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
                        v-if="form.need_training !== null && form.need_training !== undefined"
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
        <div
          v-if="!loading && forms.length === 0"
          class="py-12 text-center"
        >
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
      <div
        v-if="totalPages > 1"
        class="mt-6 flex items-center justify-between"
      >
        <div class="flex items-center">
          <p class="text-sm text-gray-700">
            Page {{ currentPage }} of {{ totalPages }}
          </p>
        </div>

        <nav class="flex items-center space-x-2">
          <button
            @click="goToPage(1)"
            :disabled="currentPage === 1 || loading"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            First
          </button>

          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1 || loading"
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
            :disabled="currentPage === totalPages || loading"
            class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>

          <button
            @click="goToPage(totalPages)"
            :disabled="currentPage === totalPages || loading"
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

  // ---- State ----
  const forms = ref([]);
  const seasons = ref([]);
  const statistics = ref({});

  const loading = ref(false);
  const statsLoading = ref(false);
  const error = ref(null);

  // Filters — all sent to the backend
  const filters = ref({
    search: "",
    season_id: "",
    gender: "",
    education_background: "",
    is_recitation: "",
    need_training: "",
    is_active: "",
    is_sms_sent: "",
  });

  // Pagination (server-side)
  const currentPage = ref(1);
  const itemsPerPage = ref(10);
  const totalRecords = ref(0);
  const totalPages = ref(1);

  // Guards the watchers until after the first manual fetch on mount so we
  // don't double-fetch when fetchSeasons() sets the default season_id.
  const isReady = ref(false);

  const statCards = [
    { key: "total", label: "Total", color: "bg-gray-500" },
    { key: "active", label: "Active", color: "bg-green-500" },
    { key: "inactive", label: "Inactive", color: "bg-red-500" },
    { key: "recitation", label: "Recitation", color: "bg-purple-500" },
    { key: "need_training", label: "Need Training", color: "bg-orange-500" },
    { key: "male", label: "Male", color: "bg-blue-500" },
    { key: "female", label: "Female", color: "bg-pink-500" },
    { key: "sms_sent", label: "SMS Sent", color: "bg-emerald-500" },
    { key: "sms_pending", label: "SMS Pending", color: "bg-yellow-500" },
  ];

  // ---- API helpers ----
  const buildQueryString = () => {
    const params = new URLSearchParams();
    params.set("page", String(currentPage.value));
    params.set("per_page", String(itemsPerPage.value));

    for (const [key, value] of Object.entries(filters.value)) {
      if (value !== "" && value !== null && value !== undefined) {
        params.set(key, String(value));
      }
    }
    return params.toString();
  };

  // Fetch seasons once (on mount) and default to active season
  const fetchSeasons = async () => {
    try {
      const endPoint = "/admin/dashboard/seasons";
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET"
      );

      if (data?.data?.seasons) {
        seasons.value = data.data.seasons;
        // Default the season filter to the active season so the dashboard
        // shows the current competition by default.
        const activeId = data.data.active_season_id;
        if (activeId && filters.value.season_id === "") {
          filters.value.season_id = String(activeId);
        }
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load seasons",
        3000
      );
    }
  };

  // Fetch the filtered + paginated forms
  const fetchForms = async () => {
    loading.value = true;
    error.value = null;
    try {
      const endPoint = `/admin/dashboard/registration-forms?${buildQueryString()}`;
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET"
      );

      const payload = data?.data?.forms;
      if (payload) {
        // Laravel paginator returns `data` array + meta
        forms.value = payload.data || [];
        totalRecords.value = payload.total ?? 0;
        totalPages.value = payload.last_page ?? 1;
        currentPage.value = payload.current_page ?? currentPage.value;
      } else {
        forms.value = [];
        totalRecords.value = 0;
        totalPages.value = 1;
      }
    } catch (err) {
      error.value = err;
      window.showError(
        "Error!",
        err?.response?.data?.message || "Failed to load forms",
        3000
      );
      forms.value = [];
      totalRecords.value = 0;
      totalPages.value = 1;
    } finally {
      loading.value = false;
    }
  };

  // Fetch statistics (debounced slightly so rapid filter changes don't spam)
  let statsTimer = null;
  const fetchStatistics = async () => {
    statsLoading.value = true;
    try {
      const params = new URLSearchParams();
      if (filters.value.season_id) {
        params.set("season_id", String(filters.value.season_id));
      }
      const endPoint = `/admin/dashboard/statistics?${params.toString()}`;
      const { data } = await useAdminAuthenticatedAxios(
        endPoint,
        null,
        null,
        "GET"
      );
      if (data?.data?.statistics) {
        statistics.value = data.data.statistics;
      }
    } catch (err) {
      // Silent — stats are non-critical
      console.error("Statistics error:", err);
    } finally {
      statsLoading.value = false;
    }
  };

  const fetchDashboardData = () => {
    fetchForms();
    if (statsTimer) clearTimeout(statsTimer);
    statsTimer = setTimeout(fetchStatistics, 150);
  };

  // ---- Watchers ----
  // Snapshot of every filter EXCEPT search — when these change, reload
  // immediately (and reset to page 1).
  const nonSearchFilters = computed(() => ({
    season_id: filters.value.season_id,
    gender: filters.value.gender,
    education_background: filters.value.education_background,
    is_recitation: filters.value.is_recitation,
    need_training: filters.value.need_training,
    is_active: filters.value.is_active,
    is_sms_sent: filters.value.is_sms_sent,
  }));

  watch(
    nonSearchFilters,
    () => {
      if (!isReady.value) return;
      currentPage.value = 1;
      fetchDashboardData();
    },
    { deep: true }
  );

  // Debounce the search field so typing doesn't fire a request per keystroke.
  let searchTimer = null;
  watch(
    () => filters.value.search,
    () => {
      if (!isReady.value) return;
      if (searchTimer) clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        currentPage.value = 1;
        fetchDashboardData();
      }, 350);
    }
  );

  // When per-page changes, reset to page 1 and reload
  watch(itemsPerPage, () => {
    if (!isReady.value) return;
    currentPage.value = 1;
    fetchDashboardData();
  });

  // ---- Methods ----
  const clearFilters = () => {
    filters.value = {
      search: "",
      season_id: "",
      gender: "",
      education_background: "",
      is_recitation: "",
      need_training: "",
      is_active: "",
      is_sms_sent: "",
    };
    currentPage.value = 1;
    // Reload is handled by the filter watchers.
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages.value || loading.value) return;
    currentPage.value = page;
    fetchForms();
  };

  const isFormActive = (form) => Number(form.is_active) === 1;

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
    switch (Number(type)) {
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
    switch (Number(type)) {
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
    console.log("View details for:", form);
  };

  const editForm = (form) => {
    console.log("Edit form:", form);
  };

  const deleteForm = (form) => {
    if (confirm("Are you sure you want to delete this form?")) {
      console.log("Delete form:", form);
    }
  };

  // Pagination page range (mirrors the previous UX)
  const visiblePages = computed(() => {
    const total = totalPages.value;
    const current = currentPage.value;
    const pages = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (current >= total - 3) {
      for (let i = total - 4; i <= total; i++) pages.push(i);
    } else {
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
    }
    return pages;
  });

  // ---- Init ----
  onMounted(async () => {
    await fetchSeasons();
    await fetchDashboardData();
    isReady.value = true;
  });

  useHead({
    title: "Competition Forms - Admin Dashboard",
  });
</script>
