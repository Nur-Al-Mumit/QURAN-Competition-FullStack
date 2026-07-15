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
