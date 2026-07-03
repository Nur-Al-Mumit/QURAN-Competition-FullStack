import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
const _sfc_main = {
  __name: "BaseInput",
  __ssrInlineRender: true,
  props: {
    isPasswordShow: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    slotContainer: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    disable: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
    },
    length: {
      type: [Number, Boolean],
      default: 11
    },
    language: {
      type: String,
      default: "en"
    },
    inputClass: {
      type: String
    }
  },
  emits: ["isValidMobile", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    let password = ref(null);
    let isOpen = ref(false);
    let showWarning = ref(false);
    let eyeSvg = `
              <svg xmlns="http://www.w3.org/2000/svg" width = "20" height = "20" fill = "currentColor" class="bi bi-eye" viewBox = "0 0 16 16" >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            `;
    let eyeCloseSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
    <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
    <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
  </svg>

    `;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><label${ssrRenderAttr("for", __props.label)} class="block pl-1 mb-1 font-semibold text-left">${ssrInterpolate(__props.label)} `);
      if (__props.required) {
        _push(`<span class="text-red-600">*</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</label>`);
      if (unref(showWarning)) {
        _push(`<div class="text-red-600 animate-fade-in-up"> Please enter only Bangla characters. </div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([__props.slotContainer, "relative flex items-center"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`<input${ssrRenderAttrs(mergeProps({
        ref_key: "password",
        ref: password,
        id: __props.label,
        type: __props.type,
        value: __props.modelValue
      }, _ctx.$attrs, {
        disabled: __props.disable,
        required: __props.required,
        placeholder: __props.placeholder,
        class: [
          "w-full px-5 border rounded-lg outline-hidden focus:border-primary base-tran",
          __props.type === "date" ? "py-[11px]" : "py-3",
          __props.inputClass
        ]
      }))}><div class="absolute cursor-pointer right-3">`);
      if (__props.isPasswordShow && !unref(isOpen)) {
        _push(`<div>${unref(eyeSvg) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(isOpen)) {
        _push(`<div>${unref(eyeCloseSvg) ?? ""}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Inputs/BaseInput.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=BaseInput-ZxyR8QLM.js.map
