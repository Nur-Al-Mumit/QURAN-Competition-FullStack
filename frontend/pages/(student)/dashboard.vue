<template>
  <div>
    <!-- Returning-user "update for new season" warning (self-guards visibility) -->
    <DashboardSeasonUpdateBanner />

    <!-- Header with Notification Banner -->
    <div>
      <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
        <div class="px-4 py-6">
          <h1 class="text-2xl md:text-3xl font-bold text-center mb-4">
            বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৮ হিজরি
          </h1>
          <!-- Blinking Notification Banner -->
          <div
            class="bg-white/20 backdrop-blur-sm rounded-lg p-4 animate-pulse"
          >
            <div class="flex items-center justify-center space-x-2">
              <svg
                v
                class="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span class="font-semibold">{{ currentPhase.banner_message }}</span>
            </div>
            <client-only>
              <div
                v-if="timeRemaining"
                class="flex items-center justify-center space-x-4 mt-3"
              >
                <div class="text-center">
                  <div class="text-2xl font-bold">{{ timeRemaining.days }}</div>
                  <div class="text-xs opacity-80">দিন</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.hours }}
                  </div>
                  <div class="text-xs opacity-80">ঘণ্টা</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.minutes }}
                  </div>
                  <div class="text-xs opacity-80">মিনিট</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.seconds }}
                  </div>
                  <div class="text-xs opacity-80">সেকেন্ড</div>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <div v-if="false" class="flex justify-center pt-6">
      <div class="border-emerald-ripple inline-block">
        <button
          @click="() => navigateTo('/view-seat-plan-and-timing')"
          class="group relative inline-flex items-center justify-center px-8 py-4 sm:text-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shine-sweep-effect"
        >
          <span class="relative flex items-center text-2xl sm:text-3xl">
            <svg
              class="w-8 h-8 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            আপনার সিট প্ল্যান দেখুন
          </span>
        </button>
      </div>
    </div>
    <div class="p-2 sm:px-4 py-8">
      <!-- Progress Tracker -->
      <div class="bg-white rounded-xl shadow-lg p-2 sm:p-4 mb-8 border">
        <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg
            class="w-6 h-6 text-emerald-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          আপনার অগ্রগতি
        </h2>

        <div class="overflow-x-auto">
          <div class="relative sm:px-6 w-[500px] sm:w-full">
            <!-- Progress Line -->
            <div
              class="absolute top-4 sm:top-6 left-8 right-8 sm:left-12 sm:right-12 h-0.5 bg-gray-200"
            >
              <div
                class="h-full bg-gradient-to-r from-emerald-500 to-emerald-500 transition-all duration-1000"
                :style="{
                  width: `${(userProgress / progressStages.length) * 100}%`,
                }"
              ></div>
            </div>
            <!-- Progress Steps -->
            <div class="relative flex justify-between overflow-x-auto">
              <div
                v-for="stage in progressStages"
                :key="stage.id"
                class="flex flex-col items-center min-w-0 flex-1"
              >
                <div
                  :class="[
                    'w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0',
                    stage.completed
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg'
                      : stage.id === userProgress
                      ? 'bg-emerald-100 text-emerald-600 ring-2 sm:ring-4 ring-emerald-200'
                      : 'bg-gray-100 text-gray-400',
                  ]"
                >
                  <svg
                    v-if="stage.icon === 'CheckCircle'"
                    class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <svg
                    v-else-if="stage.icon === 'Users'"
                    class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <svg
                    v-else-if="stage.icon === 'BookOpen'"
                    class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                  <svg
                    v-else-if="stage.icon === 'Bell'"
                    class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <svg
                    v-else-if="stage.icon === 'Trophy'"
                    class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div class="mt-2 sm:mt-3 text-center w-full px-1">
                  <div
                    :class="[
                      'text-xs sm:text-sm font-medium leading-tight ',
                      stage.completed ? 'text-emerald-600' : 'text-gray-500',
                    ]"
                  >
                    {{ stage.title }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline View -->
      <div class="bg-white rounded-xl shadow-lg p-3 sm:p-4 border">
        <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg
            class="w-6 h-6 text-emerald-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          প্রতিযোগিতার সময়সূচী
        </h2>

        <div class="space-y-4">
          <div
            v-for="(event, index) in timelineEvents"
            :key="index"
            :class="[
              'flex items-start space-x-4 p-2 sm:p-4 rounded-lgx transition-all duration-300',
              event.status === 'completed'
                ? 'bg-emerald-50 border-l-4 border-emerald-500'
                : event.status === 'active'
                ? 'bg-gradient-to-r from-emerald-100 to-teal-100 border-l-4 border-emerald-600 shadow-md'
                : 'bg-gray-100 border-l-4 border-gray-300',
            ]"
          >
            <div
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center',
                event.status === 'completed'
                  ? 'bg-emerald-500 text-white'
                  : event.status === 'active'
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : 'bg-gray-300 text-gray-500',
              ]"
            >
              <svg
                v-if="event.icon === 'Users'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <svg
                v-else-if="event.icon === 'Bell'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <svg
                v-else-if="event.icon === 'BookOpen'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <svg
                v-else-if="event.icon === 'Trophy'"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>

            <div class="flex-1">
              <div class="flex items-center space-x-2 sm:space-x-3 mb-1">
                <h3
                  :class="[
                    'font-semibold',
                    event.status === 'active'
                      ? 'text-emerald-700'
                      : 'text-gray-700',
                  ]"
                >
                  {{ event.title }}
                </h3>
                <span
                  :class="[
                    'text-sm px-2 py-1 rounded-full whitespace-nowrap',
                    event.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-700'
                      : event.status === 'active'
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-gray-100 text-gray-600',
                  ]"
                >
                  {{ event.date }}
                </span>
              </div>
              <p class="text-gray-600 text-sm">{{ event.description }}</p>
            </div>

            <div
              v-if="event.status === 'active'"
              class="w-3 h-3 bg-emerald-500 rounded-full animate-ping"
            ></div>
          </div>
        </div>
      </div>

      <!-- Current Status Card -->
      <div
        class="mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-3 sm:p-6 text-white border"
      >
        <h3 class="text-lg font-semibold mb-2">বর্তমান অবস্থা</h3>
        <p class="text-emerald-100 mb-4">
          {{ currentPhase.status_message }}
        </p>
        <div class="flex items-center">
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <client-only>
            <span class="whitespace-nowrap">
              শেষ আপডেট: {{ currentTime.toLocaleString("bn-BD") }}
            </span>
          </client-only>
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
  const dashboardStore = useDashboardStore();

  // State for current time (drives the countdown + live timeline status)
  const currentTime = ref(new Date());

  // Progress stages come from the API (DB-driven). The `completed` flag is
  // computed server-side per stage for this user based on the stage `code`,
  // the user's data and the per-user `user_progress_stages` override.
  const progressStages = computed(() => dashboardStore.progressStages || []);

  // Current competition phase (banner + status card) comes fully from the
  // backend; nothing is hardcoded here.
  const currentPhase = computed(() => dashboardStore.currentPhase || {});

  const userProgress = computed(() => {
    return progressStages.value.findIndex((stage) => stage.completed == false);
  });

  // Update current time every second
  let timer;
  onMounted(() => {
    timer = setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
    studentInfoStore.fetchUserProfile();
    dashboardStore.fetchDashboard();
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  // Calculate time remaining until the current phase's target date
  // (provided by the backend).
  const calculateTimeRemaining = (targetDate) => {
    if (!targetDate) return null;
    const diff = new Date(targetDate) - currentTime.value;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const timeRemaining = computed(() =>
    calculateTimeRemaining(currentPhase.value?.target_date)
  );

  // Timeline events come from the API (DB-driven). Their `status`
  // (completed / active / upcoming) and Bengali `date` label are derived
  // live from start_date / end_date so the page keeps updating on its own.
  const toDate = (value) => {
    if (!value) return null;
    // Accept both ISO ("2026-07-20T00:00:00Z") and "Y-m-d H:i:s" formats.
    return new Date(String(value).replace(" ", "T"));
  };

  const formatTimelineDate = (startDate, endDate) => {
    const start = toDate(startDate);
    const end = toDate(endDate);
    if (!start && !end) return "";
    const fmt = new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "long",
    });
    if (!end || (start && start.toDateString() === end.toDateString())) {
      return fmt.format(start || end);
    }
    if (!start) return fmt.format(end);
    const dayFmt = new Intl.DateTimeFormat("bn-BD", { day: "numeric" });
    const monthFmt = new Intl.DateTimeFormat("bn-BD", { month: "long" });
    return `${dayFmt.format(start)}-${dayFmt.format(end)} ${monthFmt.format(end)}`;
  };

  const computeTimelineStatus = (startDate, endDate) => {
    const now = currentTime.value;
    const start = toDate(startDate);
    const end = toDate(endDate);
    if (end && now > end) return "completed";
    if (start && now >= start) return "active";
    return "upcoming";
  };

  const timelineEvents = computed(() =>
    (dashboardStore.timelineEvents || []).map((event) => ({
      title: event.title,
      description: event.description,
      icon: event.image_name,
      date: formatTimelineDate(event.start_date, event.end_date),
      status: computeTimelineStatus(event.start_date, event.end_date),
    }))
  );
</script>
