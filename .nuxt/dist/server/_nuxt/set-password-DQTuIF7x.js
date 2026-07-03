import { _ as _sfc_main$1 } from "./BaseInput-ZxyR8QLM.js";
import { ref, computed, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { g as useRoute } from "../server.mjs";
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
  __name: "set-password",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    let isLoading = ref(false);
    let isDisable = ref(false);
    let passwordResetSuccess = ref(false);
    let userData = ref({
      password: "",
      confirmPassword: "",
      token: route.query.token || ""
    });
    let passwordRequirements = ref({
      minLength: false,
      hasUppercase: false,
      hasNumberOrSpecial: false
    });
    const passwordMatchError = computed(() => {
      if (userData.value.password && userData.value.confirmPassword) {
        return userData.value.password !== userData.value.confirmPassword ? "Passwords don't match" : "";
      }
      return "";
    });
    const isPasswordValid = computed(() => {
      return passwordRequirements.value.minLength && passwordRequirements.value.hasUppercase && passwordRequirements.value.hasNumberOrSpecial && passwordMatchError.value === "" && userData.value.password && userData.value.confirmPassword;
    });
    function validatePassword() {
      const password = userData.value.password;
      passwordRequirements.value = {
        minLength: password.length >= 8,
        hasUppercase: /[A-Z]/.test(password),
        hasNumberOrSpecial: /[0-9!@#$%^&*]/.test(password)
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputsBaseInput = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gray-50 p-4" }, _attrs))}><div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"><div class="h-2 bg-emerald-500"></div><div class="p-6 sm:p-8"><div class="flex justify-center mb-6"><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg></div></div><section><div><div class="text-center"><h2 class="font-bold text-2xl mb-5">Create new password</h2><p class="text-gray-600 text-sm mb-6"> Your new password must be different from previous used passwords. </p></div><div><form class=""><div class="mt-6 space-y-4">`);
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        "is-password-show": true,
        label: "New Password",
        type: "password",
        required: true,
        modelValue: unref(userData).password,
        "onUpdate:modelValue": ($event) => unref(userData).password = $event,
        placeholder: "Enter new password",
        onInput: validatePassword
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        "is-password-show": true,
        label: "Confirm Password",
        type: "password",
        required: true,
        modelValue: unref(userData).confirmPassword,
        "onUpdate:modelValue": ($event) => unref(userData).confirmPassword = $event,
        placeholder: "Confirm new password",
        onInput: validatePassword
      }, null, _parent));
      _push(`</div><div class="mt-1"><ul class="text-xs space-y-1 list-disc pl-5"><li class="${ssrRenderClass(
        unref(passwordRequirements).minLength ? "text-emerald-600" : "text-red-500"
      )}"> Minimum 8 characters </li><li class="${ssrRenderClass(
        unref(passwordRequirements).hasUppercase ? "text-emerald-600" : "text-red-500"
      )}"> At least one uppercase letter </li><li class="${ssrRenderClass(
        unref(passwordRequirements).hasNumberOrSpecial ? "text-emerald-600" : "text-red-500"
      )}"> At least one number or special character </li><li class="${ssrRenderClass(
        unref(passwordMatchError) === "" && unref(userData).confirmPassword ? "text-emerald-600" : "text-red-500"
      )}"> Passwords match </li></ul></div><div><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable) || !unref(isPasswordValid)) ? " disabled" : ""} class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-6 flex justify-center text-black disabled:opacity-50 disabled:cursor-not-allowed relative"><span class=""> Reset Password `);
      if (unref(isLoading)) {
        _push(`<span class="absolute right-5">${unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        ) ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></button></div></form>`);
      if (unref(passwordResetSuccess)) {
        _push(`<section class="mt-6"><div class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded text-center"><p>Password reset successfully!</p></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/(Auth)/set-password.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=set-password-DQTuIF7x.js.map
