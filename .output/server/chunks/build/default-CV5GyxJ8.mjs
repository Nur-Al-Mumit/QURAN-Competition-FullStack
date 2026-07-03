import { _ as _sfc_main$1 } from './Navbar-B6pw6acn.mjs';
import { _ as __nuxt_component_1 } from './Footer-CyiV92Ny.mjs';
import { useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './nuxt-link-Cl1STy2k.mjs';
import './studentInfo-CyG5HN7S.mjs';
import 'pinia';
import './competitionForm-ClJDHIES.mjs';
import './authenticatedAxios-DoF-q_wg.mjs';
import 'axios';
import './menuStore-DjC5MiZx.mjs';
import 'vue-router';
import 'deep-pick-omit';

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

export { _default as default };
//# sourceMappingURL=default-CV5GyxJ8.mjs.map
