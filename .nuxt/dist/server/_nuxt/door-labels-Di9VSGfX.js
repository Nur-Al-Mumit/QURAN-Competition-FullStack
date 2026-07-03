import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
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
  __name: "door-labels",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-63dd6ced><div class="min-h-screen bg-gray-50" data-v-63dd6ced><div class="print:hidden bg-white shadow-sm border-b p-4 mb-6" data-v-63dd6ced><div class="max-w-4xl mx-auto" data-v-63dd6ced><h1 class="text-2xl font-bold text-emerald-800 mb-4" data-v-63dd6ced> Door Label Generator </h1><div class="text-gray-600 mb-4" data-v-63dd6ced> Total Labels: ${ssrInterpolate(unref(examiners).length)}</div><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium transition-colors" data-v-63dd6ced> 🖨️ Print All Labels </button></div></div><div class="max-w-4xl mx-auto door-labels" data-v-63dd6ced><!--[-->`);
      ssrRenderList(unref(examiners), (examiner, index) => {
        _push(`<div class="${ssrRenderClass([
          "w-full h-[297mm] bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8",
          "print:mb-0 print:break-after-page"
        ])}" data-v-63dd6ced><div class="relative h-full flex flex-col items-center justify-center" data-v-63dd6ced><div class="text-center mb-32" data-v-63dd6ced><h1 class="text-[44px] font-bold text-emerald-800 mb-4" data-v-63dd6ced> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><div class="w-24 h-1 bg-emerald-600 mx-auto mb-32" data-v-63dd6ced></div><div class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-2" data-v-63dd6ced> Room Number </div><div class="text-[350px] font-black text-emerald-800 leading-none" data-v-63dd6ced>${ssrInterpolate(examiner.room_number)}</div></div><div class="text-center" data-v-63dd6ced><div class="text-emerald-600 text-2xl font-semibold uppercase tracking-widest mb-8" data-v-63dd6ced> Examiner </div><div class="text-4xl font-bold text-emerald-900 leading-tight text-center uppercase" data-v-63dd6ced>${ssrInterpolate(examiner.name)}</div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/(EXAMINER)/door-labels.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const doorLabels = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63dd6ced"]]);
export {
  doorLabels as default
};
//# sourceMappingURL=door-labels-Di9VSGfX.js.map
