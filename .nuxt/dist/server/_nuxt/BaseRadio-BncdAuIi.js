import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseEqual } from "vue/server-renderer";
const _sfc_main = {
  __name: "BaseRadio",
  __ssrInlineRender: true,
  props: {
    options: {
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ""
    },
    colors: {
      type: Object,
      default: () => ({})
      // { [id]: "bg-red-500 text-white border-red-500" }
    }
  },
  setup(__props) {
    const props = __props;
    let selectedOptionId = ref(props.modelValue);
    const selectedColorClass = (id) => {
      return props.colors[id] || "bg-primary text-white border-primary";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<label class="cursor-pointer"><input type="radio"${ssrRenderAttr("value", option.id)}${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedOptionId), option.id)) ? " checked" : ""} class="hidden"><div class="${ssrRenderClass([[
          unref(selectedOptionId) === option.id ? selectedColorClass(option.id) : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-primary hover:text-white"
        ], "px-4 py-2 rounded-full text-sm font-bold border-2 cursor-pointer base-trans"])}">${ssrInterpolate(option.name)}</div></label>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Inputs/BaseRadio.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
//# sourceMappingURL=BaseRadio-BncdAuIi.js.map
