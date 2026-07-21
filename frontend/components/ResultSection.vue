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

    <!-- Table -->
    <table class="w-full text-left border-collapse">
      <thead>
        <tr :class="['text-center', tone.head]">
          <th class="p-2 border w-12">#</th>
          <th class="p-2 border w-20">Serial</th>
          <th class="p-2 border w-28">Reg No</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border w-40">Phone</th>
          <th class="p-2 border w-32">Result</th>
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
          <td class="p-2 border whitespace-nowrap">{{ row.phone || "—" }}</td>
          <td class="p-2 border">
            <span
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
  </section>
</template>

<script setup>
  const props = defineProps({
    title: { type: String, required: true },
    count: { type: Number, required: true },
    total: { type: Number, required: true },
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
  });

  const toneMap = {
    emerald: {
      bar: "border-emerald-500",
      title: "text-emerald-700",
      head: "bg-emerald-50",
    },
    red: {
      bar: "border-red-500",
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
</script>
