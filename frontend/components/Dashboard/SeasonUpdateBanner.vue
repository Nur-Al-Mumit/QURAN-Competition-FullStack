<template>
  <!--
    Persistent post-login banner for returning competitors.

    Two states (mutually exclusive), both require an active season AND the
    user not yet being on it:

      1. Eligible (amber):  is_eligible_for_new_season == true
         → "update your registration for the new season" + action button.
      2. Ineligible (red):  is_eligible_for_new_season == false
         → "you cannot participate this season" info banner (no button).

    The eligible banner stays visible until the user updates their
    registration for the current season (which moves them onto the active
    season and flips the guard off).
  -->
  <div
    v-if="showEligibleBanner"
    class="bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md"
  >
    <div class="max-w-6xl mx-auto px-4 py-4 sm:py-5">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-center sm:text-left">
        <div class="flex items-start gap-3">
          <svg
            class="w-6 h-6 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <p class="font-semibold leading-snug">
              আপনি গত বছরের নিবন্ধিত প্রতিযোগী। এবারের সিজনে অংশ নিতে আপনার
              রেজিস্ট্রেশন আপডেট করুন।
            </p>
            <p
              v-if="isDirectFinal"
              class="text-sm text-amber-50 mt-1 leading-snug"
            >
              আপনি এই সিজনে সরাসরি ফাইনালে অংশগ্রহণের সুযোগ পাচ্ছেন
              (ভাইভা/প্রাথমিক পর্ব ছাড়াই)।
            </p>
          </div>
        </div>

        <button
          @click="() => navigateTo('/registration')"
          class="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-amber-700 font-semibold shadow-sm hover:bg-amber-50 transition-colors cursor-pointer text-center"
        >
          <span class="leading-snug">নতুন সিজনের জন্য রেজিস্ট্রেশন আপডেট করুন</span>
          <svg
            class="w-4 h-4 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Ineligible returning competitor: cannot participate this season -->
  <div
    v-else-if="showIneligibleBanner"
    class="bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md"
  >
    <div class="max-w-6xl mx-auto px-4 py-4 sm:py-5">
      <div class="flex items-start justify-center sm:justify-start gap-3 text-center sm:text-left">
        <svg
          class="w-6 h-6 mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
          />
        </svg>
        <div>
          <p class="font-semibold leading-snug">
            দুঃখিত, এই প্রতিযোগিতায় আপনার অংশগ্রহণের সুযোগ নেই।
          </p>
          <p class="text-sm text-red-50 mt-1 leading-snug">
            যারা গত প্রতিযোগিতার ফাইনাল পর্বে অংশগ্রহণ করেছিলেন, তারা এবারের
            প্রতিযোগিতায় অংশ নিতে পারবেন না। আপনার আগ্রহের জন্য অসংখ্য ধন্যবাদ,
            জাযাকাল্লাহু খাইরান।
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const studentInfoStore = useStudentInfoStore();

  // Eligible returning user: eligible for the new season but not yet on it.
  const showEligibleBanner = computed(() => {
    const s = studentInfoStore.seasonStatus;
    if (!s) return false;
    return (
      s.has_active_season &&
      s.is_eligible_for_new_season &&
      !s.on_active_season
    );
  });

  // Ineligible returning user: not eligible AND not on the active season.
  // e.g. reached last year's final (UserFinalAttendance row exists).
  const showIneligibleBanner = computed(() => {
    const s = studentInfoStore.seasonStatus;
    if (!s) return false;
    return (
      s.has_active_season &&
      !s.is_eligible_for_new_season &&
      !s.on_active_season
    );
  });

  const isDirectFinal = computed(
    () => !!studentInfoStore.seasonStatus?.is_direct_final,
  );
</script>
