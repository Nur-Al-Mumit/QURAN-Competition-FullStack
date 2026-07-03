import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _sfc_main$1 } from './Navbar-B6pw6acn.mjs';
import { useSSRContext } from 'vue';
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
import './server.mjs';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';
import './studentInfo-CyG5HN7S.mjs';
import './competitionForm-ClJDHIES.mjs';
import './authenticatedAxios-DoF-q_wg.mjs';
import './menuStore-DjC5MiZx.mjs';

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

export { _sfc_main as default };
//# sourceMappingURL=OnlyNav-CJIorHpx.mjs.map
