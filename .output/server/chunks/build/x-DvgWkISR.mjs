import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ref, computed, useSSRContext } from 'vue';
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

const studentsPerPage = 10;
const _sfc_main = {
  __name: "x",
  __ssrInlineRender: true,
  setup(__props) {
    const students = ref([
      { name_en: "hossain mohamed Zakaria", phone: "01701970188" },
      { name_en: "KHANDAKER TANVIR ISLAM", phone: "01629273890" },
      { name_en: "NISHAT ANJUM", phone: "01740384071" },
      { name_en: "Md. Ayahnoor Ahmed Riyad", phone: "01314903719" },
      { name_en: "MD Abdullah Al Rafiz", phone: "01601235810" },
      { name_en: "MD. AMBIA HUSSAIN", phone: "01745584514" },
      { name_en: "Ahmad Razee", phone: "01675412589" },
      { name_en: "Tarek Anam Sami", phone: "01707980607" },
      { name_en: "Zakariya bin Zahid", phone: "01708429182" },
      { name_en: "Tofayel Ahmed", phone: "01734060018" },
      { name_en: "Md Imadul Khalique Chowdhury", phone: "01745709844" },
      { name_en: "Md. Toyobur Rahman", phone: "01644244364" },
      { name_en: "Md. Tajul Islam", phone: "01913378088" },
      { name_en: "Saifur Rahman", phone: "01758976790" },
      { name_en: "Tahmid Hasan Musa", phone: "01614044130" },
      { name_en: "Saidul Islam Maruf", phone: "01331526868" },
      { name_en: "Ruhul Amin Reza", phone: "01902059418" },
      { name_en: "md abdur rahman Nayeem", phone: "01831703778" },
      { name_en: "Ayad Alabi Shanto", phone: "01819900941" },
      { name_en: "Mahdi Al Mahfuz", phone: "01300913794" },
      { name_en: "Monjur alom naeem", phone: "01322534096" },
      { name_en: "Mudassir Ahmed", phone: "01728334458" },
      { name_en: "Hasnath Abdus Salique", phone: "01327044009" },
      { name_en: "Ahmad Mainul Hasan", phone: "01758092545" },
      { name_en: "Md Sadat Hussein Khan", phone: "01717023978" },
      { name_en: "MOJNU MIAH", phone: "01746674126" },
      { name_en: "Md Tofayel Ahmed", phone: "01857439417" },
      { name_en: "Mohammad Ashraful Huda", phone: "01711484905" },
      { name_en: "Md Abdul baki Chowdhury", phone: "01317564800" }
    ]);
    const attendanceDates = ref([
      { shortDate: "3 Aug", day: "Sun", date: "2025-08-03" },
      { shortDate: "4 Aug", day: "Mon", date: "2025-08-04" },
      { shortDate: "5 Aug", day: "Tue", date: "2025-08-05" },
      { shortDate: "6 Aug", day: "Wed", date: "2025-08-06" },
      { shortDate: "7 Aug", day: "Thu", date: "2025-08-07" }
    ]);
    const studentChunks = computed(() => {
      const chunks = [];
      for (let i = 0; i < students.value.length; i += studentsPerPage) {
        chunks.push(students.value.slice(i, i + studentsPerPage));
      }
      return chunks;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-82a45ba3><div class="min-h-screen bg-gray-50" data-v-82a45ba3><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6" data-v-82a45ba3><div class="max-w-7xl mx-auto" data-v-82a45ba3><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-82a45ba3> Student Attendance Sheet Generator </h1><div class="text-gray-600 mb-4" data-v-82a45ba3> Total Students: ${ssrInterpolate(students.value.length)} | Competition Period: 3-7 August 2025 </div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-82a45ba3> \u{1F5A8}\uFE0F Print Student Attendance Sheet </button></div></div><div class="print-only cover-page max-w-7xl mx-auto h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 print:bg-white print:shadow-none print:mb-8" data-v-82a45ba3><div class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20" data-v-82a45ba3></div><div class="absolute inset-12 border-1 border-emerald-400 rounded-lg opacity-30" data-v-82a45ba3></div><div class="text-center z-10 px-8" data-v-82a45ba3><h1 class="text-5xl font-bold text-emerald-800 mb-8 leading-tight" data-v-82a45ba3> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE </h1><div class="text-3xl font-semibold text-emerald-700 mb-12" data-v-82a45ba3> \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </div><div class="flex items-center justify-center mb-12" data-v-82a45ba3><div class="w-16 h-1 bg-emerald-600" data-v-82a45ba3></div><div class="w-4 h-4 bg-emerald-600 rounded-full mx-4" data-v-82a45ba3></div><div class="w-16 h-1 bg-emerald-600" data-v-82a45ba3></div></div><h2 class="text-4xl font-bold text-emerald-800 mb-8" data-v-82a45ba3> ATTENDANCE SHEET </h2><div class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16" data-v-82a45ba3><div class="text-emerald-600 text-lg font-semibold mb-2" data-v-82a45ba3> TRAINING PERIOD </div><div class="text-2xl font-bold text-emerald-800" data-v-82a45ba3> 3rd August - 7th August, 2025 </div></div><div class="text-emerald-600 text-lg" data-v-82a45ba3><div class="font-semibold mb-2" data-v-82a45ba3> Total Students: ${ssrInterpolate(students.value.length)}</div></div></div><div class="absolute bottom-12 left-1/2 transform -translate-x-1/2" data-v-82a45ba3><div class="flex space-x-2" data-v-82a45ba3><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-82a45ba3></div><div class="w-3 h-3 bg-emerald-400 rounded-full" data-v-82a45ba3></div><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-82a45ba3></div></div></div></div><!--[-->`);
      ssrRenderList(studentChunks.value, (chunk, chunkIndex) => {
        _push(`<div class="max-w-7xl mx-auto attendance-sheet page-break" data-v-82a45ba3><div class="w-full bg-white shadow-lg print:shadow-none print:w-full relative overflow-hidden mb-8 print:mb-0" data-v-82a45ba3><div class="relative p-8 print:p-6" data-v-82a45ba3><div class="text-center mb-6 print-header" data-v-82a45ba3><h1 class="text-3xl font-bold text-emerald-800 mb-2" data-v-82a45ba3> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE - \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </h1><div class="w-16 h-1 bg-emerald-600 mx-auto mb-4" data-v-82a45ba3></div><h2 class="text-2xl font-semibold text-emerald-700 mb-2" data-v-82a45ba3> STUDENT ATTENDANCE SHEET </h2><div class="text-lg text-emerald-600 font-medium" data-v-82a45ba3> Training Period: 3rd August - 7th August, 2025 </div></div><div class="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6 print:bg-gray-100 print-instructions" data-v-82a45ba3><div class="text-[12px] text-emerald-800 font-semibold" data-v-82a45ba3><strong data-v-82a45ba3>Instructions:</strong> Mark <strong data-v-82a45ba3>&quot;P&quot;</strong> for Present, <strong data-v-82a45ba3>&quot;L&quot;</strong> for Late, <strong data-v-82a45ba3>&quot;A&quot;</strong> for Absent in the top section, then provide signature below the line for each day. </div></div><div class="overflow-x-auto" data-v-82a45ba3><table class="w-full border-collapse border-1 border-emerald-800 text-sm" data-v-82a45ba3><thead data-v-82a45ba3><tr class="bg-emerald-100" data-v-82a45ba3><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs w-8" data-v-82a45ba3> # </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs min-w-40" data-v-82a45ba3> STUDENT NAME </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-xs w-20" data-v-82a45ba3> PHONE </th><!--[-->`);
        ssrRenderList(attendanceDates.value, (date) => {
          _push(`<th class="border-1 border-emerald-800 text-emerald-800 font-bold text-xs w-24" data-v-82a45ba3><div class="p-1" data-v-82a45ba3><div class="text-xs" data-v-82a45ba3>${ssrInterpolate(date.shortDate)} 25</div><div class="text-xs opacity-75" data-v-82a45ba3>${ssrInterpolate(date.day)}</div><div class="text-xs border-t border-emerald-600 mt-1 pt-1" data-v-82a45ba3> P/L/A &amp; Sign </div></div></th>`);
        });
        _push(`<!--]--></tr></thead><tbody data-v-82a45ba3><!--[-->`);
        ssrRenderList(chunk, (student, index) => {
          _push(`<tr class="h-16" data-v-82a45ba3><td class="border-1 border-emerald-800 p-1 text-center font-semibold text-emerald-900 text-xs" data-v-82a45ba3>${ssrInterpolate(chunkIndex * studentsPerPage + index + 1)}</td><td class="border-1 border-emerald-800 p-1 font-medium text-emerald-900 text-xs uppercase" data-v-82a45ba3>${ssrInterpolate(student.name_en)}</td><td class="border-1 border-emerald-800 p-1 text-center text-xs text-emerald-700" data-v-82a45ba3>${ssrInterpolate(student.phone)}</td><!--[-->`);
          ssrRenderList(attendanceDates.value, (date) => {
            _push(`<td class="border-1 border-emerald-800 p-1 text-center align-top" data-v-82a45ba3><div class="flex flex-col h-full" data-v-82a45ba3><div class="h-6" data-v-82a45ba3></div><hr class="border-t border-emerald-600 my-1" data-v-82a45ba3><div class="h-6" data-v-82a45ba3></div></div></td>`);
          });
          _push(`<!--]--></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="mt-6 text-xs text-gray-600 text-center" data-v-82a45ba3><div class="mb-2" data-v-82a45ba3><strong data-v-82a45ba3>Total Students:</strong> ${ssrInterpolate(students.value.length)} | <strong data-v-82a45ba3>Training Days:</strong> ${ssrInterpolate(attendanceDates.value.length)}</div><div data-v-82a45ba3> Please ensure all students mark their attendance (P/L/A) above the line and provide signature below the line for each day. </div></div></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/x.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const x = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-82a45ba3"]]);

export { x as default };
//# sourceMappingURL=x-DvgWkISR.mjs.map
