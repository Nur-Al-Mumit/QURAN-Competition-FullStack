import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useRegisteredFormStore } from './registeredForm-D-3AJ_rW.mjs';
import { _ as _export_sfc } from './server.mjs';
import 'pinia';
import './competitionForm-ClJDHIES.mjs';
import './authenticatedAxios-DoF-q_wg.mjs';
import 'axios';
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
import 'vue-router';
import 'deep-pick-omit';

const _sfc_main = {
  __name: "token",
  __ssrInlineRender: true,
  setup(__props) {
    const registeredFormStore = useRegisteredFormStore();
    ref(null);
    const formatPrintTime = computed(() => {
      const now = /* @__PURE__ */ new Date();
      const day = String(now.getDate()).padStart(2, "0");
      const month = now.toLocaleString("en-US", { month: "short" });
      const year = now.getFullYear();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, "0");
      return `${day} ${month} ${year}, ${hours}:${minutes}`;
    });
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white registration-card sm:p-5 print:p-0" }, _attrs))} data-v-c757212e><div class="relative bg-gradient-to-r from-emerald-50 via-green-50 to-lime-50 rounded-lg p-4 text-emerald-800 print:shadow-none border-2 border-emerald-500" data-v-c757212e><div class="absolute top-2 right-4" data-v-c757212e><div class="bg-white p-1 rounded-lg" data-v-c757212e>`);
      if ((_a = unref(registeredFormStore).registeredForm) == null ? void 0 : _a.reg_no) {
        _push(`<canvas class="border-emerald-600 border w-8 h-8" data-v-c757212e></canvas>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="mb-8" data-v-c757212e><h1 class="text-2xl sm:text-3xl font-bold mb-2 text-emerald-600" data-v-c757212e> Registration Card </h1><div class="h-1 w-32 bg-emerald-500 rounded-full" data-v-c757212e></div></div>`);
      if ((_b = unref(registeredFormStore).registeredForm) == null ? void 0 : _b.phone) {
        _push(`<div class="grid grid-cols-1 lg:grid-cols-2 print:flex gap-4 print:grid-cols-2" data-v-c757212e><div class="space-y-4" data-v-c757212e><div class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300" data-v-c757212e><h2 class="text-xl font-semibold mb-2 text-emerald-600" data-v-c757212e> Personal Information </h2><div class="space-y-1.5" data-v-c757212e><div class="flex items-center gap-2" data-v-c757212e><span class="font-medium w-24 whitespace-nowrap text-emerald-700" data-v-c757212e> Name (EN): </span><span class="text-lg font-bold" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.name_en)}</span></div><div class="flex items-center gap-2" data-v-c757212e><span class="font-medium w-24 whitespace-nowrap text-emerald-700" data-v-c757212e> Name (BN): </span><span class="text-lg font-bold" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.name_bn)}</span></div><div class="flex items-center gap-2" data-v-c757212e><span class="font-medium w-24 whitespace-nowrap text-emerald-700" data-v-c757212e> DOB: </span><span class="font-bold" data-v-c757212e>${ssrInterpolate(formatDate(unref(registeredFormStore).registeredForm.dob))}</span></div><div class="flex items-center gap-2" data-v-c757212e><span class="font-medium w-24 whitespace-nowrap text-emerald-700" data-v-c757212e> Phone: </span><span class="font-bold" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.phone)}</span></div>`);
        if (unref(registeredFormStore).registeredForm.email) {
          _push(`<div class="flex items-center gap-2" data-v-c757212e><span class="font-medium w-24 whitespace-nowrap text-emerald-700" data-v-c757212e> Email: </span><span class="font-bold" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.email)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><div class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300" data-v-c757212e><h3 class="font-semibold mb-2 text-emerald-600 sm:whitespace-nowrap" data-v-c757212e> Educational Background ${ssrInterpolate(unref(registeredFormStore).registeredForm.education_background == 1 ? "General" : unref(registeredFormStore).registeredForm.education_background == 2 ? "Madrasa" : unref(registeredFormStore).registeredForm.education_background == 3 ? "(General + Madrasa)" : "")}</h3><div class="space-y-1.5" data-v-c757212e>`);
        if (unref(registeredFormStore).registeredForm.school_name) {
          _push(`<div data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>School:</span><span class="ml-2" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.school_name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(registeredFormStore).registeredForm.college_name) {
          _push(`<div data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>College:</span><span class="ml-2" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.college_name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(registeredFormStore).registeredForm.university_name) {
          _push(`<div data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>University:</span><span class="ml-2" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.university_name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(registeredFormStore).registeredForm.madrasah_name) {
          _push(`<div data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>Madrasah:</span><span class="ml-2" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.madrasah_name)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><div class="space-y-4 flex-1" data-v-c757212e><div class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300" data-v-c757212e><h2 class="text-xl font-semibold mb-2 text-emerald-600" data-v-c757212e> Registration Details </h2><div class="space-y-1.5" data-v-c757212e><div class="flex items-center" data-v-c757212e><span class="font-medium w-28 text-emerald-700" data-v-c757212e>Reg. No:</span><span class="text-xl font-bold text-emerald-600" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.reg_no)}</span></div><div class="flex items-center" data-v-c757212e><span class="font-medium w-28 text-emerald-700" data-v-c757212e> Season ID: </span><span data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.season_id)}</span></div></div></div><div class="bg-emerald-100/80 rounded-lg p-4 border border-emerald-300" data-v-c757212e><h3 class="font-semibold text-emerald-600 mb-2" data-v-c757212e>Address</h3><p data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.address)}</p><h3 class="font-semibold mt-2 text-emerald-600" data-v-c757212e> Additional Details </h3><div class="space-y-1.5" data-v-c757212e><div data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>Occupation:</span><span class="ml-2" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.occupation)}</span></div><div class="space-y-1.5" data-v-c757212e><div class="flex items-center" data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>Recitation:</span><span class="${ssrRenderClass([
          unref(registeredFormStore).registeredForm.is_recitation ? "bg-emerald-500" : "bg-red-500",
          "ml-2 px-2 py-1 rounded text-xs text-white"
        ])}" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.is_recitation ? "Yes" : "No")}</span></div><div class="flex items-center" data-v-c757212e><span class="font-medium text-emerald-700" data-v-c757212e>Training:</span><span class="${ssrRenderClass([
          unref(registeredFormStore).registeredForm.need_training ? "bg-emerald-500" : "bg-red-500",
          "ml-2 px-2 py-1 rounded text-xs text-white"
        ])}" data-v-c757212e>${ssrInterpolate(unref(registeredFormStore).registeredForm.need_training ? "Needed" : "Not Needed")}</span></div></div></div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-8 pt-4 border-t border-emerald-300" data-v-c757212e><div class="flex justify-between items-center text-sm" data-v-c757212e><div data-v-c757212e><p class="text-emerald-700" data-v-c757212e> Registration Date: ${ssrInterpolate(formatDate((_c = unref(registeredFormStore).registeredForm) == null ? void 0 : _c.created_at))}</p><p class="text-emerald-700" data-v-c757212e> Print Time: <br class="sm:hidden" data-v-c757212e> ${ssrInterpolate(unref(formatPrintTime))}</p></div><div class="text-right" data-v-c757212e><p class="font-semibold text-xl text-emerald-600" data-v-c757212e> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE - \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </p></div></div></div><div class="mt-8 text-center print:hidden" data-v-c757212e><button class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transition duration-200 transform hover:scale-105" data-v-c757212e> Print Registration Card </button></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/registration/token.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const token = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c757212e"]]);

export { token as default };
//# sourceMappingURL=token-CfQ2JB2G.mjs.map
