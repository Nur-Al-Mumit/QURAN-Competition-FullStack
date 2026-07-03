import { ref, watch, nextTick, unref, withCtx, renderSlot, mergeProps, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main$2 = {
  __name: "Backdrop",
  __ssrInlineRender: true,
  props: {
    isAnimating: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["fixed inset-0 bg-black transition-opacity duration-300", [__props.isAnimating ? "opacity-50" : "opacity-0"]]
      }, _attrs))}></section>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Backdrop.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "Container",
  __ssrInlineRender: true,
  props: {
    isAnimating: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({
        class: ["relative w-full max-w-md bg-white rounded-2xl shadow-xl transition-all duration-300", [
          __props.isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        ]]
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/Container.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ["update:isOpen"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isAnimating = ref(false);
    const isModalOpen = ref(false);
    function openModal() {
      isModalOpen.value = true;
      emit("update:isOpen", true);
    }
    const handleClose = () => {
      isAnimating.value = false;
      setTimeout(() => {
        isModalOpen.value = false;
        emit("update:isOpen", false);
      }, 300);
    };
    const handleBackdropClick = () => {
      handleClose();
    };
    watch(
      () => props.isOpen,
      (newValue) => {
        if (newValue) {
          openModal();
          nextTick(() => {
            isAnimating.value = true;
          });
        } else {
          handleClose();
          isAnimating.value = false;
          setTimeout(() => {
            return;
          }, 300);
        }
      },
      { immediate: true }
    );
    __expose({
      handleClose
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ModalBackdrop = _sfc_main$2;
      const _component_ModalContainer = _sfc_main$1;
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(isModalOpen)) {
          _push2(`<div class="fixed inset-0 z-[9999] flex items-center justify-center px-2 sm:px-0 pointer-events-auto">`);
          _push2(ssrRenderComponent(_component_ModalBackdrop, {
            isAnimating: unref(isAnimating),
            onClick: handleBackdropClick,
            class: "z-[9999]"
          }, null, _parent));
          _push2(`<div class="z-[9999] relative">`);
          _push2(ssrRenderComponent(_component_ModalContainer, {
            isAnimating: unref(isAnimating),
            onClick: () => {
            }
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                ssrRenderSlot(_ctx.$slots, "header", {}, null, _push3, _parent2, _scopeId);
                ssrRenderSlot(_ctx.$slots, "body", {}, null, _push3, _parent2, _scopeId);
                ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push3, _parent2, _scopeId);
              } else {
                return [
                  renderSlot(_ctx.$slots, "header"),
                  renderSlot(_ctx.$slots, "body"),
                  renderSlot(_ctx.$slots, "footer")
                ];
              }
            }),
            _: 3
          }, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Modal/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=index-Ctzpa2gy.mjs.map
