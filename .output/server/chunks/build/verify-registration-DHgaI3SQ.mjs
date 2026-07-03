import { _ as _sfc_main$1 } from './BaseRadio-BncdAuIi.mjs';
import { ref, mergeProps, unref, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderStyle, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';
import { onBeforeRouteLeave } from 'vue-router';

const _sfc_main = {
  __name: "verify-registration",
  __ssrInlineRender: true,
  setup(__props) {
    const regCode = ref("");
    const isScanning = ref(false);
    const isVerifying = ref(false);
    const statusMessage = ref("");
    const statusType = ref("info");
    ref(null);
    const attendanceOptions = [
      { id: 1, name: "Present" },
      { id: 2, name: "Absent" }
    ];
    const participant = ref(null);
    const attendanceStatus = ref(null);
    const isSubmitting = ref(false);
    const formatDate = (date) => {
      if (!date) return "";
      return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    };
    const stopScanner = async () => {
      {
        isScanning.value = false;
      }
    };
    onBeforeRouteLeave(async () => {
      await stopScanner();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_inputs_base_radio = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100" }, _attrs))}><div class="container mx-auto px-4 py-8 max-w-md"><div class="text-center mb-8"><div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 shadow-lg"><svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path></svg></div><h1 class="text-2xl font-bold text-emerald-900 mb-2"> Registration Verification </h1><p class="text-emerald-600">Enter or scan your registration code</p></div><div id="qr-reader" class="relative"></div>`);
      if (!unref(participant)) {
        _push(`<div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"><label class="block text-sm font-semibold text-emerald-700 mb-3"> Registration Code </label><div class="relative"><input${ssrRenderAttr("value", unref(regCode))} type="text" placeholder="Enter your registration code" class="w-full px-4 py-4 border-2 border-emerald-200 rounded-xl focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all duration-200 text-gray-800 font-medium placeholder-emerald-300"><div class="absolute right-3 top-1/2 transform -translate-y-1/2">`);
        if (unref(regCode).trim()) {
          _push(`<svg class="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(participant)) {
        _push(`<div class="space-y-4 mb-6"><button${ssrIncludeBooleanAttr(unref(isScanning)) ? " disabled" : ""} class="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.99c.28 0 .52-.21.52-.5 0-.28-.24-.5-.52-.5H12v3z"></path></svg> ${ssrInterpolate(unref(isScanning) ? "Scanning..." : "Scan QR Code")}</button><div class="flex gap-3"><button${ssrIncludeBooleanAttr(!unref(regCode).trim() || unref(isVerifying)) ? " disabled" : ""} class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isVerifying)) {
          _push(`<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isVerifying) ? "Verifying..." : "Submit")}</span></button><button${ssrIncludeBooleanAttr(!unref(regCode).trim()) ? " disabled" : ""} class="flex-shrink-0 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-200 disabled:cursor-not-allowed"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(participant)) {
        _push(`<div style="${ssrRenderStyle(unref(isScanning) ? null : { display: "none" })}" class="bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-100"><div class="bg-emerald-50 px-4 py-3 border-b border-emerald-100"><div class="flex items-center justify-between"><span class="text-emerald-700 font-semibold">QR Code Scanner</span><button class="text-emerald-600 hover:text-emerald-800 transition-colors"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(participant)) {
        _push(`<div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"><div class="text-center mb-4"><h2 class="text-xl font-bold text-emerald-900"> Participant Details </h2></div><div class="space-y-3"><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700"> Name (EN): </span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).name_en)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700"> Name (BN): </span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).name_bn)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700"> Registration No: </span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).reg_no)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700"> Date of Birth: </span><span class="text-sm text-gray-800">${ssrInterpolate(formatDate(unref(participant).dob))}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700">Phone:</span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).phone)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700">Room:</span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).room_number)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700">Serial:</span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).serial)}</span></div><div class="flex justify-between"><span class="text-sm font-semibold text-emerald-700"> Exam Time: </span><span class="text-sm text-gray-800">${ssrInterpolate(unref(participant).exam_time)}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(participant)) {
        _push(`<div class="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-emerald-100"><label class="block text-sm font-semibold text-emerald-700 mb-3"> Attendance Status </label><div class="flex gap-4 mb-4">`);
        _push(ssrRenderComponent(_component_inputs_base_radio, {
          options: attendanceOptions,
          modelValue: unref(attendanceStatus),
          "onUpdate:modelValue": ($event) => isRef(attendanceStatus) ? attendanceStatus.value = $event : null,
          required: true,
          colors: {
            2: "bg-red-500 text-white border-red-500"
          }
        }, null, _parent));
        _push(`</div><div class="flex gap-3"><button${ssrIncludeBooleanAttr(!unref(attendanceStatus) || unref(isSubmitting)) ? " disabled" : ""} class="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2">`);
        if (unref(isSubmitting)) {
          _push(`<svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span>${ssrInterpolate(unref(isSubmitting) ? "Submitting..." : "Submit Attendance")}</span></button><button class="flex-shrink-0 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"><svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(statusMessage)) {
        _push(`<div class="mt-6"><div class="${ssrRenderClass([
          "p-4 rounded-xl border shadow-sm",
          unref(statusType) === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-700" : unref(statusType) === "error" ? "bg-red-50 border-red-200 text-red-700" : "bg-blue-50 border-blue-200 text-blue-700"
        ])}"><div class="flex items-center gap-3">`);
        if (unref(statusType) === "success") {
          _push(`<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`);
        } else if (unref(statusType) === "error") {
          _push(`<svg class="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="font-medium">${ssrInterpolate(unref(statusMessage))}</span></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/(VOLUNTEER)/verify-registration.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-registration-DHgaI3SQ.mjs.map
