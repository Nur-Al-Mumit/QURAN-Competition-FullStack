<template>
  <section class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100">
    <div class="container mx-auto px-4 py-8 max-w-md">
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-2xl font-extrabold text-emerald-900 tracking-tight">
          Final Attendance
        </h1>
        <p class="text-emerald-600 text-sm mt-1">
          Scan or enter a participant's registration code
        </p>
      </div>

      <!-- ============ INPUT STAGE ============ -->
      <template v-if="!participant">
        <!-- QR Reader (camera viewport) -->
        <div
          v-show="isScanning"
          class="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100 mb-4"
        >
          <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2"
                  ></path>
                </svg>
                <span class="font-semibold text-sm">QR Code Scanner</span>
              </div>
              <button
                @click="stopScanner"
                class="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1 transition-colors"
                aria-label="Close scanner"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div id="qr-reader-final" class="relative w-full aspect-square bg-black/90"></div>
          <p class="text-center text-xs text-gray-500 py-2 bg-emerald-50/50">
            Align the QR code within the camera frame
          </p>
        </div>

        <!-- Input Card -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-emerald-100"
        >
          <label class="block text-sm font-semibold text-emerald-700 mb-2">
            Registration Code
          </label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 5l-7 7m0 0l7 7m-7-7h12"
                ></path>
              </svg>
            </span>
            <input
              v-model="regCode"
              type="text"
              placeholder="e.g. QURAN-2026-0001"
              class="w-full pl-11 pr-10 py-3.5 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 text-gray-800 font-medium placeholder-gray-300 outline-none"
            />
            <button
              v-if="regCode.trim()"
              @click="clearRegCode"
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-red-500 transition-colors"
              aria-label="Clear"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
          <button
            @click="startScanner"
            :disabled="isScanning"
            class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg
              class="w-5 h-5"
              :class="{ 'animate-pulse': isScanning }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M9 9h6v6H9V9z"
              ></path>
            </svg>
            {{ isScanning ? "Scanning..." : "Scan QR Code" }}
          </button>

          <button
            @click="debouncedVerifyRegistration"
            :disabled="!regCode.trim() || isVerifying"
            class="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:from-gray-300 disabled:to-gray-300 flex items-center justify-center gap-2"
          >
            <svg
              v-if="isVerifying"
              class="animate-spin w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>{{ isVerifying ? "Verifying..." : "Verify Registration" }}</span>
          </button>
        </div>
      </template>

      <!-- ============ RESULT STAGE ============ -->
      <template v-if="participant">
        <!-- Current Status Banner -->
        <div
          :class="[
            'rounded-2xl shadow-lg p-4 mb-4 border-2 flex items-center gap-3',
            currentAttendanceBadge.bg,
          ]"
        >
          <div
            class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
            :class="currentAttendanceBadge.iconBg"
          >
            <svg
              v-if="currentAttendanceBadge.type === 'present'"
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <svg
              v-else-if="currentAttendanceBadge.type === 'absent'"
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <svg
              v-else-if="currentAttendanceBadge.type === 'late'"
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2.5"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <svg
              v-else
              class="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
              ></path>
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-xs font-semibold uppercase tracking-wide opacity-80">
              Final Attendance Status
            </p>
            <p class="text-lg font-bold leading-tight">
              {{ currentAttendanceBadge.label }}
            </p>
          </div>
        </div>

        <!-- Participant Details Card -->
        <div
          class="bg-white rounded-2xl shadow-xl overflow-hidden mb-4 border border-emerald-100"
        >
          <!-- Card header -->
          <div
            class="bg-gradient-to-r from-emerald-500 to-emerald-600 px-5 py-4 flex items-center gap-3"
          >
            <div
              class="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg"
            >
              {{ initials }}
            </div>
            <div class="text-white min-w-0">
              <p class="font-bold leading-tight truncate">{{ participant.name_en }}</p>
              <p class="text-sm text-emerald-50 leading-tight truncate">
                {{ participant.name_bn }}
              </p>
            </div>
          </div>

          <!-- Detail rows -->
          <dl class="divide-y divide-gray-100">
            <div
              v-for="row in detailRows"
              :key="row.label"
              class="flex items-center justify-between px-5 py-3"
            >
              <dt class="text-sm font-medium text-gray-500 flex items-center gap-2">
                <span class="text-emerald-500" v-html="row.icon"></span>
                {{ row.label }}
              </dt>
              <dd class="text-sm font-semibold text-gray-800 text-right">
                {{ row.value }}
              </dd>
            </div>
          </dl>
        </div>

        <!-- TEMPORARY for this season — criteria 1 confirmation + consideration card -->
        <div
          v-if="criteriaId === 1"
          class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-emerald-100"
        >
          <div class="flex items-center justify-between mb-4">
            <label class="block text-sm font-semibold text-emerald-700">
              Confirmation Status
            </label>
            <span
              :class="[
                'px-2.5 py-1 rounded-full text-xs font-bold',
                confirmationStatus === 1
                  ? 'bg-emerald-100 text-emerald-700'
                  : confirmationStatus === 2
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700',
              ]"
            >
              {{ confirmationStatus === 1 ? 'Confirmed' : confirmationStatus === 2 ? 'Not Confirmed' : 'Pending' }}
            </span>
          </div>

          <div class="flex items-center gap-3 mb-4">
            <button
              :class="[
                'flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                confirmationStatus === 1
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700',
              ]"
              @click="confirmationStatus = 1"
            >
              YES — Confirmed
            </button>
            <button
              :class="[
                'flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all',
                confirmationStatus === 2
                  ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-700',
              ]"
              @click="confirmationStatus = 2"
            >
              NO — Not Confirmed
            </button>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-600 mb-1.5">
              Consideration Notes
            </label>
            <textarea
              v-model="considerationNote"
              rows="2"
              placeholder="Add any special consideration (optional)"
              class="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all duration-200 outline-none resize-none"
            ></textarea>
          </div>
        </div>

        <!-- Criteria 2: Training Attendance Summary Card -->
        <div
          v-if="criteriaId === 2 && attendanceSummary"
          :class="[
            'rounded-2xl shadow-xl p-6 mb-4 border-2',
            attendanceSummary.total_present_days < 3
              ? 'bg-red-50 border-red-300'
              : 'bg-white border-emerald-100',
          ]"
        >
          <div class="flex items-center justify-between mb-3">
            <label class="block text-sm font-semibold"
              :class="attendanceSummary.total_present_days < 3 ? 'text-red-700' : 'text-emerald-700'"
            >
              Training Attendance Summary
            </label>
            <span
              v-if="attendanceSummary.total_present_days < 3"
              class="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700"
            >
              Low Attendance
            </span>
          </div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm" :class="attendanceSummary.total_present_days < 3 ? 'text-red-600' : 'text-gray-600'">Days Present</span>
            <span class="text-lg font-bold"
              :class="attendanceSummary.total_present_days < 3 ? 'text-red-700' : 'text-emerald-700'"
            >
              {{ attendanceSummary.total_present_days }}
              <span class="text-sm font-normal" :class="attendanceSummary.total_present_days < 3 ? 'text-red-500' : 'text-gray-500'">
                / {{ attendanceSummary.total_training_days }}
              </span>
            </span>
          </div>
          <!-- Progress bar -->
          <div
            :class="[
              'w-full rounded-full h-3 mb-3 overflow-hidden',
              attendanceSummary.total_present_days < 3 ? 'bg-red-200' : 'bg-gray-200',
            ]"
          >
            <div
              :class="[
                'h-full rounded-full transition-all duration-500',
                attendanceSummary.total_present_days < 3
                  ? 'bg-gradient-to-r from-red-400 to-red-600'
                  : 'bg-gradient-to-r from-emerald-400 to-emerald-600',
              ]"
              :style="{ width: attendanceProgress + '%' }"
            ></div>
          </div>
          <div class="flex items-center justify-between text-xs"
            :class="attendanceSummary.total_present_days < 3 ? 'text-red-500' : 'text-gray-500'"
          >
            <span v-if="attendanceSummary.total_late_days > 0">
              {{ attendanceSummary.total_late_days }} late
            </span>
            <span v-else>No late days</span>
            <span>{{ attendanceProgress }}% attendance</span>
          </div>
        </div>

        <!-- Attendance Selection Card -->
        <div
          class="bg-white rounded-2xl shadow-xl p-6 mb-4 border border-emerald-100"
        >
          <label class="block text-sm font-semibold text-emerald-700 mb-3">
            Update Attendance Status
          </label>
          <inputs-base-radio
            :options="attendanceOptions"
            v-model="attendanceStatus"
            :required="true"
            :colors="{
              1: 'bg-emerald-500 text-white border-emerald-500',
              2: 'bg-red-500 text-white border-red-500',
              3: 'bg-amber-500 text-white border-amber-500',
            }"
          />

          <div class="flex gap-3 mt-5">
            <!-- Criteria 1: single button saves both confirmation + attendance -->
            <template v-if="criteriaId === 1">
              <button
                @click="debouncedSubmitAll"
                :disabled="(!attendanceStatus || !confirmationStatus) || isSubmitting"
                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>{{ isSubmitting ? "Submitting..." : "Submit Confirmation & Attendance" }}</span>
              </button>
            </template>
            <!-- Criteria 2 and others: attendance only -->
            <template v-else>
              <button
                @click="debouncedSubmitAttendance"
                :disabled="!attendanceStatus || isSubmitting"
                class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg
                  v-if="isSubmitting"
                  class="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                <span>{{ isSubmitting ? "Submitting..." : "Submit Attendance" }}</span>
              </button>
            </template>
            <button
              @click="clearParticipant"
              class="flex-shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 font-semibold py-3 px-4 rounded-xl transition-all duration-200"
              aria-label="Clear"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </template>

      <!-- Status Messages -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-2"
      >
        <div v-if="statusMessage" class="mt-4">
          <div
            :class="[
              'p-4 rounded-xl border shadow-sm flex items-center gap-3',
              statusType === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : statusType === 'error'
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-blue-50 border-blue-200 text-blue-700',
            ]"
          >
            <svg
              v-if="statusType === 'success'"
              class="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <svg
              v-else-if="statusType === 'error'"
              class="w-5 h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="font-medium text-sm">{{ statusMessage }}</span>
          </div>
        </div>
      </transition>
    </div>
  </section>
