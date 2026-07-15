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
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.days.toLocaleString("bn-BD") }}
                  </div>
                  <div class="text-xs opacity-80">দিন</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.hours.toLocaleString("bn-BD") }}
                  </div>
                  <div class="text-xs opacity-80">ঘণ্টা</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.minutes.toLocaleString("bn-BD") }}
                  </div>
                  <div class="text-xs opacity-80">মিনিট</div>
                </div>
                <div class="text-center">
                  <div class="text-2xl font-bold">
                    {{ timeRemaining.seconds.toLocaleString("bn-BD") }}
                  </div>
                  <div class="text-xs opacity-80">সেকেন্ড</div>
                </div>
              </div>
            </client-only>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-center bg-gray-100 px-5 mt-5">
      <div
        class="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border w-full max-w-md text-center"
      >
        <h3 class="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          বর্তমান রেজিস্ট্রেশনের সংখ্যা
        </h3>
        <div class="text-emerald-500 text-6xl font-bold">
          <CountAnimation :count="registrationCount" />
        </div>
      </div>
    </div>
    <div class="p-2 sm:px-4 py-8">
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
            রেজিস্ট্রেশন চলমান।
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
  const studentInfoStore = useStudentInfoStore();

  // State for current time and user progress
  const currentTime = ref(new Date());

  // Competition timeline dates
  const dates = {
    registrationEnd: new Date("2025-07-30T23:59:59"),
    smsPhase: new Date("2025-07-31T23:59:59"),
    primaryRoundStart: new Date("2025-08-01T00:00:00"),
    primaryRoundEnd: new Date("2025-08-02T23:59:59"),
    trainingStart: new Date("2025-08-03T00:00:00"),
    trainingEnd: new Date("2025-08-07T23:59:59"),
    finalRound: new Date("2025-08-09T00:00:00"),
  };

  let registrationCount = ref(0);
  // auth/admin/get-registration-count

  async function getRegistrationCount() {
    try {
      const endpoint = "/registration/get-count";

      const { data } = await useAxios(endpoint, null, null, "GET");

      if (data?.data) {
        console.log(data.data);
        registrationCount.value = data.data?.registration_count;

        window.showSuccess(
          "Success!",
          "Registration count fetched successfully",
          2000
        );
      }
    } catch (err) {
      window.showError(
        "Error!",
        err?.response?.data?.message || "Something went wrong",
        3000
      );
    }
  }

  // Update current time every second
  let timer;
  onMounted(async () => {
    timer = setInterval(() => {
      currentTime.value = new Date();
    }, 1000);
    studentInfoStore.fetchUserProfile();

    await getRegistrationCount();
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
        message: "রেজিস্ট্রেশনের বাকি রয়েছে",
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
      date: "৩০ জুলাই",
      title: "রেজিস্ট্রেশন সমাপ্তি",
      description: "রাত ১১:৫৯ মিনিটের মধ্যে রেজিস্ট্রেশন সম্পন্ন করুন",
      status:
        currentTime.value > dates.registrationEnd ? "completed" : "active",
      icon: "Users",
    },
    {
      date: "৩১ জুলাই",
      title: "SMS নোটিফিকেশন",
      description: "বাছাই পর্বের তারিখ ও সময়ের জন্য SMS পাবেন",
      status:
        currentTime.value > dates.smsPhase
          ? "completed"
          : currentTime.value > dates.registrationEnd
          ? "active"
          : "upcoming",
      icon: "Bell",
    },
    {
      date: "১-২ আগস্ট",
      title: "প্রাথমিক বাছাই পর্ব",
      description: "দুই দিনব্যাপী প্রাথমিক বাছাই অনুষ্ঠিত হবে",
      status:
        currentTime.value > dates.primaryRoundEnd
          ? "completed"
          : currentTime.value > dates.primaryRoundStart
          ? "active"
          : "upcoming",
      icon: "BookOpen",
    },
    {
      date: "৩-৭ আগস্ট",
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
      date: "৯ আগস্ট",
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
