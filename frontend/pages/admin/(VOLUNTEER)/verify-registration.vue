<template>
  <section
    class="min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100"
  >
    <div class="container mx-auto px-4 py-8 max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg"
        >
          <svg
            class="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
            ></path>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-emerald-900 mb-2">
          Registration Verification
        </h1>
        <p class="text-emerald-600">Enter or scan your registration code</p>
      </div>

      <div id="qr-reader" class="relative"></div>

      <!-- Input Card (Shown only if no participant data) -->
      <div
        v-if="!participant"
        class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"
      >
        <label class="block text-sm font-semibold text-emerald-700 mb-3">
          Registration Code
        </label>
        <div class="relative">
          <input
            v-model="regCode"
            type="text"
            placeholder="Enter your registration code"
            class="w-full px-4 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 text-gray-800 font-medium placeholder-emerald-300"
          />
          <div class="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              v-if="regCode.trim()"
              class="w-5 h-5 text-emerald-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- Action Buttons (Shown only if no participant data) -->
      <div v-if="!participant" class="space-y-4 mb-6">
        <!-- Scan Button -->
        <button
          @click="startScanner"
          :disabled="isScanning"
          class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.99c.28 0 .52-.21.52-.5 0-.28-.24-.5-.52-.5H12v3z"
            ></path>
          </svg>
          {{ isScanning ? "Scanning..." : "Scan QR Code" }}
        </button>

        <!-- Bottom Buttons Row -->
        <div class="flex gap-3">
          <button
            @click="debouncedVerifyRegistration"
            :disabled="!regCode.trim() || isVerifying"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg
              v-if="isVerifying"
              class="animate-spin w-4 h-4"
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
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>{{ isVerifying ? "Verifying..." : "Submit" }}</span>
          </button>

          <button
            @click="clearRegCode"
            :disabled="!regCode.trim()"
            class="flex-shrink-0 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

      <!-- QR Reader Container -->
      <div
        v-if="!participant"
        v-show="isScanning"
        class="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100"
      >
        <div class="bg-emerald-50 px-4 py-3 border-b border-emerald-100">
          <div class="flex items-center justify-between">
            <span class="text-emerald-700 font-semibold">QR Code Scanner</span>
            <button
              @click="stopScanner"
              class="text-emerald-600 hover:text-emerald-800 transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
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
      </div>

      <!-- Participant Details Card (Shown after successful verification) -->
      <div
        v-if="participant"
        class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"
      >
        <div class="text-center mb-4">
          <h2 class="text-xl font-bold text-emerald-900">
            Participant Details
          </h2>
        </div>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">
              Name (EN):
            </span>
            <span class="text-sm text-gray-800">{{ participant.name_en }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">
              Name (BN):
            </span>
            <span class="text-sm text-gray-800">{{ participant.name_bn }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">
              Registration No:
            </span>
            <span class="text-sm text-gray-800">{{ participant.reg_no }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">
              Date of Birth:
            </span>
            <span class="text-sm text-gray-800">
              {{ formatDate(participant.dob) }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">Phone:</span>
            <span class="text-sm text-gray-800">{{ participant.phone }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">Room:</span>
            <span class="text-sm text-gray-800">
              {{ participant.room_number }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">Serial:</span>
            <span class="text-sm text-gray-800">{{ participant.serial }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm font-semibold text-emerald-700">
              Exam Time:
            </span>
            <span class="text-sm text-gray-800">
              {{ participant.exam_time }}
            </span>
          </div>
        </div>
      </div>

      <!-- Attendance Selection Card (Shown after successful verification) -->
      <div
        v-if="participant"
        class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"
      >
        <label class="block text-sm font-semibold text-emerald-700 mb-3">
          Attendance Status
        </label>
        <div class="flex gap-4 mb-4">
          <inputs-base-radio
            :options="attendanceOptions"
            v-model="attendanceStatus"
            :required="true"
            :colors="{
              2: 'bg-red-500 text-white border-red-500',
            }"
          />
        </div>
        <div class="flex gap-3">
          <button
            @click="debouncedSubmitAttendance"
            :disabled="!attendanceStatus || isSubmitting"
            class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg
              v-if="isSubmitting"
              class="animate-spin w-4 h-4"
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
                d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>
              {{ isSubmitting ? "Submitting..." : "Submit Attendance" }}
            </span>
          </button>
          <button
            @click="clearParticipant"
            class="flex-shrink-0 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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

      <!-- Status Messages -->
      <div v-if="statusMessage" class="mt-6">
        <div
          :class="[
            'p-4 rounded-xl border shadow-sm',
            statusType === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : statusType === 'error'
              ? 'bg-red-50 border-red-200 text-red-700'
              : 'bg-blue-50 border-blue-200 text-blue-700',
          ]"
        >
          <div class="flex items-center gap-3">
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
            <span class="font-medium">{{ statusMessage }}</span>
          </div>
        </div>
      </div>
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

  const attendanceOptions = [
    { id: 1, name: "Present" },
    { id: 2, name: "Absent" },
  ];

  // Reactive state for participant and attendance
  const participant = ref(null);
  const attendanceStatus = ref(null);
  const isSubmitting = ref(false);

  // Format date to "M d, Y" (e.g., "Mar 10, 2000")
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

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
      const qrRegionId = "qr-reader";

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

  // Verify registration
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
      const endPoint = "/admin/volunteer/verify-registration";
      const payload = {
        reg_no: regCode.value,
      };

      const { data } = await useAdminAuthenticatedAxios(endPoint, payload);

      // Map API response to participant data
      participant.value = {
        name_en: data.data.user_competition_form.name_en,
        name_bn: data.data.user_competition_form.name_bn,
        reg_no: data.data.user_competition_form.reg_no,
        dob: data.data.user_competition_form.dob,
        phone: data.data.user_competition_form.phone,
        room_number: data.data.room_number,
        serial: data.data.serial,
        exam_time: data.data.exam_time,
        user_competition_form_id: data.data.user_competition_form_id,
      };

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
      const endPoint = "/admin/volunteer/submit-user-attendance";
      const payload = {
        form_id: participant.value.user_competition_form_id,
        attendance_status: parseInt(attendanceStatus.value),
      };

      const { data } = await useAdminAuthenticatedAxios(endPoint, payload);
      console.log(data);

      showStatus("Attendance submitted successfully!", "success");

      // Clear participant and attendance after successful submission
      setTimeout(() => {
        participant.value = null;
        attendanceStatus.value = null;
      }, 2000);
    } catch (error) {
      console.error("Attendance submission error:", error);
      showStatus("Failed to submit attendance. Please try again.", "error");
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
