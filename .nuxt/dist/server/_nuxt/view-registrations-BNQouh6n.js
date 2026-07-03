import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
  __name: "view-registrations",
  __ssrInlineRender: true,
  setup(__props) {
    const attendanceData = ref([]);
    const loading = ref(true);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-gray-50 min-h-screen attendance-sheet print:p-0 print:m-0" }, _attrs))} data-v-2cd33083>`);
      if (unref(loading)) {
        _push(`<div class="text-center text-gray-600" data-v-2cd33083> Loading attendance data... </div>`);
      } else {
        _push(`<div data-v-2cd33083><!--[-->`);
        ssrRenderList(unref(attendanceData), (group) => {
          _push(`<div class="mb-12 examiner-group" data-v-2cd33083><h1 class="text-2xl font-bold mb-2 text-center text-primary" data-v-2cd33083> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><h1 class="text-xl font-bold mb-6 text-center leading-[20px]" data-v-2cd33083> Seat Plan </h1><div class="mb-6" data-v-2cd33083><h2 class="text-xl font-semibold text-emerald-700" data-v-2cd33083> Examiner: ${ssrInterpolate(group.examiner.name)}</h2><div class="flex gap-2" data-v-2cd33083><p class="text-sm font-bold" data-v-2cd33083> Room: ${ssrInterpolate(group.examiner.room_number)}</p></div></div><div class="print:w-full" data-v-2cd33083><table class="w-full text-left border-collapse" data-v-2cd33083><thead data-v-2cd33083><tr class="bg-gray-100 text-center" data-v-2cd33083><th class="p-2 border" data-v-2cd33083>Serial</th><th class="p-2 border" data-v-2cd33083>Reg No</th><th class="p-2 border" data-v-2cd33083>Name</th><th class="p-2 border" data-v-2cd33083>Phone</th><th class="p-2 border" data-v-2cd33083>Exam Time</th></tr></thead><tbody data-v-2cd33083><!--[-->`);
          ssrRenderList(group.students, (student) => {
            _push(`<tr class="hover:bg-gray-50 text-center" data-v-2cd33083><td class="p-2 border font-semibold" data-v-2cd33083>${ssrInterpolate(student.serial)}</td><td class="p-2 border" data-v-2cd33083>${ssrInterpolate(student.reg_no)}</td><td class="p-2 border" data-v-2cd33083>${ssrInterpolate(student.name_en)}</td><td class="p-2 border" data-v-2cd33083>${ssrInterpolate(student.phone)}</td><td class="p-2 border" data-v-2cd33083>${ssrInterpolate(student.exam_time)}</td></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div>`);
        });
        _push(`<!--]--><div class="text-center print:hidden" data-v-2cd33083><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow" data-v-2cd33083> Print Attendance Sheet </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/(ADMIN)/view-registrations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const viewRegistrations = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2cd33083"]]);
export {
  viewRegistrations as default
};
//# sourceMappingURL=view-registrations-BNQouh6n.js.map
