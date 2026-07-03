import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-primary text-white py-12" }, _attrs))}><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><div class="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 rounded-full inline-flex items-center justify-center mb-6"><svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"></path></svg></div><h3 class="text-lg sm:text-2xl font-bold mb-4"> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা ১৪৪৭ হিজরি </h3><p class="mb-8">কুরআনের সাথে সম্পর্ক তৈরি করুন</p><div class="border-t border-white pt-8"><p class="text-sm"> © ২০২৫ বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা। সকল অধিকার সংরক্ষিত। </p></div></div></div></footer>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  __nuxt_component_1 as _
};
//# sourceMappingURL=Footer-CyiV92Ny.js.map