</template>

<script setup>
  import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

  // Page meta
  definePageMeta({
    layout: "split",
  });

  // Reactive state for verification
  const regCode = ref("");
  const isScanning = ref(false);
  const isVerifying = ref(false);
  const statusMessage = ref("");
  const statusType = ref("info");
  let html5QrCode = null;
  let isInitialized = false;
  let lastScanTime = 0;
  const scanCooldown = 2000; // 2 seconds cooldown between scans
  let lastScannedCode = null; // Track last scanned code
  const debounceTimeout = ref(null);

  // Final attendance supports three states (Present / Absent / Late).
  const attendanceOptions = [
    { id: 1, name: "Present" },
    { id: 2, name: "Absent" },
    { id: 3, name: "Late" },
  ];

  // Reactive state for participant and attendance
  const participant = ref(null);
  const currentAttendance = ref(null); // existing attendance from server
  const criteriaId = ref(null); // criteria_id from user_preliminary_results
  const attendanceStatus = ref(null);
  const isSubmitting = ref(false);

  // TEMPORARY for this season — criteria 1 confirmation + consideration state
  const confirmation = ref(null); // existing confirmation record from server
  const confirmationStatus = ref(null); // 1 = YES, 2 = NO
  const considerationNote = ref(""); // text for the has_consideration field

  // Criteria 2: training attendance summary from backend
  const attendanceSummary = ref(null); // { total_training_days, total_present_days, total_late_days }
  const seasonId = ref(null); // effective season_id from backend

  // Computed: attendance progress percentage for criteria 2
  const attendanceProgress = computed(() => {
    if (!attendanceSummary.value || attendanceSummary.value.total_training_days === 0) return 0;
    return Math.round(
      (attendanceSummary.value.total_present_days / attendanceSummary.value.total_training_days) * 100
    );
  });

  // Format date to "M d, Y" (e.g., "Mar 10, 2000")
  const formatDate = (date) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Initials for the avatar badge
  const initials = computed(() => {
    const name = participant.value?.name_en || participant.value?.name_bn || "";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  });

  // Build the participant detail rows.
  const detailRows = computed(() => [
    {
      label: "Registration No",
      value: participant.value?.reg_no || "—",
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"></path></svg>',
    },
    {
      label: "Date of Birth",
      value: formatDate(participant.value?.dob),
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>',
    },
    {
      label: "Phone",
      value: participant.value?.phone || "—",
      icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11 11 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"></path></svg>',
    },
  ]);

  // Compute the current attendance badge config
  const currentAttendanceBadge = computed(() => {
    const status = currentAttendance.value?.attendance_status;
    const updatedAt = currentAttendance.value?.updated_at;
    const time = updatedAt
      ? new Date(updatedAt).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";

    if (status === 1 || status === "1") {
      return {
        type: "present",
        label: time ? `Already Present · ${time}` : "Already Present",
        bg: "bg-emerald-50 border-emerald-300 text-emerald-800",
        iconBg: "bg-emerald-500",
      };
    }
    if (status === 2 || status === "2") {
      return {
        type: "absent",
        label: time ? `Marked Absent · ${time}` : "Marked Absent",
        bg: "bg-red-50 border-red-300 text-red-800",
        iconBg: "bg-red-500",
      };
    }
    if (status === 3 || status === "3") {
      return {
        type: "late",
        label: time ? `Marked Late · ${time}` : "Marked Late",
        bg: "bg-amber-50 border-amber-300 text-amber-800",
        iconBg: "bg-amber-500",
      };
    }
    return {
      type: "pending",
      label: "Not recorded yet",
      bg: "bg-amber-50 border-amber-300 text-amber-800",
      iconBg: "bg-amber-500",
    };
  });

  // Show status message
  const showStatus = (message, type = "info", duration = 5000) => {
    statusMessage.value = message;
    statusType.value = type;
    setTimeout(() => {
      statusMessage.value = "";
    }, duration);
  };

  // Start QR scanner
  const startScanner = async () => {
    try {
      const qrRegionId = "qr-reader-final";

      // Stop any existing scanner
      await stopScanner();

      // Clear QR reader element
      const qrReaderElement = document.getElementById(qrRegionId);
      if (qrReaderElement) {
        qrReaderElement.innerHTML = "";
      }

      html5QrCode = new Html5Qrcode(qrRegionId);
      isInitialized = true;
      isScanning.value = true;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
      };

      const devices = await Html5Qrcode.getCameras();
      if (!devices || devices.length === 0) {
        throw new Error("No cameras found");
      }

      const backCamera = devices.find(
        (device) =>
          device.label.toLowerCase().includes("back") ||
          device.label.toLowerCase().includes("rear")
      );
      const cameraId = backCamera ? backCamera.id : devices[0].id;

      await html5QrCode.start(
        cameraId,
        config,
        async (qrCodeMessage) => {
          const now = Date.now();
          if (
            now - lastScanTime < scanCooldown ||
            qrCodeMessage === lastScannedCode
          ) {
            return; // Ignore scans within cooldown or duplicate codes
          }
          lastScanTime = now;
          lastScannedCode = qrCodeMessage;

          regCode.value = qrCodeMessage;
          showStatus("QR Code detected! Verifying...", "success");

          // Stop scanner immediately
          await stopScanner();

          // Trigger verification
          debouncedVerifyRegistration();
        },
        (errorMessage) => {
          if (process.dev) {
            console.warn("QR scan error", errorMessage);
          }
        }
      );

      showStatus("Scanner started. Point camera at QR code.", "info");
    } catch (err) {
      console.error("Scanner error:", err);
      showStatus("Failed to start camera. Please check permissions.", "error");
      isScanning.value = false;
      isInitialized = false;
    }
  };

  // Stop QR scanner
  const stopScanner = async () => {
    if (html5QrCode && isInitialized) {
      try {
        const scannerState = html5QrCode.getState();
        if (
          scannerState === Html5QrcodeScannerState.SCANNING ||
          scannerState === Html5QrcodeScannerState.PAUSED
        ) {
          await html5QrCode.stop();
        }
        await html5QrCode.clear();
      } catch (error) {
        console.warn("Error stopping scanner:", error);
      } finally {
        html5QrCode = null;
        isInitialized = false;
        isScanning.value = false;
      }
    } else {
      isScanning.value = false;
      isInitialized = false;
    }
  };

  // Verify registration (final attendance flow)
  const verifyRegistration = async () => {
    if (!regCode.value.trim()) {
      showStatus("Please enter a registration code", "error");
      return;
    }

    if (isVerifying.value) {
      return; // Prevent multiple verifications
    }

    isVerifying.value = true;

    try {
      const endPoint = "/admin/volunteer/verify-final-registration";
      const payload = {
        reg_no: regCode.value,
      };

      const { data } = await useAdminAuthenticatedAxios(endPoint, payload);

      // Backend returns { participant, current_attendance, criteria_id, confirmation?, attendance_summary? }
      const form = data.data.participant || {};
      const fetchedAttendance = data.data.current_attendance ?? null;
      const fetchedCriteriaId = data.data.criteria_id ?? null;
      const fetchedConfirmation = data.data.confirmation ?? null;
      const fetchedSummary = data.data.attendance_summary ?? null;

      // Participant details come from the form (which carries reg_no, dob,
      // phone) merged with the user's name fields.
      participant.value = {
        name_en: form.name_en || form.user?.name_en,
        name_bn: form.name_bn || form.user?.name_bn,
        reg_no: form.reg_no,
        dob: form.dob,
        phone: form.phone || form.user?.phone,
        user_id: form.user_id,
        user_competition_form_id: form.id,
      };

      currentAttendance.value = fetchedAttendance;
      criteriaId.value = fetchedCriteriaId;
      seasonId.value = data.data.season_id ?? null;

      // Pre-select the existing status so volunteers can see what was already chosen
      attendanceStatus.value = fetchedAttendance?.attendance_status
        ? parseInt(fetchedAttendance.attendance_status)
        : null;

      // TEMPORARY for this season — criteria 1: populate confirmation state
      confirmation.value = fetchedConfirmation;
      confirmationStatus.value = fetchedConfirmation?.status
        ? parseInt(fetchedConfirmation.status)
        : null;
      considerationNote.value = fetchedConfirmation?.has_consideration || "";

      // Criteria 2: populate attendance summary
      attendanceSummary.value = fetchedSummary;

      showStatus("Registration verified successfully!", "success");

      // Clear form
      regCode.value = "";
      lastScannedCode = null;
    } catch (error) {
      console.error("Verification error:", error);
      showStatus("Verification failed. Please try again.", "error");
    } finally {
      isVerifying.value = false;
    }
  };

  // Debounce verification
  const debouncedVerifyRegistration = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(() => {
      verifyRegistration();
    }, 500);
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (!attendanceStatus.value) {
      showStatus("Please select an attendance status", "error");
      return;
    }

    if (isSubmitting.value) {
      return;
    }

    isSubmitting.value = true;

    try {
      const endPoint = "/admin/volunteer/submit-final-attendance";
      const payload = {
        user_id: participant.value.user_id,
        attendance_status: parseInt(attendanceStatus.value),
        criteria_id: criteriaId.value,
        season_id: seasonId.value,
      };

      const { data } = await useAdminAuthenticatedAxios(endPoint, payload);

      // Reflect the freshly submitted status in the banner immediately.
      currentAttendance.value = data?.data ?? {
        attendance_status: parseInt(attendanceStatus.value),
        updated_at: new Date().toISOString(),
      };

      showStatus("Attendance submitted successfully!", "success");

      // Clear participant and attendance after successful submission
      setTimeout(() => {
        participant.value = null;
        attendanceStatus.value = null;
        currentAttendance.value = null;
        criteriaId.value = null;
        seasonId.value = null;
        confirmation.value = null;
        confirmationStatus.value = null;
        considerationNote.value = "";
        attendanceSummary.value = null;
      }, 2000);
    } catch (error) {
      console.error("Attendance submission error:", error);
      showStatus("Failed to submit attendance. Please try again.", "error");
    } finally {
      isSubmitting.value = false;
    }
  };

  // TEMPORARY for this season — criteria 1: submit confirmation + attendance in one go
  const submitAll = async () => {
    if (!confirmationStatus.value) {
      showStatus("Please select a confirmation status", "error");
      return;
    }
    if (!attendanceStatus.value) {
      showStatus("Please select an attendance status", "error");
      return;
    }

    if (isSubmitting.value) return;

    isSubmitting.value = true;

    try {
      // 1. Save confirmation
      await useAdminAuthenticatedAxios(
        "/admin/final-confirmation/store",
        {
          user_id: participant.value.user_id,
          user_competition_form_id: participant.value.user_competition_form_id,
          season_id: seasonId.value,
          criteria_id: criteriaId.value,
          status: confirmationStatus.value,
          has_consideration: considerationNote.value.trim() || null,
        },
        null,
        "POST"
      );

      // 2. Save attendance
      const { data } = await useAdminAuthenticatedAxios(
        "/admin/volunteer/submit-final-attendance",
        {
          user_id: participant.value.user_id,
          attendance_status: parseInt(attendanceStatus.value),
          criteria_id: criteriaId.value,
          season_id: seasonId.value,
        }
      );

      // Reflect the freshly submitted status in the banner immediately.
      currentAttendance.value = data?.data ?? {
        attendance_status: parseInt(attendanceStatus.value),
        updated_at: new Date().toISOString(),
      };

      showStatus("Confirmation & attendance submitted successfully!", "success");

      // Clear participant after successful submission
      setTimeout(() => {
        participant.value = null;
        attendanceStatus.value = null;
        currentAttendance.value = null;
        criteriaId.value = null;
        seasonId.value = null;
        confirmation.value = null;
        confirmationStatus.value = null;
        considerationNote.value = "";
        attendanceSummary.value = null;
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      showStatus("Failed to submit. Please try again.", "error");
    } finally {
      isSubmitting.value = false;
    }
  };

  // Debounce attendance submission
  const debouncedSubmitAttendance = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(() => {
      submitAttendance();
    }, 500);
  };

  // TEMPORARY for this season — debounce submit all (criteria 1)
  const debouncedSubmitAll = () => {
    if (debounceTimeout.value) {
      clearTimeout(debounceTimeout.value);
    }
    debounceTimeout.value = setTimeout(() => {
      submitAll();
    }, 500);
  };

  // Clear registration code
  const clearRegCode = async () => {
    regCode.value = "";
    lastScannedCode = null;
    await stopScanner();
    showStatus("Form cleared", "info", 2000);
  };

  // Clear participant data
  const clearParticipant = async () => {
    participant.value = null;
    attendanceStatus.value = null;
    currentAttendance.value = null;
    criteriaId.value = null;
    seasonId.value = null;
    confirmation.value = null;
    confirmationStatus.value = null;
    considerationNote.value = "";
    attendanceSummary.value = null;
    await stopScanner();
    showStatus("Form cleared", "info", 2000);
  };

  // Cleanup on component unmount
  onUnmounted(async () => {
    await stopScanner();
  });

  // Cleanup when leaving the page
  onBeforeRouteLeave(async () => {
    await stopScanner();
  });
</script>
