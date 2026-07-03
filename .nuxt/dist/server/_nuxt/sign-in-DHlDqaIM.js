import { f as useAdminAuthInfoStore, d as __nuxt_component_0 } from "../server.mjs";
import { _ as __nuxt_component_0$1 } from "./nuxt-link-Cl1STy2k.js";
import { ref, mergeProps, withCtx, createTextVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import { u as useMenuStore } from "./menuStore-DjC5MiZx.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
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
  __name: "sign-in",
  __ssrInlineRender: true,
  setup(__props) {
    useMenuStore();
    useAdminAuthInfoStore();
    ref(false);
    ref(false);
    ref({
      email: "",
      phone: null,
      password: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-3 sm:py-8 mt-3" }, _attrs))}><div class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden pb-4"><div class="h-2 bg-emerald-500"></div><div class="mt-2 sm:mt-0 px-4 sm:p-5"><div class="flex justify-center mb-2"><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></div></div><section><div><div class="text-center"><h2 class="font-bold text-[24px] leading-[28px] mb-4 sm:mb-6"> sign in to get started </h2></div><div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="mt-2 sm:mt-4 relative"><div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div><div class="relative flex justify-center"><span class="bg-white px-4 text-sm text-gray-500">or</span></div></div><div class="text-center">`);
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
      _push(`</div></div></div></section></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/(Auth)/sign-in.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=sign-in-DHlDqaIM.js.map
