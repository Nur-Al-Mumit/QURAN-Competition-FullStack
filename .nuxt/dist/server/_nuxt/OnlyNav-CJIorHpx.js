import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _sfc_main$1 } from "./Navbar-B6pw6acn.js";
import { useSSRContext } from "vue";
import "./nuxt-link-Cl1STy2k.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
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
import "./studentInfo-CyG5HN7S.js";
import "./competitionForm-ClJDHIES.js";
import "./authenticatedAxios-DoF-q_wg.js";
import "./axios-DBcmg16B.js";
import "./adminAuthenticatedAxios-boaAp65y.js";
import "./menuStore-DjC5MiZx.js";
const _sfc_main = {
  __name: "OnlyNav",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="pb-16">`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/OnlyNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=OnlyNav-CJIorHpx.js.map
