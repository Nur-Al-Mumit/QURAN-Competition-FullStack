import { ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  __name: "OTP",
  __ssrInlineRender: true,
  props: {
    isIncorrectOTP: {
      type: Boolean,
      default: false
    },
    digits: {
      type: Number,
      default: 4
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    let otpInputs = ref(Array(props.digits).fill(""));
    ref([]);
    let otp = computed(() => otpInputs.value.join(""));
    watch(
      () => otp.value,
      () => {
        emit("update:modelValue", otp.value);
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)} data-v-78dfc5d5><div class="${ssrRenderClass(["flex justify-center", __props.digits === 4 ? "gap-3" : "gap-2"])}" data-v-78dfc5d5><!--[-->`);
      ssrRenderList(unref(otpInputs), (digit, index) => {
        _push(`<input type="number" required maxlength="1"${ssrRenderAttr("value", unref(otpInputs)[index])} class="${ssrRenderClass([
          "border-2 rounded-[12px] text-center font-semibold appearance-none outline-none focus:outline-none",
          __props.isIncorrectOTP ? "text-red-500 border-red-500 focus:border-red-500 bg-white-1" : unref(otpInputs)[index] ? "text-primary border-primary bg-blue-1" : "border-white-5 bg-white-3",
          !__props.isIncorrectOTP ? " focus:border-primary" : "",
          __props.digits === 4 ? "w-16 h-20 text-[40px]" : "w-10 h-12 text-[30px] sm:w-14 sm:h-18 sm:text-[40px]"
        ])}" data-v-78dfc5d5>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Inputs/OTP.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-78dfc5d5"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=OTP-DlPKQZVz.mjs.map
