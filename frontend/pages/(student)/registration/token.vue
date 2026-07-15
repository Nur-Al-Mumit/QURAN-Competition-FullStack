<template>
  <div class="bg-white registration-card sm:p-5 print:p-0">
    <!-- Registration Card -->
    <div
      class="relative bg-gradient-to-r from-emerald-50 via-green-50 to-lime-50 rounded-lg p-4 text-emerald-800 print:shadow-none border-2 border-emerald-500"
    >
      <!-- QR Code -->
      <div class="absolute top-2 right-4">
        <div class="bg-white p-1 rounded-lg">
          <canvas
            v-if="registeredFormStore.registeredForm?.reg_no"
            ref="qrCanvas"
            class="border-emerald-600 border w-8 h-8"
          ></canvas>
        </div>
      </div>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold mb-2 text-emerald-600">
          Registration Card
        </h1>
        <div class="h-1 w-32 bg-emerald-500 rounded-full"></div>
      </div>

      <!-- Exam Time & Place (auto-assigned at registration) -->
      <div
        v-if="examTime || registeredFormStore.allocation"
        class="mb-6 rounded-lg p-4 border-2 border-amber-400 bg-amber-50 text-amber-900 print:break-inside-avoid"
      >
        <h2 class="text-lg font-bold mb-3 text-amber-700 flex items-center gap-2">
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
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          পরীক্ষার সময় ও স্থান
        </h2>

        <!-- Time + Place (primary) -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div
            class="bg-white/70 rounded-lg p-3 border border-amber-200"
          >
            <p class="text-xs text-amber-600 font-medium flex items-center gap-1">
              <svg
                class="w-4 h-4"
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
              পরীক্ষার সময়
            </p>
            <p class="text-lg font-bold text-amber-800 mt-1">
              {{ examTime }}
            </p>
          </div>
          <div
            class="bg-white/70 rounded-lg p-3 border border-amber-200"
          >
            <p class="text-xs text-amber-600 font-medium flex items-center gap-1">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              স্থান
            </p>
            <p class="text-sm font-semibold text-amber-800 mt-1 leading-snug">
              আত-তাক্বওয়া মাসজিদ এন্ড ইসলামিক সেন্টার, কুমারপাড়া, সিলেট
            </p>
          </div>
        </div>

        <!-- Group / Serial / Room (when allocated) -->
        <div
          v-if="registeredFormStore.allocation"
          class="grid grid-cols-3 gap-3"
        >
          <div>
            <p class="text-xs text-amber-600 font-medium">গ্রুপ</p>
            <p class="text-xl font-bold text-amber-800">
              {{ registeredFormStore.allocation.group }}
            </p>
          </div>
          <div>
            <p class="text-xs text-amber-600 font-medium">সিরিয়াল</p>
            <p class="text-xl font-bold text-amber-800">
              {{ registeredFormStore.allocation.serial }}
            </p>
          </div>
          <div>
            <p class="text-xs text-amber-600 font-medium">রুম নম্বর</p>
            <p class="text-xl font-bold text-amber-800">
              {{ registeredFormStore.allocation.room_number }}
            </p>
          </div>
        </div>

        <p class="mt-3 text-xs text-amber-700 leading-relaxed">
          অনুগ্রহ করে নির্ধারিত সময়ের পূর্বে উপস্থিত থাকবেন। জাযাকাল্লাহু খইরন।
        </p>
      </div>

      <!-- Main Content -->
      <div
        v-if="registeredFormStore.registeredForm?.phone"
        class="grid grid-cols-1 lg:grid-cols-2 print:flex gap-4 print:grid-cols-2"
      >
        <!-- Personal Information -->
        <div class="space-y-4">
          <div
            class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300"
          >
            <h2 class="text-xl font-semibold mb-2 text-emerald-600">
              Personal Information
            </h2>

            <div class="space-y-1.5">
              <div class="flex items-center gap-2">
                <span
                  class="font-medium w-24 whitespace-nowrap text-emerald-700"
                >
                  Name (EN):
                </span>
                <span class="text-lg font-bold">
                  {{ registeredFormStore.registeredForm.name_en }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span
                  class="font-medium w-24 whitespace-nowrap text-emerald-700"
                >
                  Name (BN):
                </span>
                <span class="text-lg font-bold">
                  {{ registeredFormStore.registeredForm.name_bn }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span
                  class="font-medium w-24 whitespace-nowrap text-emerald-700"
                >
                  DOB:
                </span>
                <span class="font-bold">
                  {{ formatDate(registeredFormStore.registeredForm.dob) }}
                </span>
              </div>

              <div class="flex items-center gap-2">
                <span
                  class="font-medium w-24 whitespace-nowrap text-emerald-700"
                >
                  Phone:
                </span>
                <span class="font-bold">
                  {{ registeredFormStore.registeredForm.phone }}
                </span>
              </div>

              <div
                class="flex items-center gap-2"
                v-if="registeredFormStore.registeredForm.email"
              >
                <span
                  class="font-medium w-24 whitespace-nowrap text-emerald-700"
                >
                  Email:
                </span>
                <span class="font-bold">
                  {{ registeredFormStore.registeredForm.email }}
                </span>
              </div>
            </div>
          </div>

          <!-- Educational Background -->
          <div
            class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300"
          >
            <h3
              class="font-semibold mb-2 text-emerald-600 sm:whitespace-nowrap"
            >
              Educational Background
              {{
                registeredFormStore.registeredForm.education_background == 1
                  ? "General"
                  : registeredFormStore.registeredForm.education_background == 2
                  ? "Madrasa"
                  : registeredFormStore.registeredForm.education_background == 3
                  ? "(General + Madrasa)"
                  : ""
              }}
            </h3>
            <div class="space-y-1.5">
              <div v-if="registeredFormStore.registeredForm.school_name">
                <span class="font-medium text-emerald-700">School:</span>
                <span class="ml-2">
                  {{ registeredFormStore.registeredForm.school_name }}
                </span>
              </div>
              <div v-if="registeredFormStore.registeredForm.college_name">
                <span class="font-medium text-emerald-700">College:</span>
                <span class="ml-2">
                  {{ registeredFormStore.registeredForm.college_name }}
                </span>
              </div>
              <div v-if="registeredFormStore.registeredForm.university_name">
                <span class="font-medium text-emerald-700">University:</span>
                <span class="ml-2">
                  {{ registeredFormStore.registeredForm.university_name }}
                </span>
              </div>
              <div v-if="registeredFormStore.registeredForm.madrasah_name">
                <span class="font-medium text-emerald-700">Madrasah:</span>
                <span class="ml-2">
                  {{ registeredFormStore.registeredForm.madrasah_name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Registration & Educational Details -->
        <div class="space-y-4 flex-1">
          <div
            class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300"
          >
            <h2 class="text-xl font-semibold mb-2 text-emerald-600">
              Registration Details
            </h2>

            <div class="space-y-1.5">
              <div class="flex items-center">
                <span class="font-medium w-28 text-emerald-700">Reg. No:</span>
                <span class="text-xl font-bold text-emerald-600">
                  {{ registeredFormStore.registeredForm.reg_no }}
                </span>
              </div>

              <div class="flex items-center">
                <span class="font-medium w-28 text-emerald-700">
                  Season ID:
                </span>
                <span>{{ registeredFormStore.registeredForm.season_id }}</span>
              </div>
            </div>
          </div>

          <!-- Address -->
          <div
            class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300"
          >
            <h3 class="font-semibold text-emerald-600 mb-2">Address</h3>
            <p>{{ registeredFormStore.registeredForm.address }}</p>

            <h3 class="font-semibold mt-2 text-emerald-600">
              Additional Details
            </h3>
            <div class="space-y-1.5">
              <div>
                <span class="font-medium text-emerald-700">Occupation:</span>
                <span class="ml-2">
                  {{ registeredFormStore.registeredForm.occupation }}
                </span>
              </div>

              <div class="space-y-1.5">
                <div class="flex items-center">
                  <span class="font-medium text-emerald-700">Recitation:</span>
                  <span
                    class="ml-2 px-2 py-1 rounded text-xs text-white"
                    :class="
                      registeredFormStore.registeredForm.is_recitation
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                    "
                  >
                    {{
                      registeredFormStore.registeredForm.is_recitation
                        ? "Yes"
                        : "No"
                    }}
                  </span>
                </div>
                <div class="flex items-center">
                  <span class="font-medium text-emerald-700">Training:</span>
                  <span
                    class="ml-2 px-2 py-1 rounded text-xs text-white"
                    :class="
                      registeredFormStore.registeredForm.need_training
                        ? 'bg-emerald-500'
                        : 'bg-red-500'
                    "
                  >
                    {{
                      registeredFormStore.registeredForm.need_training
                        ? "Needed"
                        : "Not Needed"
                    }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="py-12 text-center text-gray-600"
      >
        <p class="text-lg font-semibold mb-2">
          কোনো রেজিস্ট্রেশন তথ্য পাওয়া যায়নি।
        </p>
        <NuxtLink
          to="/registration"
          class="text-emerald-600 hover:text-emerald-800 underline"
        >
          রেজিস্ট্রেশন করুন
        </NuxtLink>
      </div>

      <!-- Footer -->
      <div class="mt-8 pt-4 border-t border-emerald-300">
        <div class="flex justify-between items-center text-sm">
          <div>
            <p class="text-emerald-700">
              Registration Date:
              {{ formatDate(registeredFormStore.registeredForm?.created_at) }}
            </p>
            <p class="text-emerald-700">
              Print Time:
              <br class="sm:hidden" />
              {{ formatPrintTime }}
            </p>
          </div>
          <div class="text-right">
            <p class="font-semibold text-xl text-emerald-600">
              বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৮ হিজরি
            </p>
          </div>
        </div>
      </div>

      <!-- Print Button -->
      <div class="mt-8 text-center print:hidden">
        <button
          @click="printCard"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105"
        >
          Print Registration Card
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import QRCode from "qrcode";

  definePageMeta({
    layout: "split",
  });

  const registeredFormStore = useRegisteredFormStore();
  const qrCanvas = ref(null);

  // Exam time: prefer the allocation value, fall back to the form's own value
  const examTime = computed(() => {
    return (
      registeredFormStore.allocation?.exam_time ||
      registeredFormStore.registeredForm?.exam_time ||
      null
    );
  });

  const generateQRCode = async (content) => {
    if (qrCanvas.value) {
      try {
        await QRCode.toCanvas(qrCanvas.value, content, {
          width: 70,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    }
  };

  const formatPrintTime = computed(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = now.toLocaleString("en-US", { month: "short" });
    const year = now.getFullYear();

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  });

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Generate QR Code on mount
  onMounted(async () => {
    await registeredFormStore.fetchRegisteredForm();
    if (registeredFormStore.registeredForm?.reg_no) {
      await generateQRCode(registeredFormStore.registeredForm?.reg_no);
    }
  });
  // Print function
  const printCard = () => {
    window.print();
  };
</script>

<style scoped>
  @media print {
    @page {
      size: A4;
      margin: 0.5in;
    }

    .registration-card,
    .registration-card * {
      visibility: visible;
    }

    .registration-card {
      position: absolute;
      left: 0;
      top: 0;
      width: 100% !important;
      max-width: none !important;
    }
  }
</style>
