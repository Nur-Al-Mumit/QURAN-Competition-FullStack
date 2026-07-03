import { _ as __nuxt_component_0 } from "./nuxt-link-Cl1STy2k.js";
import { mergeProps, unref, withCtx, createBlock, createTextVNode, openBlock, createVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import { u as useStudentInfoStore } from "./studentInfo-CyG5HN7S.js";
import { u as useHead } from "./v3-gEMt0CXe.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/radix3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/destr/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ohash/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/klona/dist/index.mjs";
import "deep-pick-omit";
import "axios";
import "./competitionForm-ClJDHIES.js";
import "./authenticatedAxios-DoF-q_wg.js";
import "./axios-DBcmg16B.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/@unhead/vue/dist/index.mjs";
const _sfc_main = {
  __name: "view",
  __ssrInlineRender: true,
  setup(__props) {
    const studentInfoStore = useStudentInfoStore();
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getEducationText = (level) => {
      const levels = {
        1: "General",
        2: "Madrasa",
        3: "(General + Madrasa)"
      };
      return levels[level] || `Level ${level}`;
    };
    useHead({
      title: "Registration Details"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-emerald-50 py-8 rounded-2xl shadow-xl" }, _attrs))}><div class="sm:px-6 lg:px-8"><div class="bg-white rounded-lg shadow-md mb-6 p-3 sm:p-6 border-t-4 border-emerald-500"><div class="flex items-center justify-between"><div><h1 class="text-lg sm:text-3xl font-bold text-emerald-900 mb-2"> Registration Details </h1><p class="text-emerald-600">View registration form information</p></div><div class="text-right"><div class="bg-emerald-100 px-2 sm:px-4 sm:py-2 rounded-lg"><span class="text-emerald-800 font-semibold"> Reg No: ${ssrInterpolate((_a = unref(studentInfoStore).form) == null ? void 0 : _a.reg_no)}</span></div></div></div></div><div class="bg-white rounded-lg shadow-md p-6"><div class="mb-8"><h3 class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"> Basic Information </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><div><label class="block text-sm font-medium text-gray-600 mb-1"> Name (English) </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_b = unref(studentInfoStore).form) == null ? void 0 : _b.name_en)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Name (Bangla) </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_c = unref(studentInfoStore).form) == null ? void 0 : _c.name_bn)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Date of Birth </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate(formatDate((_d = unref(studentInfoStore).form) == null ? void 0 : _d.dob))}</div></div></div><div class="space-y-3"><div><label class="block text-sm font-medium text-gray-600 mb-1"> Phone </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_e = unref(studentInfoStore).form) == null ? void 0 : _e.phone)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Address </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_f = unref(studentInfoStore).form) == null ? void 0 : _f.address)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Occupation </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_g = unref(studentInfoStore).form) == null ? void 0 : _g.occupation)}</div></div></div></div></div><div class="mb-8"><h3 class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"> Educational Background </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-3"><div><label class="block text-sm font-medium text-gray-600 mb-1"> Education Level </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate(getEducationText(
        (_h = unref(studentInfoStore).form) == null ? void 0 : _h.education_background
      ))}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> School Name </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_i = unref(studentInfoStore).form) == null ? void 0 : _i.school_name)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> College Name </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_j = unref(studentInfoStore).form) == null ? void 0 : _j.college_name)}</div></div></div><div class="space-y-3"><div><label class="block text-sm font-medium text-gray-600 mb-1"> University Name </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_k = unref(studentInfoStore).form) == null ? void 0 : _k.university_name)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Madrasah Name </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate(((_l = unref(studentInfoStore).form) == null ? void 0 : _l.madrasah_name) || "N/A")}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Madrasah Study Details </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate(((_m = unref(studentInfoStore).form) == null ? void 0 : _m.madrasah_study_details) || "N/A")}</div></div></div></div></div><div class="mb-8"><h3 class="text-xl font-semibold text-emerald-800 mb-4 border-b border-emerald-200 pb-2"> Additional Information </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div><label class="block text-sm font-medium text-gray-600 mb-1"> Season ID </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate((_n = unref(studentInfoStore).form) == null ? void 0 : _n.season_id)}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Is Recitation </label><div class="p-3 bg-gray-50 rounded-lg flex items-center"><div class="${ssrRenderClass([
        ((_o = unref(studentInfoStore).form) == null ? void 0 : _o.is_recitation) ? "bg-emerald-500" : "bg-gray-400",
        "w-3 h-3 rounded-full mr-2"
      ])}"></div> ${ssrInterpolate(((_p = unref(studentInfoStore).form) == null ? void 0 : _p.is_recitation) ? "Yes" : "No")}</div></div><div><label class="block text-sm font-medium text-gray-600 mb-1"> Need Training </label><div class="p-3 bg-gray-50 rounded-lg">${ssrInterpolate(((_q = unref(studentInfoStore).form) == null ? void 0 : _q.need_training) || "N/A")}</div></div></div></div><div class="bg-emerald-50 rounded-lg p-6"><h3 class="text-lg font-semibold text-emerald-800 mb-4"> Form Information </h3><div class="grid grid-cols-1 md:grid-cols-3 gap-4"><div><span class="block text-sm font-medium text-gray-600"> Form ID </span><span class="text-emerald-800 font-semibold">${ssrInterpolate((_r = unref(studentInfoStore).form) == null ? void 0 : _r.id)}</span></div><div><span class="block text-sm font-medium text-gray-600"> Created At </span><span class="text-emerald-800 font-semibold">${ssrInterpolate(formatDateTime((_s = unref(studentInfoStore).form) == null ? void 0 : _s.created_at))}</span></div><div><span class="block text-sm font-medium text-gray-600"> Updated At </span><span class="text-emerald-800 font-semibold">${ssrInterpolate(formatDateTime((_t = unref(studentInfoStore).form) == null ? void 0 : _t.updated_at))}</span></div></div></div><div class="mt-8 pt-6 border-t border-gray-200">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/profile",
        class: "inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"${_scopeId}></path></svg> Back to Profile `);
          } else {
            return [
              (openBlock(), createBlock("svg", {
                class: "mr-2 w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M15 19l-7-7 7-7"
                })
              ])),
              createTextVNode(" Back to Profile ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/registration/view.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=view-BqbSVHSn.js.map
