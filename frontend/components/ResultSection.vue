<template>
  <section
    class="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 overflow-hidden"
  >
    <!-- Section header -->
    <div
      :class="[
        'px-5 py-4 flex items-center justify-between',
        tone.bar,
      ]"
    >
      <h2 :class="['text-lg font-bold', tone.title]">{{ title }}</h2>
      <span class="text-sm text-gray-500">
        {{ count === total ? `(${count})` : `(${count} of ${total})` }}
      </span>
    </div>

    <!-- Optional notice box under the header (e.g. training rules). -->
    <!-- Shows a short summary always, with a "see details" button that -->
    <!-- opens a modal with the full note. -->
    <div
      v-if="note"
      class="border-b border-amber-200 bg-amber-50 px-5 py-3"
    >
      <div class="flex items-start justify-between gap-3">
        <p class="text-sm text-amber-900 flex-1">
          <span class="font-bold">বিশেষ দ্রষ্টব্য:</span>
          {{ note }}
        </p>
        <button
          v-if="noteDetail"
          @click="showModal = true"
          class="shrink-0 inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700 transition-colors"
        >
          বিস্তারিত দেখুন
          <svg
            class="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Table — wrapped in an overflow-x-auto container so on narrow
         screens the table scrolls horizontally instead of being clipped
         (the parent section uses overflow-hidden). -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[640px]">
        <thead>
          <tr :class="['text-center', tone.head]">
            <th class="p-2 border w-12">#</th>
            <th class="p-2 border w-20">Serial</th>
            <th class="p-2 border w-28">Reg No</th>
            <th class="p-2 border">Name</th>
            <th v-if="criteriaField" class="p-2 border w-32">Criteria</th>
            <th class="p-2 border w-32">{{ statusField ? 'Confirmation' : 'Result' }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in rows"
            :key="row.serial + '-' + row.reg_no"
            class="text-center hover:bg-gray-50"
          >
            <td class="p-2 border font-semibold">{{ row.sl }}</td>
            <td class="p-2 border font-semibold whitespace-nowrap">
              {{ row.serial }}
            </td>
            <td class="p-2 border whitespace-nowrap">{{ row.reg_no || "—" }}</td>
            <td class="p-2 border text-left">{{ row.name_en || "—" }}</td>
            <td v-if="criteriaField" class="p-2 border whitespace-nowrap">
              {{ getCriteriaName(row[criteriaField]) }}
            </td>
            <td class="p-2 border">
              <!-- Per-row status badge (used by final-confirmation page) -->
              <span
                v-if="statusField && row[statusField] !== undefined"
                :class="[
                  'inline-block px-2 py-0.5 rounded-full text-xs font-semibold',
                  row[statusField] === 1
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700',
                ]"
              >
                {{ row[statusField] === 1 ? "YES" : "NO" }}
              </span>
              <!-- Static badge (existing behavior for result pages) -->
              <span
                v-else
                :class="[
                  'inline-block px-2 py-0.5 rounded-full text-xs font-semibold',
                  badgeToneClass,
                ]"
              >
                {{ badgeText }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Detail modal -->
    <Teleport to="body">
      <div
        v-if="showModal && noteDetail"
        class="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="showModal = false"
        ></div>

        <!-- Modal panel -->
        <div
          class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
        >
          <!-- Header -->
          <div
            class="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4 flex items-center justify-between"
          >
            <h3 class="text-lg font-bold text-white">বিশেষ দ্রষ্টব্য</h3>
            <button
              @click="showModal = false"
              class="text-white/80 hover:text-white transition-colors"
              aria-label="Close"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto">
            <div class="space-y-4 text-gray-700" v-html="noteDetail"></div>
          </div>

          <!-- Footer -->
          <div class="px-6 py-4 border-t border-gray-200 text-center">
            <button
              @click="showModal = false"
              class="inline-flex items-center justify-center px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<script setup>
  const props = defineProps({
    title: { type: String, required: true },
    count: { type: Number, required: true },
    total: { type: Number, required: true },
    // Short summary line shown under the header (always visible).
    note: { type: String, default: "" },
    // Full HTML detail shown inside the modal when "বিস্তারিত দেখুন"
    // is clicked. If empty, no "see details" button is rendered.
    noteDetail: { type: String, default: "" },
    // Section accent: "emerald" or "red".
    tone: {
      type: String,
      default: "emerald",
      validator: (v) => ["emerald", "red"].includes(v),
    },
    // Result badge accent (can differ from section tone).
    badgeText: { type: String, default: "" },
    badgeTone: {
      type: String,
      default: "emerald",
      validator: (v) => ["emerald", "red"].includes(v),
    },
    rows: { type: Array, required: true },
    // Field name on each row to read per-row status (1=YES, 2=NO).
    // When set, the badge is rendered per-row instead of using static badgeText.
    statusField: { type: String, default: "" },
    // Field name on each row to read criteria_id.
    // When set, an extra "Criteria" column is rendered.
    criteriaField: { type: String, default: "" },
    // Criteria map: { id: "name", ... } for displaying criteria names.
    criteriaMap: { type: Object, default: () => ({}) },
  });

  const showModal = ref(false);

  const toneMap = {
    emerald: {
      bar: "",
      title: "text-emerald-700",
      head: "bg-emerald-50",
    },
    red: {
      bar: "",
      title: "text-red-700",
      head: "bg-red-50",
    },
  };

  const badgeMap = {
    emerald: "bg-emerald-100 text-emerald-700",
    red: "bg-red-100 text-red-700",
  };

  const tone = computed(() => toneMap[props.tone] || toneMap.emerald);
  const badgeToneClass = computed(
    () => badgeMap[props.badgeTone] || badgeMap.emerald,
  );

  const getCriteriaName = (criteriaId) => {
    if (!criteriaId) return "—";
    return props.criteriaMap[criteriaId] || `Criteria #${criteriaId}`;
  };
</script>
