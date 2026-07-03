import { mergeProps, unref, createVNode, resolveDynamicComponent, ref, watch, isRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderVNode, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as getIcons } from './icon-Cav00vLi.mjs';
import { u as useStudentAuthStore } from './studentAuth-ZeK5cdiv.mjs';
import { _ as _sfc_main$3 } from './BaseInput-ZxyR8QLM.mjs';
import { _ as __nuxt_component_0 } from './OTP-DlPKQZVz.mjs';
import { n as navigateTo } from './server.mjs';
import 'pinia';
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
import 'axios';

const _sfc_main$2 = {
  __name: "ForgetPasswordStage1",
  __ssrInlineRender: true,
  setup(__props) {
    useStudentAuthStore();
    let isLoading = ref(false);
    let isDisable = ref(false);
    let resetLinkSent = ref(false);
    let studentData = ref({
      phone: null
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_InputsBaseInput = _sfc_main$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div><div class="p-5"><section><div><div class="text-center"><h2 class="font-bold text-2xl mb-5">Reset your password</h2><p class="text-gray-600 text-sm mb-6"> Enter your phone number and we&#39;ll send you a OTP to reset your password. </p></div><div><form class=""><div class="mt-6">`);
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        label: "Phone Number:",
        type: "number",
        required: true,
        modelValue: unref(studentData).phone,
        "onUpdate:modelValue": ($event) => unref(studentData).phone = $event,
        placeholder: "Enter your registered phone number"
      }, null, _parent));
      _push(`</div><div><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-6 flex justify-center text-black relative"><span> Continue `);
      if (unref(isLoading)) {
        _push(`<span class="absolute right-5">${(_a = unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        )) != null ? _a : ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></button></div></form>`);
      if (unref(resetLinkSent)) {
        _push(`<section class="mt-6"><div class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded"><p> Password reset link has been sent to your email if an account exists. </p></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "ForgetPasswordStage2",
  __ssrInlineRender: true,
  setup(__props) {
    useStudentAuthStore();
    let isIncorrectOTP = ref(false);
    let isOtpSend = ref(false);
    let otp = ref(null);
    const logInWithOtp = async (otp2) => {
      if (otp2 == 1234) {
        return true;
      } else {
        return false;
      }
    };
    async function matchOTP() {
      isOtpSend.value = true;
      let isOTPMatched = await logInWithOtp(otp.value);
      if (isOTPMatched) {
        setTimeout(() => {
          isOtpSend.value = false;
          isIncorrectOTP.value = false;
          navigateTo("/set-password");
        }, 700);
      } else {
        setTimeout(() => {
          isOtpSend.value = false;
          isIncorrectOTP.value = true;
        }, 700);
      }
    }
    watch(
      () => otp.value,
      () => {
        isIncorrectOTP.value = false;
        if (otp.value.length === 4) {
          matchOTP();
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputsOTP = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(_attrs)}><p class="text-center mb-8">Enter Your OTP</p><form class="mt-[48px] px-5">`);
      _push(ssrRenderComponent(_component_InputsOTP, {
        modelValue: unref(otp),
        "onUpdate:modelValue": ($event) => isRef(otp) ? otp.value = $event : otp = $event,
        isIncorrectOTP: unref(isIncorrectOTP)
      }, null, _parent));
      _push(`</form><p class="mt-10 text-[15px] leading-[24px] text-center font-sans font-normal"> Didn\u2019t get the OTP? <br> Check your spam. </p><div class="grid place-content-center pt-2"><button class="text-blue-2 text-[15px] leading-[24px] font-bold font-sans text-primary hover:text-primary-hover base-trans cursor-pointer"> Resend code </button></div>`);
      if (unref(isOtpSend)) {
        _push(`<section class="flex items-center justify-center bg-[#2F323133] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50"><section class="text-center bg-white-3 border-2 border-white-1 p-5 rounded-[19.2px] font-sans font-semibold"></section></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "forget-password",
  __ssrInlineRender: true,
  setup(__props) {
    const studentAuthStore = useStudentAuthStore();
    const ForgetPasswordStages = {
      ForgetPasswordStage1: _sfc_main$2,
      ForgetPasswordStage2: _sfc_main$1
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-[70vh] sm:min-h-screen flex items-center justify-center bg-gray-50 p-4" }, _attrs))}><div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"><div class="h-2 bg-emerald-500"></div><div class="p-5 pb-0"><div class="relative"><button class="flex items-center gap-2 absolute -top-1 left-0 cursor-pointer hover:-translate-x-1 base-trans hover:text-primary"><span>${(_a = unref(getIcons)(
        "right-arrow",
        `transition-transform duration-300 w-[40px]`
      )) != null ? _a : ""}</span></button></div><div class="flex justify-center"><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg></div></div></div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(
        ForgetPasswordStages["ForgetPasswordStage" + unref(studentAuthStore).forgetPasswordStage]
      ), null, null), _parent);
      _push(`<div class="my-6 flex justify-center space-x-2"><!--[-->`);
      ssrRenderList(2, (n) => {
        _push(`<div class="${ssrRenderClass([{
          "bg-emerald-500": unref(studentAuthStore).forgetPasswordStage === n,
          "bg-gray-200": unref(studentAuthStore).forgetPasswordStage !== n
        }, "h-1.5 w-1.5 rounded-full"])}"></div>`);
      });
      _push(`<!--]--></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/(Auth)/forget-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forget-password-ylkQHWdM.mjs.map
