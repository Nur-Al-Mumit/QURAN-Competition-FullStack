import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
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
  __name: "submit-viva-result",
  __ssrInlineRender: true,
  setup(__props) {
    const attendanceData = ref([]);
    const loading = ref(true);
    const getExamTimeRange = (students) => {
      if (!students || students.length === 0) {
        return { start: "N/A", end: "N/A" };
      }
      const firstWithTime = students.find((s) => s.exam_time && s.exam_time.includes(" - "));
      const lastWithTime = [...students].reverse().find((s) => s.exam_time && s.exam_time.includes(" - "));
      if (!firstWithTime || !lastWithTime) {
        return { start: "N/A", end: "N/A" };
      }
      const start = firstWithTime.exam_time.split(" - ")[0];
      const end = lastWithTime.exam_time.split(" - ")[1];
      return { start, end };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 bg-gray-50 min-h-screen attendance-sheet print:p-0 print:m-0" }, _attrs))} data-v-ca478b46>`);
      if (unref(loading)) {
        _push(`<div class="text-center text-gray-600" data-v-ca478b46> Loading attendance data... </div>`);
      } else {
        _push(`<div data-v-ca478b46><!--[-->`);
        ssrRenderList(unref(attendanceData), (group) => {
          _push(`<div class="mb-12 examiner-group" data-v-ca478b46><div class="cover-page w-full h-screen bg-white shadow-lg print:shadow-none print:w-full print:h-screen relative overflow-hidden mb-8 print:mb-0" data-v-ca478b46><div class="relative h-full flex flex-col items-center justify-center p-8" data-v-ca478b46><div class="text-center mb-14" data-v-ca478b46><h1 class="text-4xl font-bold text-emerald-800 mb-4" data-v-ca478b46> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><div class="w-24 h-1 bg-emerald-600 mx-auto mb-8" data-v-ca478b46></div></div><div class="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-5 shadow-lg max-w-2xl w-full" data-v-ca478b46><div class="text-center" data-v-ca478b46><h3 class="text-emerald-600 text-xl font-semibold uppercase tracking-widest mb-4" data-v-ca478b46> Examiner Details </h3><div class="space-y-6" data-v-ca478b46><div data-v-ca478b46><label class="text-emerald-700 font-medium text-lg block mb-2" data-v-ca478b46> Name: </label><div class="text-3xl font-bold text-emerald-900 uppercase" data-v-ca478b46>${ssrInterpolate(group.examiner.name)}</div></div><div class="flex justify-center gap-12" data-v-ca478b46><div data-v-ca478b46><label class="text-emerald-700 font-medium text-lg block mb-2" data-v-ca478b46> Room Number: </label><div class="text-6xl font-black text-emerald-800" data-v-ca478b46>${ssrInterpolate(group.examiner.room_number)}</div></div><div data-v-ca478b46><label class="text-emerald-700 font-medium text-lg block mb-2" data-v-ca478b46> Total Students: </label><div class="text-6xl font-black text-emerald-800" data-v-ca478b46>${ssrInterpolate(group.students.length)}</div></div></div><div class="mt-8 pt-6 border-t border-emerald-200" data-v-ca478b46><div class="flex items-center justify-center gap-3" data-v-ca478b46><div data-v-ca478b46><div class="text-xl font-bold text-emerald-800" data-v-ca478b46>${ssrInterpolate(getExamTimeRange(group.students).start)}</div></div><div class="border-t-3 border-emerald-500 w-8" data-v-ca478b46></div><div data-v-ca478b46><div class="text-xl font-bold text-emerald-800" data-v-ca478b46>${ssrInterpolate(getExamTimeRange(group.students).end)}</div></div></div></div></div></div></div><div class="text-center mt-16" data-v-ca478b46><div class="w-24 h-1 bg-emerald-600 mx-auto mb-4" data-v-ca478b46></div><p class="text-gray-600 text-lg font-medium" data-v-ca478b46> Attendance Sheet &amp; Examination Record </p><p class="text-gray-500 text-sm mt-2" data-v-ca478b46>2 August, 2025</p></div></div></div><div class="attendance-content" data-v-ca478b46><div class="print:w-full" data-v-ca478b46><table class="w-full text-left border-collapse" data-v-ca478b46><thead data-v-ca478b46><tr class="bg-gray-100 text-center" data-v-ca478b46><th class="p-2 border w-12" data-v-ca478b46>#</th><th class="p-2 border w-24" data-v-ca478b46>Reg No</th><th class="p-2 border w-32" data-v-ca478b46>Name</th><th class="p-2 border w-12" data-v-ca478b46> Training, <br data-v-ca478b46> Education </th><th class="p-2 border w-30" data-v-ca478b46>Exam Time</th><th class="p-2 border w-64" data-v-ca478b46>Comments</th></tr></thead><tbody data-v-ca478b46><!--[-->`);
          ssrRenderList(group.students, (student) => {
            _push(`<tr class="hover:bg-gray-50 text-center avoid-break" data-v-ca478b46><td class="p-2 border text-center font-semibold whitespace-nowrap" data-v-ca478b46>${ssrInterpolate(student.serial)}</td><td class="p-2 border" data-v-ca478b46>${ssrInterpolate(student.reg_no)}</td><td class="p-2 border" data-v-ca478b46>${ssrInterpolate(student.name_en)}</td><td class="p-2 border text-center" data-v-ca478b46><span class="${ssrRenderClass(
              student.need_training === "Yes" ? "text-rose-600 font-semibold" : "text-emerald-600"
            )}" data-v-ca478b46>${ssrInterpolate(student.need_training)}</span><br data-v-ca478b46><span data-v-ca478b46>${ssrInterpolate(student.education_background)}</span></td><td class="p-2 border whitespace-nowrap" data-v-ca478b46>${ssrInterpolate(student.exam_time)}</td><td class="p-2 border align-top h-150px" data-v-ca478b46></td></tr>`);
          });
          _push(`<!--]--></tbody></table></div></div></div>`);
        });
        _push(`<!--]--><div class="text-center print:hidden" data-v-ca478b46><button class="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg shadow" data-v-ca478b46> Print Attendance Sheet </button></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/(EXAMINER)/submit-viva-result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const submitVivaResult = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ca478b46"]]);
export {
  submitVivaResult as default
};
//# sourceMappingURL=submit-viva-result-DmFXFw5f.js.map
