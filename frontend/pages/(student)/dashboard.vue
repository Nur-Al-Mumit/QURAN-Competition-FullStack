<template>
  <div class="min-h-screen bg-white rounded-2xl shadow-xl">
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
              <span class="font-semibold">{{ currentPhase.message }}</span>
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
                      'text-xs sm:text-sm font-medium leading-tight break-words',
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
          <span v-if="currentPhase.phase === 'registration'">
            রেজিস্ট্রেশন চলমান। তাড়াতাড়ি নিবন্ধন সম্পন্ন করুন!
          </span>
          <span v-else-if="currentPhase.phase === 'sms'">
            SMS এর জন্য অপেক্ষা করুন। আগামীকাল আপনার বাছাই পর্বের তথ্য পাবেন।
          </span>
          <span v-else-if="currentPhase.phase === 'primary'">
            প্রাথমিক বাছাই পর্ব চলছে। সফল হলে পরবর্তী ধাপের জন্য প্রস্তুত থাকুন।
          </span>
          <span v-else-if="currentPhase.phase === 'training'">
            প্রশিক্ষণ পর্ব চলছে। নিয়মিত অংশগ্রহণ করুন।
          </span>
          <span v-else-if="currentPhase.phase === 'waiting'">
            চূড়ান্ত পর্বের জন্য প্রস্তুতি নিন।
          </span>
          <span v-else-if="currentPhase.phase === 'final'">
            চূড়ান্ত পর্ব! সর্বোচ্চ চেষ্টা করুন।
          </span>
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

  // State for current time and user progress
  const currentTime = ref(new Date());

  // Competition timeline dates
  const dates = {
    registrationEnd: new Date("2026-07-20T23:59:59"),
    smsPhase: new Date("2026-07-21T23:59:59"),
    primaryRoundStart: new Date("2026-08-01T00:00:00"),
    primaryRoundEnd: new Date("2026-07-21T23:59:59"),
    trainingStart: new Date("2026-07-22T00:00:00"),
    trainingEnd: new Date("2026-07-27T23:59:59"),
    finalRound: new Date("2026-07-30T00:00:00"),
  };

  // Progress stages with SVG icons
  const progressStages = computed(() => [
    { id: 1, title: "Account Created", icon: "CheckCircle", completed: true },
    {
      id: 2,
      title: "Competition Registration",
      icon: "Users",
      completed: studentInfoStore?.form?.reg_no ? true : false,
    },
    {
      id: 3,
      title: "Registration Token Downloaded",
      icon: "BookOpen",
      completed: studentInfoStore?.form?.reg_no ? true : false,
      // completed: false,
    },
    {
      id: 4,
      title: "Primary Selecton Round",
      icon: "Users",
      completed: false,
    },
    {
      id: 5,
      title: "Eligibility SMS Received",
      icon: "Bell",
      completed: false,
    },
    { id: 6, title: "Training Completed", icon: "BookOpen", completed: false },
    { id: 7, title: "Final Round", icon: "Trophy", completed: false },
  ]);

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
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  // Compute current phase
  const currentPhase = computed(() => {
    const now = currentTime.value;

    if (now < dates.registrationEnd) {
      return {
        phase: "registration",
        title: "Registration Phase",
        message: "রেজিস্ট্রেশনের শেষ সময়",
        targetDate: dates.registrationEnd,
        status: "completed",
      };
    } else if (now < dates.smsPhase) {
      return {
        phase: "sms",
        title: "SMS Notification Phase",
        message: "বাছাই পর্বের তারিখ ও সময়ের SMS আসবে",
        targetDate: dates.smsPhase,
        status: "active",
      };
    } else if (now < dates.primaryRoundEnd) {
      return {
        phase: "primary",
        title: "Primary Round",
        message: "প্রাথমিক বাছাই পর্ব চলছে",
        targetDate: dates.primaryRoundEnd,
        status: "active",
      };
    } else if (now < dates.trainingEnd) {
      return {
        phase: "training",
        title: "Training Phase",
        message: "বিশেষ প্রশিক্ষণ পর্ব চলছে",
        targetDate: dates.trainingEnd,
        status: "active",
      };
    } else if (now < dates.finalRound) {
      return {
        phase: "waiting",
        title: "Waiting for Final",
        message: "চূড়ান্ত পর্বের অপেক্ষায়",
        targetDate: dates.finalRound,
        status: "waiting",
      };
    } else {
      return {
        phase: "final",
        title: "Final Round",
        message: "চূড়ান্ত পর্ব",
        targetDate: dates.finalRound,
        status: "active",
      };
    }
  });

  // Calculate time remaining
  const calculateTimeRemaining = (targetDate) => {
    const diff = targetDate - currentTime.value;
    if (diff <= 0) return null;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  const timeRemaining = computed(() =>
    calculateTimeRemaining(currentPhase.value.targetDate)
  );

  // Timeline events
  const timelineEvents = [
    {
      date: "২০ জুলাই",
      title: "রেজিস্ট্রেশন সমাপ্তি",
      description: "রাত ১১:৫৯ মিনিটের মধ্যে রেজিস্ট্রেশন সম্পন্ন করুন",
      status:
        currentTime.value > dates.registrationEnd ? "completed" : "active",
      icon: "Users",
    },
    {
      date: "২১ জুলাই",
      title: "প্রাথমিক বাছাই পর্ব",
      description: "২১ জুলাই রেজিস্ট্রেশন কার্ডে উল্লিখিত ভেনুতে প্রাথমিক বাছাই অনুষ্ঠিত হবে",
      status:
        currentTime.value > dates.primaryRoundEnd
          ? "completed"
          : currentTime.value > dates.primaryRoundStart
          ? "active"
          : "upcoming",
      icon: "BookOpen",
    },
    {
      date: "২২-২৭ জুলাই",
      title: "বিশেষ প্রশিক্ষণ",
      description: "৫ দিনব্যাপী ফ্রি তিলাওয়াত প্রশিক্ষণ",
      status:
        currentTime.value > dates.trainingEnd
          ? "completed"
          : currentTime.value > dates.trainingStart
          ? "active"
          : "upcoming",
      icon: "BookOpen",
    },
    {
      date: "৩০ জুলাই",
      title: "চূড়ান্ত পর্ব",
      description: "প্রতিযোগিতার চূড়ান্ত পর্ব অনুষ্ঠিত হবে",
      status:
        currentTime.value > dates.finalRound
          ? "completed"
          : currentTime.value.toDateString() === dates.finalRound.toDateString()
          ? "active"
          : "upcoming",
      icon: "Trophy",
    },
  ];
</script>
