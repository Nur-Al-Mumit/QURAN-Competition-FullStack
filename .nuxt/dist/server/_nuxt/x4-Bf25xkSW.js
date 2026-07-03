import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
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
  __name: "x4",
  __ssrInlineRender: true,
  setup(__props) {
    const students = ref([
      {
        reg_no: "RC129411",
        name_bn: "হোসেইন মোহামেদ জাকারিয়া",
        name_en: "hossain mohamed Zakaria",
        phone: "01701970188"
      },
      {
        reg_no: "RC140238",
        name_bn: "খন্দকার তানভীর ইসলাম",
        name_en: "KHANDAKER TANVIR ISLAM",
        phone: "01629273890"
      },
      {
        reg_no: "RC143160",
        name_bn: "নিশাত আনজুম",
        name_en: "NISHAT ANJUM",
        phone: "01740384071"
      },
      {
        reg_no: "RC145134",
        name_bn: "মো: আয়াহনুর আহমেদ রিয়াদ",
        name_en: "Md. Ayahnoor Ahmed Riyad",
        phone: "01314903719"
      },
      {
        reg_no: "RC146370",
        name_bn: "মো: আব্দুল্লাহ আল রাফিজ",
        name_en: "MD Abdullah Al Rafiz",
        phone: "01601235810"
      },
      {
        reg_no: "RC159885",
        name_bn: "মোঃ আম্বিয়া হোসাইন",
        name_en: "MD. AMBIA HUSSAIN",
        phone: "01745584514"
      },
      {
        reg_no: "RC172646",
        name_bn: "আহমদ রাজি",
        name_en: "Ahmad Razee",
        phone: "01675412589"
      },
      {
        reg_no: "RC173375",
        name_bn: "তারেক এনাম সামি",
        name_en: "Tarek Anam Sami",
        phone: "01707980607"
      },
      {
        reg_no: "RC184229",
        name_bn: "জাকারিয়া বিন জাহিদ",
        name_en: "Zakariya bin Zahid",
        phone: "01708429182"
      },
      {
        reg_no: "RC185620",
        name_bn: "তোফায়েল আহমেদ",
        name_en: "Tofayel Ahmed",
        phone: "01734060018"
      },
      {
        reg_no: "RC186930",
        name_bn: "মোহাম্মদ ইমাদুল খালিক চৌধুরি",
        name_en: "Md Imadul Khalique Chowdhury",
        phone: "01745709844"
      },
      {
        reg_no: "RC189395",
        name_bn: "মো: তৈয়বুর রহমান",
        name_en: "Md. Toyobur Rahman",
        phone: "01644244364"
      },
      {
        reg_no: "RC193231",
        name_bn: "মো: তাজুল ইসলাম",
        name_en: "Md. Tajul Islam",
        phone: "01913378088"
      },
      {
        reg_no: "RC198474",
        name_bn: "সাইফুর রহমান",
        name_en: "Saifur Rahman",
        phone: "01758976790"
      },
      {
        reg_no: "RC1100224",
        name_bn: "তাহমিদ হাসান মুছা",
        name_en: "Tahmid Hasan Musa",
        phone: "01614044130"
      },
      {
        reg_no: "RC1102569",
        name_bn: "সাইদুল ইসলাম মারুফ",
        name_en: "Saidul Islam Maruf",
        phone: "01331526868"
      },
      {
        reg_no: "RC1104504",
        name_bn: "রুহুল আমিন রেজা",
        name_en: "Ruhul Amin Reza",
        phone: "01902059418"
      },
      {
        reg_no: "RC1107176",
        name_bn: "মো আব্দুর রহমান নাইম",
        name_en: "md abdur rahman Nayeem",
        phone: "01831703778"
      },
      {
        reg_no: "RC1126205",
        name_bn: "আইয়াদ আলাবী শান্ত",
        name_en: "Ayad Alabi Shanto",
        phone: "01819900941"
      },
      {
        reg_no: "RC1127990",
        name_bn: "মাহদি আল মাহফুজ",
        name_en: "Mahdi Al Mahfuz",
        phone: "01300913794"
      },
      {
        reg_no: "RC1133555",
        name_bn: "মনজুর আলম নাঈম",
        name_en: "Monjur alom naeem",
        phone: "01322534096"
      },
      {
        reg_no: "RC1138783",
        name_bn: "মোদাচ্ছির আহমদ",
        name_en: "Mudassir Ahmed",
        phone: "01728334458"
      },
      {
        reg_no: "RC1151533",
        name_bn: "হাসনাত আব্দুছ সালিক",
        name_en: "Hasnath Abdus Salique",
        phone: "01327044009"
      },
      {
        reg_no: "RC1153960",
        name_bn: "আহমাদ মাঈনুল হাসান",
        name_en: "Ahmad Mainul Hasan",
        phone: "01758092545"
      },
      {
        reg_no: "RC1154271",
        name_bn: "মোঃ সাদাত হোসেন খান",
        name_en: "Md Sadat Hussein Khan",
        phone: "01717023978"
      },
      {
        reg_no: "RC1157319",
        name_bn: "মজনু মিয়া",
        name_en: "MOJNU MIAH",
        phone: "01746674126"
      },
      {
        reg_no: "RC1163954",
        name_bn: "মোঃ তোফায়েল আহমেদ",
        name_en: "Md Tofayel Ahmed",
        phone: "01857439417"
      },
      {
        reg_no: "RC1175661",
        name_bn: "মোহাম্মদ আশরাফুল হুদা",
        name_en: "Mohammad Ashraful Huda",
        phone: "01711484905"
      },
      {
        reg_no: "RC1182992",
        name_bn: "মোঃ আব্দুল বাকী চৌধুরী",
        name_en: "Md Abdul baki Chowdhury",
        phone: "01317564800"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-be69231e><div class="min-h-screen bg-gray-50" data-v-be69231e><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6" data-v-be69231e><div class="max-w-7xl mx-auto" data-v-be69231e><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-be69231e> Competition Attendance Sheet Generator </h1><div class="text-gray-600 mb-4" data-v-be69231e> Total Students: ${ssrInterpolate(unref(students).length)} | Competition Date: 9 August 2025 </div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-be69231e> 🖨️ Print Competition Attendance Sheet </button></div></div><div class="print-only cover-page max-w-7xl mx-auto h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 print:bg-white print:shadow-none print:mb-8" data-v-be69231e><div class="absolute inset-8 border-4 border-emerald-600 rounded-lg opacity-20" data-v-be69231e></div><div class="absolute inset-12 border-1 border-emerald-400 rounded-lg opacity-30" data-v-be69231e></div><div class="text-center z-10 px-8" data-v-be69231e><h1 class="text-5xl font-bold text-emerald-800 mb-8 leading-tight" data-v-be69231e> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা </h1><div class="text-3xl font-semibold text-emerald-700 mb-12" data-v-be69231e> ১৪৪৭ হিজরি </div><div class="flex items-center justify-center mb-12" data-v-be69231e><div class="w-16 h-1 bg-emerald-600" data-v-be69231e></div><div class="w-4 h-4 bg-emerald-600 rounded-full mx-4" data-v-be69231e></div><div class="w-16 h-1 bg-emerald-600" data-v-be69231e></div></div><h2 class="text-4xl font-bold text-emerald-800 mb-8" data-v-be69231e>RESULT SHEET</h2><div class="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg border border-emerald-200 mb-16" data-v-be69231e><div class="text-emerald-600 text-lg font-semibold mb-2" data-v-be69231e> COMPETITION DAY </div><div class="text-2xl font-bold text-emerald-800" data-v-be69231e> 9 August, 2025 </div></div><div class="text-emerald-600 text-lg" data-v-be69231e><div class="font-semibold mb-2" data-v-be69231e> Total Students: ${ssrInterpolate(unref(students).length)}</div></div></div><div class="absolute bottom-12 left-1/2 transform -translate-x-1/2" data-v-be69231e><div class="flex space-x-2" data-v-be69231e><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-be69231e></div><div class="w-3 h-3 bg-emerald-400 rounded-full" data-v-be69231e></div><div class="w-3 h-3 bg-emerald-600 rounded-full" data-v-be69231e></div></div></div></div><div class="max-w-7xl mx-auto attendance-sheet page-break" data-v-be69231e><div class="w-full bg-white shadow-lg print:shadow-none print:w-full relative overflow-hidden mb-8 print:mb-0" data-v-be69231e><div class="relative p-8 print:p-6" data-v-be69231e><div class="text-center mb-6 print-header" data-v-be69231e><h1 class="text-3xl font-bold text-emerald-800 mb-2" data-v-be69231e> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><div class="w-16 h-1 bg-emerald-600 mx-auto mb-4" data-v-be69231e></div><h2 class="text-2xl font-semibold text-emerald-700 mb-2" data-v-be69231e> RESULT SHEET </h2><div class="text-lg text-emerald-600 font-medium" data-v-be69231e> Competition Date: 9 August, 2025 </div></div><div class="overflow-x-auto" data-v-be69231e><table class="w-full border-collapse border-1 border-emerald-800 text-[16px]" data-v-be69231e><thead data-v-be69231e><tr class="bg-emerald-100" data-v-be69231e><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-8" data-v-be69231e> # </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] min-w-36" data-v-be69231e> STUDENT NAME </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] min-w-28" data-v-be69231e> REG NO </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-48" data-v-be69231e> PHONE </th><th class="border-1 border-emerald-800 p-2 text-emerald-800 font-bold text-[16px] w-48" data-v-be69231e> MARKS </th></tr></thead><tbody data-v-be69231e><!--[-->`);
      ssrRenderList(unref(students), (student, index) => {
        _push(`<tr class="h-16" data-v-be69231e><td class="border-1 border-emerald-800 p-1 text-center font-semibold text-emerald-900 text-[16px]" data-v-be69231e>${ssrInterpolate(index + 1)}</td><td class="border-1 border-emerald-800 p-1 font-medium text-emerald-900 text-[16px] uppercase whitespace-nowrap" data-v-be69231e>${ssrInterpolate(student.name_en)}</td><td class="border-1 border-emerald-800 p-1 text-center text-[16px] text-emerald-700" data-v-be69231e>${ssrInterpolate(student.reg_no)}</td><td class="border-1 border-emerald-800 p-1 text-center text-[16px] text-emerald-700" data-v-be69231e>${ssrInterpolate(student.phone)}</td><td class="border-1 border-emerald-800 p-1 text-center align-top" data-v-be69231e></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div><div class="mt-6 text-[16px] text-gray-600 text-center" data-v-be69231e><div class="mb-2" data-v-be69231e><strong data-v-be69231e>Total Students:</strong> ${ssrInterpolate(unref(students).length)} | <strong data-v-be69231e>Competition Date:</strong> 9 August, 2025 </div><div data-v-be69231e> Please ensure all students provide their signature to confirm attendance. </div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/x4.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const x4 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-be69231e"]]);
export {
  x4 as default
};
//# sourceMappingURL=x4-Bf25xkSW.js.map
