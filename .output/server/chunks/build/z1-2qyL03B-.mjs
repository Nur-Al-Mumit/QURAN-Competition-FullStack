import { ref, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';

const _sfc_main = {
  __name: "z1",
  __ssrInlineRender: true,
  setup(__props) {
    const questions = ref([
      {
        id: 1,
        surah: "\u0986\u09B2-\u09AE\u09C1\u09B2\u0995 | Al-Mulk | \u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0644\u0643",
        verses: [
          { id: 1, start: 1, end: 5 },
          { id: 2, start: 6, end: 10 },
          { id: 3, start: 11, end: 15 },
          { id: 4, start: 16, end: 20 }
        ]
      },
      {
        id: 1,
        surah: "\u0986\u09B2-\u09AE\u09C1\u09AF\u09AF\u09BE\u09AE\u09CD\u09AE\u09BF\u09B2 | Al-Muzzammil | \u0633\u0648\u0631\u0629 \u0627\u0644\u0645\u0632\u0645\u0644",
        verses: [
          { id: 1, start: 1, end: 6 },
          { id: 2, start: 7, end: 11 },
          { id: 3, start: 12, end: 16 },
          { id: 4, start: 17, end: 20 }
        ]
      }
    ]);
    const students = ref(
      Array.from({ length: 29 }, (_, i) => ({
        name_en: i < 4 ? [
          "hossain mohamed Zakaria",
          "KHANDAKER TANVIR ISLAM",
          "NISHAT ANJUM",
          "Md. Ayahnoor Ahmed Riyad"
        ][i] : `Student ${i + 1}`,
        reg_no: `QURAN-2025-${String(i + 1).padStart(3, "0")}`
      }))
    );
    const allVerses = computed(() => {
      let verses = [];
      questions.value.forEach((q) => {
        q.verses.forEach((v) => {
          verses.push({
            surah: q.surah,
            start: v.start,
            end: v.end
          });
        });
      });
      return verses;
    });
    const assignedQuestions = computed(() => {
      return students.value.map(
        (_, index) => allVerses.value[index % allVerses.value.length]
      );
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-8" }, _attrs))} data-v-86e3a1c9><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6" data-v-86e3a1c9><div class="max-w-7xl mx-auto" data-v-86e3a1c9><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-86e3a1c9> Lottery Chunk Generator </h1><div class="text-gray-600 mb-4" data-v-86e3a1c9> Total Students: ${ssrInterpolate(students.value.length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-86e3a1c9> \u{1F5A8}\uFE0F Print Lottery Chunks </button></div></div><div class="grid grid-cols-3 gap-4 print:gap-2 print:grid-cols-3" data-v-86e3a1c9><!--[-->`);
      ssrRenderList(students.value, (student, index) => {
        _push(`<div class="chunk border-2 border-dashed border-emerald-600 p-4 bg-white shadow-md rounded-lg text-center print:shadow-none print:break-inside-avoid" data-v-86e3a1c9><div class="text-lg font-bold text-emerald-800 mb-2" data-v-86e3a1c9> Name: ${ssrInterpolate(student.name_en.toUpperCase())}</div><div class="text-md font-semibold text-emerald-700 mb-2" data-v-86e3a1c9> Serial Number: ${ssrInterpolate(index + 1)}</div><div class="text-md font-semibold text-emerald-700 mb-2" data-v-86e3a1c9> Surah: ${ssrInterpolate(assignedQuestions.value[index].surah)}</div><div class="text-md font-semibold text-emerald-700" data-v-86e3a1c9> Ayat: ${ssrInterpolate(assignedQuestions.value[index].start)} - ${ssrInterpolate(assignedQuestions.value[index].end)}</div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/z1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const z1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-86e3a1c9"]]);

export { z1 as default };
//# sourceMappingURL=z1-2qyL03B-.mjs.map
