import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/radix3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/destr/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ohash/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/klona/dist/index.mjs";
import "deep-pick-omit";
import "axios";
const _sfc_main = {
  __name: "test",
  __ssrInlineRender: true,
  setup(__props) {
    const examiners = ref([
      {
        id: 2,
        name: "Ustadh Mufti Muaddab",
        room_number: "201"
      },
      {
        id: 3,
        name: "Imaam Md. Sadiqur Rahman",
        room_number: "202"
      },
      {
        id: 4,
        name: "Imaam Ahmed Abdul Basit",
        room_number: "203"
      },
      {
        id: 5,
        name: "Sheikh Majedul Islam Madani",
        room_number: "204"
      },
      {
        id: 6,
        name: "Imaam MD. Yousuf Ali",
        room_number: "205"
      }
    ]);
    const attendanceDates = ref([
      { display: "3 August 2025 (Sunday)", date: "2025-08-03" },
      { display: "4 August 2025 (Monday)", date: "2025-08-04" },
      { display: "5 August 2025 (Tuesday)", date: "2025-08-05" },
      { display: "6 August 2025 (Wednesday)", date: "2025-08-06" },
      { display: "7 August 2025 (Thursday)", date: "2025-08-07" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-8f858561><div class="min-h-screen bg-gray-50" data-v-8f858561><div class="print:hidden bg-white shadow-sm border-b p-0 mb-6" data-v-8f858561><div class="max-w-4xl mx-auto" data-v-8f858561><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-8f858561> Examiner Attendance Sheet Generator </h1><div class="text-gray-600 mb-4" data-v-8f858561> Total Attendance Sheets: ${ssrInterpolate(unref(examiners).length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-8f858561> 🖨️ Print All Attendance Sheets </button></div></div><div class="max-w-4xl mx-auto attendance-sheets" data-v-8f858561><!--[-->`);
      ssrRenderList(unref(examiners), (examiner, index) => {
        _push(`<div class="${ssrRenderClass([
          "w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8",
          "print:mb-0 print:break-after-page"
        ])}" data-v-8f858561><div class="relative h-full p-12 flex flex-col" data-v-8f858561><div class="text-center mb-8" data-v-8f858561><h1 class="text-3xl font-bold text-emerald-800 mb-2" data-v-8f858561> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><div class="w-16 h-1 bg-emerald-600 mx-auto mb-4" data-v-8f858561></div><h2 class="text-2xl font-semibold text-emerald-700 mb-6" data-v-8f858561> ATTENDANCE SHEET </h2></div><div class="w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8 print:mb-0 print:break-after-page" data-v-8f858561><div class="relative h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 print:bg-white" data-v-8f858561><div class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20" data-v-8f858561></div><div class="absolute inset-12 border-2 border-emerald-400 rounded-lg opacity-30" data-v-8f858561></div><div class="text-center z-10 px-8" data-v-8f858561><div class="mb-12" data-v-8f858561><div class="w-32 h-32 mx-auto mb-8 bg-emerald-600 rounded-full flex items-center justify-center" data-v-8f858561><div class="text-white text-4xl font-bold" data-v-8f858561>☪</div></div></div><h1 class="text-5xl font-bold text-emerald-800 mb-8 leading-tight" data-v-8f858561> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা </h1><div class="text-3xl font-semibold text-emerald-700 mb-12" data-v-8f858561> ১৪৪৭ হিজরি </div><div class="flex items-center justify-center mb-12" data-v-8f858561><div class="w-16 h-1 bg-emerald-600" data-v-8f858561></div><div class="w-4 h-4 bg-emerald-600 rounded-full mx-4" data-v-8f858561></div><div class="w-16 h-1 bg-emerald-600" data-v-8f858561></div></div><h2 class="text-4xl font-bold text-emerald-800 mb-8" data-v-8f858561> ATTENDANCE SHEETS </h2><div class="text-2xl font-semibold text-emerald-600 mb-16" data-v-8f858561> FOR EXAMINERS </div><div class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16" data-v-8f858561><div class="text-emerald-600 text-lg font-semibold mb-2" data-v-8f858561> COMPETITION PERIOD </div><div class="text-2xl font-bold text-emerald-800" data-v-8f858561> 3rd August - 7th August, 2025 </div></div><div class="text-emerald-600 text-lg" data-v-8f858561><div class="font-semibold mb-2" data-v-8f858561> Total Examiners: ${ssrInterpolate(unref(examiners).length)}</div><div class="text-sm opacity-75" data-v-8f858561> Individual attendance tracking sheets </div></div></div><div class="absolute bottom-12 left-1/2 transform -translate-x-1/2" data-v-8f858561><div class="flex space-x-2" data-v-8f858561><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-8f858561></div><div class="w-3 h-3 bg-emerald-400 rounded-full" data-v-8f858561></div><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-8f858561></div></div></div></div></div><div class="mb-8" data-v-8f858561><div class="text-2xl font-bold text-emerald-900 uppercase border-b-2 border-emerald-200 pb-2" data-v-8f858561>${ssrInterpolate(examiner.name)}</div></div><div class="flex-1" data-v-8f858561><table class="w-full border-collapse border-2 border-emerald-800" data-v-8f858561><thead data-v-8f858561><tr class="bg-emerald-100" data-v-8f858561><th class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[200px]" data-v-8f858561> DATE </th><th class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[350px]" data-v-8f858561> START TIME </th><th class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[350px]" data-v-8f858561> END TIME </th><th class="border-2 border-emerald-800 p-4 text-emerald-800 font-bold text-lg w-[150px]" data-v-8f858561> SIGNATURE </th></tr></thead><tbody data-v-8f858561><!--[-->`);
        ssrRenderList(unref(attendanceDates), (date) => {
          _push(`<tr class="h-20" data-v-8f858561><td class="border-2 border-emerald-800 p-4 text-center font-semibold text-emerald-900 text-sm" data-v-8f858561>${ssrInterpolate(date.display)}</td><td class="border-2 border-emerald-800 p-4 text-center" data-v-8f858561></td><td class="border-2 border-emerald-800 p-4 text-center" data-v-8f858561></td><td class="border-2 border-emerald-800 p-4 text-center" data-v-8f858561></td></tr>`);
        });
        _push(`<!--]--></tbody></table></div><div class="mt-8 text-sm text-gray-600 text-center" data-v-8f858561><p class="font-semibold" data-v-8f858561>Instructions:</p><p data-v-8f858561> Please fill in your start time, end time, and signature for each day of attendance. </p></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/test.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const test = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8f858561"]]);
export {
  test as default
};
//# sourceMappingURL=test-QETi6ErB.js.map
