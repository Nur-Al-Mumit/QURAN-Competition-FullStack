import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
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
  __name: "view-seat-plan-and-timing",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const error = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pdf-viewer-container mt-56" }, _attrs))} data-v-9efe4f8e>`);
      if (unref(loading)) {
        _push(`<div class="loading-container" data-v-9efe4f8e><div class="loading-spinner" data-v-9efe4f8e></div><p class="loading-text" data-v-9efe4f8e>Loading PDF...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="error-container" data-v-9efe4f8e><div class="error-icon" data-v-9efe4f8e>⚠️</div><p class="error-text" data-v-9efe4f8e>${ssrInterpolate(unref(error))}</p><button class="retry-button" data-v-9efe4f8e>Try Again</button></div>`);
      } else {
        _push(`<div class="pdf-container" data-v-9efe4f8e><iframe src="/assets/pdfs/seat-plan-and-timing-u.pdf" class="pdf-iframe" title="Seat Plan and Timing PDF" frameborder="0" data-v-9efe4f8e></iframe></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/view-seat-plan-and-timing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const viewSeatPlanAndTiming = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-9efe4f8e"]]);
export {
  viewSeatPlanAndTiming as default
};
//# sourceMappingURL=view-seat-plan-and-timing-BEsa2oQn.js.map
