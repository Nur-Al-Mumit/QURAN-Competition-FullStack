import { _ as _sfc_main$1 } from "./Navbar-B6pw6acn.js";
import { _ as __nuxt_component_1 } from "./Footer-CyiV92Ny.js";
import { useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "./nuxt-link-Cl1STy2k.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "./studentInfo-CyG5HN7S.js";
import "pinia";
import "./competitionForm-ClJDHIES.js";
import "./authenticatedAxios-DoF-q_wg.js";
import "axios";
import "./axios-DBcmg16B.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "./adminAuthenticatedAxios-boaAp65y.js";
import "./menuStore-DjC5MiZx.js";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/radix3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/destr/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ohash/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/klona/dist/index.mjs";
import "deep-pick-omit";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_Navbar = _sfc_main$1;
  const _component_Footer = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(_attrs)}><div class="pb-12">`);
  _push(ssrRenderComponent(_component_Navbar, null, null, _parent));
  _push(`</div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_Footer, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _default as default
};
//# sourceMappingURL=default-CV5GyxJ8.js.map
