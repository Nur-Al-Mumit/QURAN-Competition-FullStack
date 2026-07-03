import { _ as __nuxt_component_0 } from './nuxt-link-Cl1STy2k.mjs';
import { mergeProps, unref, withCtx, createTextVNode, createBlock, openBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { u as useStudentInfoStore } from './studentInfo-CyG5HN7S.mjs';
import { u as useHead } from './v3-gEMt0CXe.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
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
import './competitionForm-ClJDHIES.mjs';
import './authenticatedAxios-DoF-q_wg.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const studentInfoStore = useStudentInfoStore();
    const getInitials = (name) => {
      return name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();
    };
    const getGenderText = (gender) => {
      return gender === 1 ? "Male" : "Female";
    };
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    useHead({
      title: "User Profile"
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white py-8 rounded-2xl shadow-xl" }, _attrs))}><div class="p-6"><div class="flex items-center mb-6"><div class="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">`);
      if ((_a = unref(studentInfoStore).user) == null ? void 0 : _a.name_en) {
        _push(`<span class="text-2xl font-bold text-white">${ssrInterpolate(getInitials((_b = unref(studentInfoStore).user) == null ? void 0 : _b.name_en))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="ml-4"><h2 class="text-2xl font-semibold text-gray-900">${ssrInterpolate((_c = unref(studentInfoStore).user) == null ? void 0 : _c.name_en)}</h2><p class="text-lg text-emerald-600">${ssrInterpolate((_d = unref(studentInfoStore).user) == null ? void 0 : _d.name_bn)}</p></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-4"><h3 class="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2"> Personal Information </h3><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">User ID:</span><span class="text-gray-900">${ssrInterpolate((_e = unref(studentInfoStore).user) == null ? void 0 : _e.id)}</span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Phone:</span><span class="text-gray-900">${ssrInterpolate((_f = unref(studentInfoStore).user) == null ? void 0 : _f.phone)}</span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Email:</span><span class="text-gray-900">${ssrInterpolate((_g = unref(studentInfoStore).user) == null ? void 0 : _g.email)}</span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Gender:</span><span class="text-gray-900">${ssrInterpolate(getGenderText((_h = unref(studentInfoStore).user) == null ? void 0 : _h.gender))}</span></div></div><div class="space-y-4"><h3 class="text-lg font-semibold text-emerald-800 border-b border-emerald-200 pb-2"> Account Information </h3><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Phone Verified:</span><span class="flex items-center"><div class="w-3 h-3 bg-emerald-500 rounded-full mr-2"></div><span class="text-emerald-600 font-medium">Verified</span></span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Verified At:</span><span class="text-gray-900">${ssrInterpolate(formatDate((_i = unref(studentInfoStore).user) == null ? void 0 : _i.phone_verified_at))}</span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Created:</span><span class="text-gray-900">${ssrInterpolate((_j = unref(studentInfoStore).user) == null ? void 0 : _j.created_at)}</span></div><div class="flex justify-between items-center py-2"><span class="font-medium text-gray-600">Last Updated:</span><span class="text-gray-900">${ssrInterpolate((_k = unref(studentInfoStore).user) == null ? void 0 : _k.updated_at)}</span></div></div></div><div class="mt-8 pt-6 border-t border-gray-200">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/registration/view",
        class: "inline-flex items-center px-6 py-3 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition-colors duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View Registration Details <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
          } else {
            return [
              createTextVNode(" View Registration Details "),
              (openBlock(), createBlock("svg", {
                class: "ml-2 w-4 h-4",
                fill: "none",
                stroke: "currentColor",
                viewBox: "0 0 24 24"
              }, [
                createVNode("path", {
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  "stroke-width": "2",
                  d: "M9 5l7 7-7 7"
                })
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DQ3coFQX.mjs.map
