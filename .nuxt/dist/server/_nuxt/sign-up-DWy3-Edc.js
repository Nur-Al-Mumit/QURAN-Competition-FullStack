import { ref, mergeProps, unref, useSSRContext, watch, isRef, createVNode, resolveDynamicComponent } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderVNode, ssrRenderList, ssrRenderClass } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { u as useStudentAuthStore } from "./studentAuth-ZeK5cdiv.js";
import { _ as _sfc_main$3 } from "./BaseInput-ZxyR8QLM.js";
import { _ as __nuxt_component_0 } from "./OTP-DlPKQZVz.js";
import { _ as _export_sfc, n as navigateTo } from "../server.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "pinia";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
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
const _sfc_main$2 = {
  __name: "SignUpStage1",
  __ssrInlineRender: true,
  setup(__props) {
    const studentAuthStore = useStudentAuthStore();
    let isDisable = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputsBaseInput = _sfc_main$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-white" }, _attrs))}><div class="relative"><div class="text-center"><h2 class="font-bold text-[22px] leading-[24px] mb-4 sm:mb-6"> Create a account </h2></div><div class="mt-6 sm:mt-10"><form class=""><div class="space-y-[10px]">`);
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        required: true,
        type: "name",
        label: "Name:",
        modelValue: unref(studentAuthStore).signUp.name,
        "onUpdate:modelValue": ($event) => unref(studentAuthStore).signUp.name = $event,
        "input-class": "font-bold border-gray-400 py-3 px-5 rounded-sm!"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        required: true,
        type: "number",
        label: "Phone:",
        modelValue: unref(studentAuthStore).signUp.phone,
        "onUpdate:modelValue": ($event) => unref(studentAuthStore).signUp.phone = $event,
        "input-class": "font-bold border-gray-400 py-3 px-5 rounded-sm!"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        type: "email",
        label: "Email:",
        modelValue: unref(studentAuthStore).signUp.email,
        "onUpdate:modelValue": ($event) => unref(studentAuthStore).signUp.email = $event,
        "input-class": "font-bold border-gray-400 py-3 px-5 rounded-sm!"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        required: true,
        "is-password-show": true,
        type: "password",
        label: "Password:",
        modelValue: unref(studentAuthStore).signUp.password,
        "onUpdate:modelValue": ($event) => unref(studentAuthStore).signUp.password = $event,
        "input-class": "font-bold border-gray-400 py-3 px-5 rounded-sm!"
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        required: true,
        "is-password-show": true,
        type: "password",
        label: "Confirm Password:",
        modelValue: unref(studentAuthStore).signUp.password_confirmation,
        "onUpdate:modelValue": ($event) => unref(studentAuthStore).signUp.password_confirmation = $event,
        "input-class": "font-bold border-gray-400 py-3 px-5 rounded-sm! "
      }, null, _parent));
      _push(`</div><div><div class="mt-3"><p class="leading-[19px]"> By continuing, you agree to our <a href="" target="_blank" class="text-black underline"> Terms of Use </a> and <a href="" target="_blank" class="text-black underline"> Privacy Policy </a> . </p></div><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-black hover:text-white base-trans rounded-sm mt-5 flex justify-center"><div class="relative"> Continue `);
      if (unref(isDisable)) {
        _push(`<span class="absolute ml-2">${unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        ) ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></button></div></form></div></div></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth/SignUp/Student/SignUpStage1.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "SignUpStage2",
  __ssrInlineRender: true,
  setup(__props) {
    useStudentAuthStore();
    let otp = ref(null);
    let isIncorrectOTP = ref(false);
    let isDisable = ref(false);
    let isOtpSend = ref(false);
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
      console.log(isOTPMatched, "isOTPMatched");
      if (isOTPMatched) {
        setTimeout(() => {
          isOtpSend.value = false;
          isIncorrectOTP.value = false;
          navigateTo("/");
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
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-c8276b94><div class="relative" data-v-c8276b94><div data-v-c8276b94><form class="" data-v-c8276b94><div data-v-c8276b94><p class="text-center font-bold text-[22px] leading-[24px] mb-8" data-v-c8276b94> Enter Your OTP </p>`);
      _push(ssrRenderComponent(_component_InputsOTP, {
        modelValue: unref(otp),
        "onUpdate:modelValue": ($event) => isRef(otp) ? otp.value = $event : otp = $event,
        isIncorrectOTP: unref(isIncorrectOTP)
      }, null, _parent));
      _push(`</div><div class="text-center mt-8" data-v-c8276b94><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="gap-10 font-bold border border-primary py-3 px-5 w-full hover:bg-primary hover:text-white base-trans rounded-sm flex justify-center relative cursor-pointer" data-v-c8276b94><span data-v-c8276b94>Sign Up</span>`);
      if (unref(isDisable)) {
        _push(`<span class="absolute right-5" data-v-c8276b94>${unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        ) ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><div class="my-3 text-center hover:text-black base-trans" data-v-c8276b94><a class="cursor-pointer hover:text-primary base-trans hover:underline" data-v-c8276b94> I didn&#39;t receive a code </a></div></form></div></div>`);
      if (unref(isOtpSend)) {
        _push(`<section class="flex items-center justify-center bg-[#2F323133] min-h-screen fixed top-0 bottom-0 left-0 right-0 z-50" data-v-c8276b94><section class="text-center p-5 rounded-[19.2px] font-sans font-semibold" data-v-c8276b94><span class="flex justify-center" data-v-c8276b94>${unref(getIcons)("iso-loader-spinner-white") ?? ""}</span></section></section>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Auth/SignUp/Student/SignUpStage2.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SignUpStage2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c8276b94"]]);
const _sfc_main = {
  __name: "sign-up",
  __ssrInlineRender: true,
  setup(__props) {
    const studentAuthStore = useStudentAuthStore();
    const SignUpStages = {
      SignUpStage1: _sfc_main$2,
      SignUpStage2
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-[60vh] sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-4" }, _attrs))}><div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"><div class="h-2 bg-emerald-500"></div><div class="mt-2 sm:mt-0 px-4 sm:p-5"><div class="relative"><button class="flex items-center gap-2 absolute -top-1 left-0 cursor-pointer hover:-translate-x-1 base-trans hover:text-primary"><span>${unref(getIcons)(
        "right-arrow",
        `transition-transform duration-300 w-[40px]`
      ) ?? ""}</span></button></div><div class="flex justify-center mb-4"><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div></div>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(SignUpStages["SignUpStage" + unref(studentAuthStore).signUpStage]), null, null), _parent);
      _push(`<div class="mb-4 sm:mb-0 mt-4 flex justify-center space-x-2"><!--[-->`);
      ssrRenderList(2, (n) => {
        _push(`<div class="${ssrRenderClass([{
          "bg-emerald-500": unref(studentAuthStore).signUpStage === n,
          "bg-gray-200": unref(studentAuthStore).signUpStage !== n
        }, "h-1.5 w-1.5 rounded-full"])}"></div>`);
      });
      _push(`<!--]--></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/(Auth)/sign-up.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sign-up-DWy3-Edc.js.map
