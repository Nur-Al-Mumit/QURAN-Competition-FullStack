import { _ as _sfc_main$1 } from "./BaseInput-ZxyR8QLM.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-Cl1STy2k.js";
import { ref, mergeProps, unref, withCtx, createTextVNode, createVNode, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { e as useStudentAuthInfoStore } from "../server.mjs";
import "./menuStore-DjC5MiZx.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
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
const _sfc_main = {
  __name: "sign-in",
  __ssrInlineRender: true,
  setup(__props) {
    useStudentAuthInfoStore();
    let isPhoneSignIn = ref(false);
    let isSingUp = ref(false);
    let isDisable = ref(false);
    let studentData = ref({
      email: "",
      phone: null,
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InputsBaseInput = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-3 sm:py-8 mt-3" }, _attrs))}><div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden pb-4"><div class="h-2 bg-emerald-500"></div><div class="mt-2 sm:mt-0 px-4 sm:p-5"><div class="flex justify-center mb-2"><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div></div><section><div><div class="text-center"><h2 class="font-bold text-[24px] leading-[28px] mb-4 sm:mb-6"> Create a account or <br> sign in to get started </h2><p class="text-gray-600 text-sm"> Create an account or sign in. By continuing, you agree to our <a href="" target="_blank" class="text-gray-900 hover:text-black base-tran underline"> Terms of Use </a> and <a href="" target="_blank" class="text-gray-900 hover:text-black base-tran underline"> Privacy Policy </a> . </p></div><div><form class=""><div class="mt-5 sm:mt-10 space-y-2">`);
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        label: "Phone:",
        type: "number",
        required: true,
        modelValue: unref(studentData).phone,
        "onUpdate:modelValue": ($event) => unref(studentData).phone = $event
      }, null, _parent));
      _push(ssrRenderComponent(_component_InputsBaseInput, {
        "is-password-show": true,
        label: "Password:",
        type: "password",
        required: true,
        modelValue: unref(studentData).password,
        "onUpdate:modelValue": ($event) => unref(studentData).password = $event
      }, null, _parent));
      _push(`</div><div><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="gap-10 font-bold border border-gray-400 py-3 px-5 w-full hover:bg-primary hover:text-white hover:cursor-pointer base-trans rounded-sm mt-3 flex justify-center text-black relative"><span class=""> Continue with Phone `);
      if (unref(isPhoneSignIn)) {
        _push(`<span class="absolute right-5">${unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        ) ?? ""}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></button></div><div class="mt-4 text-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-sm text-emerald-600 hover:text-emerald-800 transition-colors duration-200 font-medium text-center",
        to: "/forget-password"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Forgot your password? `);
          } else {
            return [
              createTextVNode(" Forgot your password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></form><div class="mt-2 sm:mt-4 relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div><div class="relative flex justify-center"><span class="bg-white px-4 text-sm text-gray-500">or</span></div></div><div class="mt-2 sm:mt-4 text-center"><p class="text-sm text-gray-600 mb-3"> Don&#39;t have an account yet? </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/sign-up",
        disabled: unref(isDisable),
        class: "inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-medium rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 w-full group relative"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>Create an account</span><div class="absolute right-5"${_scopeId}>`);
            if (!unref(isSingUp)) {
              _push2(`<span${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></span>`);
            } else {
              _push2(`<span${_scopeId}>${unref(getIcons)("sppiner", `w-[20px]`) ?? ""}</span>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("span", null, "Create an account"),
              createVNode("div", { class: "absolute right-5" }, [
                !unref(isSingUp) ? (openBlock(), createBlock("span", { key: 0 }, [
                  (openBlock(), createBlock("svg", {
                    xmlns: "http://www.w3.org/2000/svg",
                    class: "h-5 w-5 ml-2 group-hover:translate-x-1 base-trans",
                    viewBox: "0 0 20 20",
                    fill: "currentColor"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ])) : (openBlock(), createBlock("span", {
                  key: 1,
                  innerHTML: unref(getIcons)("sppiner", `w-[20px]`)
                }, null, 8, ["innerHTML"]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></section></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/(Auth)/sign-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sign-in-O84xsr0K.js.map
