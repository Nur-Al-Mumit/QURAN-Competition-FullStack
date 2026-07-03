import { ref, computed, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
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
  __name: "z1",
  __ssrInlineRender: true,
  setup(__props) {
    const questions = ref([
      {
        id: 1,
        surah: "আল-মুলক | Al-Mulk | سورة الملك",
        verses: [
          { id: 1, start: 1, end: 5 },
          { id: 2, start: 6, end: 10 },
          { id: 3, start: 11, end: 15 },
          { id: 4, start: 16, end: 20 }
        ]
      },
      {
        id: 1,
        surah: "আল-মুযযাম্মিল | Al-Muzzammil | سورة المزمل",
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 p-8" }, _attrs))} data-v-86e3a1c9><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6" data-v-86e3a1c9><div class="max-w-7xl mx-auto" data-v-86e3a1c9><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-86e3a1c9> Lottery Chunk Generator </h1><div class="text-gray-600 mb-4" data-v-86e3a1c9> Total Students: ${ssrInterpolate(students.value.length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-86e3a1c9> 🖨️ Print Lottery Chunks </button></div></div><div class="grid grid-cols-3 gap-4 print:gap-2 print:grid-cols-3" data-v-86e3a1c9><!--[-->`);
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
export {
  z1 as default
};
//# sourceMappingURL=z1-2qyL03B-.js.map
