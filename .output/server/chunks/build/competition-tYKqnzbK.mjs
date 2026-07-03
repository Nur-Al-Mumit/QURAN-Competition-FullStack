import { _ as _sfc_main$1 } from './BaseInput-ZxyR8QLM.mjs';
import { _ as _sfc_main$2 } from './BaseRadio-BncdAuIi.mjs';
import { _ as _sfc_main$3 } from './index-Ctzpa2gy.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, isRef, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as getIcons } from './icon-Cav00vLi.mjs';
import { e as useStudentAuthInfoStore } from './server.mjs';
import { u as useCompetitionFormStore } from './competitionForm-ClJDHIES.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'pinia';
import 'vue-router';
import 'deep-pick-omit';
import 'axios';

const _sfc_main = {
  __name: "competition",
  __ssrInlineRender: true,
  setup(__props) {
    const { isStudentLoggedIn } = useStudentAuthInfoStore();
    const useFormStore = useCompetitionFormStore();
    const educationOptions = [
      { id: 1, title: "general", name: "\u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u09B2" },
      { id: 2, title: "madrasah", name: "\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE" },
      { id: 3, title: "both", name: "\u0989\u09AD\u09AF\u09BC" }
    ];
    const yesNoOptions = [
      { id: 1, name: "\u09B9\u09CD\u09AF\u09BE\u0981" },
      { id: null, name: "\u09A8\u09BE" }
    ];
    let isModalOpen = ref(false);
    let isTrainingModalOpen = ref(false);
    let isRecitationModalOpen = ref(false);
    let isDisable = ref(false);
    let isFormSubmit = ref(false);
    const maxDob = computed(() => {
      const date = /* @__PURE__ */ new Date("2025-07-21");
      date.setFullYear(date.getFullYear() - 16);
      return date.toISOString().split("T")[0];
    });
    const dobError = computed(() => {
      if (!useFormStore.form.dob) return false;
      const selectedDate = new Date(useFormStore.form.dob);
      const cutoffDate = /* @__PURE__ */ new Date("2025-07-21");
      cutoffDate.setFullYear(cutoffDate.getFullYear() - 16);
      return selectedDate > cutoffDate;
    });
    watch(
      () => useFormStore.form.education_background,
      (newValue) => {
        if (newValue === 2 || newValue === 3) {
          isModalOpen.value = true;
        }
      }
    );
    watch(
      () => useFormStore.form.is_recitation,
      (newValue) => {
        if (newValue === null) {
          isRecitationModalOpen.value = true;
        }
      }
    );
    watch(
      () => useFormStore.form.need_training,
      (newValue) => {
        if (newValue === 1) {
          isTrainingModalOpen.value = true;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_inputs_base_input = _sfc_main$1;
      const _component_inputs_base_radio = _sfc_main$2;
      const _component_modal = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sm:max-w-3xl mx-auto px-4 py-8" }, _attrs))}><h1 class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE - \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </h1><h1 class="text-lg sm:text-xl font-bold text-center mb-6"> \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09AB\u09B0\u09CD\u09AE </h1><form><div class="space-y-4"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">`);
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "\u09A8\u09BE\u09AE (\u09AC\u09BE\u0982\u09B2\u09BE\u09DF):",
        placeholder: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BE\u09AE",
        modelValue: unref(useFormStore).form.name_bn,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.name_bn = $event,
        required: true
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "\u09A8\u09BE\u09AE (\u0987\u0982\u09B0\u09C7\u099C\u09BF\u09A4\u09C7):",
        placeholder: "Your Name",
        modelValue: unref(useFormStore).form.name_en,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.name_en = $event,
        required: true
      }, null, _parent));
      _push(`<div class="relative">`);
      _push(ssrRenderComponent(_component_inputs_base_input, {
        modelValue: unref(useFormStore).form.dob,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.dob = $event,
        required: true,
        label: "\u099C\u09A8\u09CD\u09AE \u09A4\u09BE\u09B0\u09BF\u0996:",
        placeholder: "\u0986\u09AA\u09A8\u09BE\u09B0 \u099C\u09A8\u09CD\u09AE \u09A4\u09BE\u09B0\u09BF\u0996",
        type: "date",
        max: unref(maxDob)
      }, null, _parent));
      if (unref(dobError)) {
        _push(`<p class="text-red-500 text-sm mt-1"> \u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09DF\u09B8 \u09E7 \u099C\u09C1\u09B2\u09BE\u0987 \u09E8\u09E6\u09E8\u09EB \u098F\u09B0 \u09B9\u09BF\u09B8\u09C7\u09AC\u09C7 \u0995\u09AE\u09AA\u0995\u09CD\u09B7\u09C7 \u09E7\u09EC \u09AC\u099B\u09B0 \u09B9\u09A4\u09C7 \u09B9\u09AC\u09C7\u0964 </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_inputs_base_input, {
        required: true,
        type: "number",
        label: "\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A8\u09AE\u09CD\u09AC\u09B0:",
        modelValue: unref(useFormStore).form.phone,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.phone = $event,
        placeholder: "\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A8\u09BE\u09AE\u09CD\u09AC\u09BE\u09B0"
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        type: "email",
        label: "\u0987\u09AE\u09C7\u0987\u09B2:",
        modelValue: unref(useFormStore).form.email,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.email = $event,
        placeholder: "example@domain.com"
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        modelValue: unref(useFormStore).form.occupation,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.occupation = $event,
        required: true,
        placeholder: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09AA\u09C7\u09B6\u09BE",
        label: "\u09AA\u09C7\u09B6\u09BE:"
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "\u09A0\u09BF\u0995\u09BE\u09A8\u09BE:",
        placeholder: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
        modelValue: unref(useFormStore).form.address,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.address = $event,
        class: "w-full sm:col-span-2",
        required: true
      }, null, _parent));
      _push(`</div><div class="flex justify-center items-center flex-col"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> \u09B6\u09BF\u0995\u09CD\u09B7\u09BE\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF </h2>`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: educationOptions,
        modelValue: unref(useFormStore).form.education_background,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.education_background = $event,
        colors: {
          2: "bg-red-500 text-white border-red-500",
          3: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div>`);
      if (unref(useFormStore).form.education_background === 2 || unref(useFormStore).form.education_background === 3) {
        _push(`<div class="space-y-2 sm:space-y-4"><h2 class="font-semibold text-center text-red-500"> \u0986\u09AA\u09A8\u09BF \u09AF\u09A6\u09BF \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE \u09AC\u09CD\u09AF\u09BE\u0995\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09AD\u09BE\u09AC\u09C7 \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 \u09A4\u09AC\u09C7 \u09AF\u09A6\u09BF \u0986\u09AA\u09A8\u09BF \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09A1\u09BC\u09BE \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09AF\u09BC \u09B6\u09BF\u0996\u09C7 \u09A8\u09BE \u09A5\u09BE\u0995\u09C7\u09A8, \u09AC\u09BE \u0985\u09A8\u09CD\u09AF \u0995\u09BE\u09B0\u09A3\u09C7 \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09C1\u0995\u09CD\u09A4 \u099B\u09BF\u09B2\u09C7\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09AC\u09BF\u09B7\u09AF\u09BC\u099F\u09BF \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AC\u09C7\u0964 \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u09AC\u09BF\u09AC\u09C7\u099A\u09A8\u09BE\u09AF\u09BC \u0986\u09AA\u09A8\u09BF \u0989\u09AA\u09AF\u09C1\u0995\u09CD\u09A4 \u09B9\u09B2\u09C7 \u098F\u09B8\u098F\u09AE\u098F\u09B8 \u09AC\u09BE \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u099C\u09BE\u09A8\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7\u0964 </h2><h2 class="font-semibold">\u0986\u09AA\u09A8\u09BE\u09B0 \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09A4\u09A5\u09CD\u09AF:</h2>`);
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.madrasah_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.madrasah_name = $event,
          type: "text",
          label: "\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09A8\u09BE\u09AE:",
          placeholder: "\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09A8\u09BE\u09AE",
          required: true,
          class: "w-full"
        }, null, _parent));
        _push(`<h3 class="pl-1 mb-1 font-semibold text-left"> \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4: <span class="text-red-600">*</span></h3><textarea required placeholder="\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09DF \u0986\u09AA\u09A8\u09BF \u0995\u09C0 \u09AA\u09DC\u09C7\u099B\u09C7\u09A8 \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u09B2\u09BF\u0996\u09C1\u09A8..." class="w-full px-5 border rounded-lg outline-hidden focus:border-primary base-tran py-2 focus:outline-none">${ssrInterpolate(unref(useFormStore).form.madrasah_study_details)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(useFormStore).form.education_background === 1 || unref(useFormStore).form.education_background === 3) {
        _push(`<div class="space-y-2"><h2 class="font-semibold">\u0986\u09AA\u09A8\u09BE\u09B0 \u09B6\u09BF\u0995\u09CD\u09B7\u09BE \u09AA\u09CD\u09B0\u09A4\u09BF\u09B7\u09CD\u09A0\u09BE\u09A8\u09B8\u09AE\u09C2\u09B9\u09C7\u09B0 \u09A8\u09BE\u09AE:</h2>`);
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.school_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.school_name = $event,
          type: "text",
          label: "\u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09A8\u09BE\u09AE:",
          placeholder: "\u09B8\u09CD\u0995\u09C1\u09B2\u09C7\u09B0 \u09A8\u09BE\u09AE",
          required: true
        }, null, _parent));
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.college_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.college_name = $event,
          type: "text",
          label: "\u0995\u09B2\u09C7\u099C\u09C7\u09B0 \u09A8\u09BE\u09AE:",
          placeholder: "\u0995\u09B2\u09C7\u099C\u09C7\u09B0 \u09A8\u09BE\u09AE",
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.university_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.university_name = $event,
          type: "text",
          label: "\u09AD\u09BE\u09B0\u09CD\u09B8\u09BF\u099F\u09BF\u09B0 \u09A8\u09BE\u09AE:",
          placeholder: "\u09AD\u09BE\u09B0\u09CD\u09B8\u09BF\u099F\u09BF\u09B0 \u09A8\u09BE\u09AE",
          class: "w-full"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid place-items-center gap-4 pt-4"><div><h2 class="font-semibold mb-2"> \u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09A4\u09C7\u09B2\u09BE\u0993\u09AF\u09BC\u09BE\u09A4 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8? </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: yesNoOptions,
        modelValue: unref(useFormStore).form.is_recitation,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.is_recitation = $event,
        colors: {
          null: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div></div><div><h2 class="font-semibold mb-2"> \u0986\u09AA\u09A8\u09BF \u0995\u09BF \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0\u09C7\u09B0 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u09C7 \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u099A\u09BE\u09A8? </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: yesNoOptions,
        modelValue: unref(useFormStore).form.need_training,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.need_training = $event
      }, null, _parent));
      _push(`</div></div></div></div><div class="text-center py-6 mt-10"><button${ssrIncludeBooleanAttr(unref(isDisable) || unref(dobError)) ? " disabled" : ""} class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group relative cursor-pointer w-full"><span>\u09B8\u09BE\u09AC\u09AE\u09BF\u099F \u0995\u09B0\u09C1\u09A8</span><div class="absolute right-5">`);
      if (!unref(isFormSubmit)) {
        _push(`<span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span>`);
      } else {
        _push(`<span>${(_a = unref(getIcons)("sppiner", `w-[20px]`)) != null ? _a : ""}</span>`);
      }
      _push(`</div></button></div></form>`);
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> \u0986\u09AA\u09A8\u09BF \u09AF\u09A6\u09BF \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE \u09AC\u09CD\u09AF\u09BE\u0995\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09AD\u09BE\u09AC\u09C7 \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 \u09A4\u09AC\u09C7 \u09AF\u09A6\u09BF \u0986\u09AA\u09A8\u09BF \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09A1\u09BC\u09BE \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09AF\u09BC \u09B6\u09BF\u0996\u09C7 \u09A8\u09BE \u09A5\u09BE\u0995\u09C7\u09A8, \u09AC\u09BE \u0985\u09A8\u09CD\u09AF \u0995\u09BE\u09B0\u09A3\u09C7 \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09C1\u0995\u09CD\u09A4 \u099B\u09BF\u09B2\u09C7\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09AC\u09BF\u09B7\u09AF\u09BC\u099F\u09BF \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AC\u09C7\u0964 \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u09AC\u09BF\u09AC\u09C7\u099A\u09A8\u09BE\u09AF\u09BC \u0986\u09AA\u09A8\u09BF \u0989\u09AA\u09AF\u09C1\u0995\u09CD\u09A4 \u09B9\u09B2\u09C7 \u098F\u09B8\u098F\u09AE\u098F\u09B8 \u09AC\u09BE \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u099C\u09BE\u09A8\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7\u0964 </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, " \u0986\u09AA\u09A8\u09BF \u09AF\u09A6\u09BF \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE \u09AC\u09CD\u09AF\u09BE\u0995\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09B9\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09B8\u09BE\u09A7\u09BE\u09B0\u09A3\u09AD\u09BE\u09AC\u09C7 \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE\u0964 \u09A4\u09AC\u09C7 \u09AF\u09A6\u09BF \u0986\u09AA\u09A8\u09BF \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09A1\u09BC\u09BE \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09AF\u09BC \u09B6\u09BF\u0996\u09C7 \u09A8\u09BE \u09A5\u09BE\u0995\u09C7\u09A8, \u09AC\u09BE \u0985\u09A8\u09CD\u09AF \u0995\u09BE\u09B0\u09A3\u09C7 \u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09AF\u09C1\u0995\u09CD\u09A4 \u099B\u09BF\u09B2\u09C7\u09A8, \u09A4\u09BE\u09B9\u09B2\u09C7 \u09AC\u09BF\u09B7\u09AF\u09BC\u099F\u09BF \u09AF\u09BE\u099A\u09BE\u0987 \u0995\u09B0\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AC\u09C7\u0964 \u0995\u09B0\u09CD\u09A4\u09C3\u09AA\u0995\u09CD\u09B7\u09C7\u09B0 \u09AC\u09BF\u09AC\u09C7\u099A\u09A8\u09BE\u09AF\u09BC \u0986\u09AA\u09A8\u09BF \u0989\u09AA\u09AF\u09C1\u0995\u09CD\u09A4 \u09B9\u09B2\u09C7 \u098F\u09B8\u098F\u09AE\u098F\u09B8 \u09AC\u09BE \u0993\u09AF\u09BC\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u099C\u09BE\u09A8\u09BE\u09A8\u09CB \u09B9\u09AC\u09C7\u0964 "),
                createVNode("div", { class: "flex justify-center mt-6" }, [
                  createVNode("button", {
                    onClick: () => isRef(isModalOpen) ? isModalOpen.value = false : isModalOpen = false,
                    class: "text-red-600 hover:text-red-800 transition cursor-pointer",
                    "aria-label": "Close"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-10 w-10 md:h-12 md:w-12",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M6 18L18 6M6 6l12 12"
                      })
                    ]))
                  ], 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isRecitationModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> \u09A4\u09BE\u099C\u09AC\u09BF\u09A6 \u09AC\u09BE \u0989\u099A\u09CD\u099A\u09BE\u09B0\u09A3\u09C7 \u09B8\u09C0\u09AE\u09BF\u09A4 \u09AD\u09C1\u09B2 \u0997\u09CD\u09B0\u09B9\u09A3\u09AF\u09CB\u0997\u09CD\u09AF \u09B9\u09B2\u09C7\u0993, \u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09DC\u09A4\u09C7 \u09A8\u09BE \u09AA\u09BE\u09B0\u09B2\u09C7 \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC\u09C7 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u0995\u09B0\u09BE \u09B8\u09AE\u09CD\u09AD\u09AC \u09B9\u09AC\u09C7 \u09A8\u09BE\u0964 </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, " \u09A4\u09BE\u099C\u09AC\u09BF\u09A6 \u09AC\u09BE \u0989\u099A\u09CD\u099A\u09BE\u09B0\u09A3\u09C7 \u09B8\u09C0\u09AE\u09BF\u09A4 \u09AD\u09C1\u09B2 \u0997\u09CD\u09B0\u09B9\u09A3\u09AF\u09CB\u0997\u09CD\u09AF \u09B9\u09B2\u09C7\u0993, \u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09DC\u09A4\u09C7 \u09A8\u09BE \u09AA\u09BE\u09B0\u09B2\u09C7 \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC\u09C7 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4 \u0995\u09B0\u09BE \u09B8\u09AE\u09CD\u09AD\u09AC \u09B9\u09AC\u09C7 \u09A8\u09BE\u0964 "),
                createVNode("div", { class: "flex justify-center mt-6" }, [
                  createVNode("button", {
                    onClick: () => isRef(isRecitationModalOpen) ? isRecitationModalOpen.value = false : isRecitationModalOpen = false,
                    class: "text-red-600 hover:text-red-800 transition cursor-pointer",
                    "aria-label": "Close"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-10 w-10 md:h-12 md:w-12",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M6 18L18 6M6 6l12 12"
                      })
                    ]))
                  ], 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isTrainingModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-green-600 font-semibold leading-relaxed text-center"${_scopeId}> \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AA\u09B0\u09CD\u09AC\u09C7 \u0989\u09A4\u09CD\u09A4\u09C0\u09B0\u09CD\u09A3 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u09A8 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09C1\u09B0\u0986\u09A8 \u09A4\u09BF\u09B2\u09BE\u0993\u09AF\u09BC\u09BE\u09A4 \u098F\u0996\u09A8\u0993 \u09AA\u09C1\u09B0\u09CB\u09AA\u09C1\u09B0\u09BF \u09B6\u09C1\u09A6\u09CD\u09A7 \u09A8\u09AF\u09BC, \u09A4\u09BE\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u0995\u09CD\u09B7 \u09B9\u09BE\u09AB\u09BF\u09AF\u09A6\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09E9 \u0986\u0997\u09B8\u09CD\u099F \u09A5\u09C7\u0995\u09C7 \u09ED \u0986\u0997\u09B8\u09CD\u099F \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09EB \u09A6\u09BF\u09A8\u09AC\u09CD\u09AF\u09BE\u09AA\u09C0 \u098F\u0995\u099F\u09BF \u09AC\u09BF\u09B6\u09C7\u09B7 \u0993 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09AB\u09CD\u09B0\u09BF \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u09C7\u09B0 \u0986\u09AF\u09BC\u09CB\u099C\u09A8 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964 </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-green-600 hover:text-green-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-green-600 font-semibold leading-relaxed text-center" }, " \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AA\u09B0\u09CD\u09AC\u09C7 \u0989\u09A4\u09CD\u09A4\u09C0\u09B0\u09CD\u09A3 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u09A8 \u0995\u09BF\u09A8\u09CD\u09A4\u09C1 \u0995\u09C1\u09B0\u0986\u09A8 \u09A4\u09BF\u09B2\u09BE\u0993\u09AF\u09BC\u09BE\u09A4 \u098F\u0996\u09A8\u0993 \u09AA\u09C1\u09B0\u09CB\u09AA\u09C1\u09B0\u09BF \u09B6\u09C1\u09A6\u09CD\u09A7 \u09A8\u09AF\u09BC, \u09A4\u09BE\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u0995\u09CD\u09B7 \u09B9\u09BE\u09AB\u09BF\u09AF\u09A6\u09C7\u09B0 \u09AE\u09BE\u09A7\u09CD\u09AF\u09AE\u09C7 \u09E9 \u0986\u0997\u09B8\u09CD\u099F \u09A5\u09C7\u0995\u09C7 \u09ED \u0986\u0997\u09B8\u09CD\u099F \u09AA\u09B0\u09CD\u09AF\u09A8\u09CD\u09A4 \u09EB \u09A6\u09BF\u09A8\u09AC\u09CD\u09AF\u09BE\u09AA\u09C0 \u098F\u0995\u099F\u09BF \u09AC\u09BF\u09B6\u09C7\u09B7 \u0993 \u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09AB\u09CD\u09B0\u09BF \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3\u09C7\u09B0 \u0986\u09AF\u09BC\u09CB\u099C\u09A8 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7\u0964 "),
                createVNode("div", { class: "flex justify-center mt-6" }, [
                  createVNode("button", {
                    onClick: () => isRef(isTrainingModalOpen) ? isTrainingModalOpen.value = false : isTrainingModalOpen = false,
                    class: "text-green-600 hover:text-green-800 transition cursor-pointer",
                    "aria-label": "Close"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-10 w-10 md:h-12 md:w-12",
                      fill: "none",
                      viewBox: "0 0 24 24",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        d: "M5 13l4 4L19 7"
                      })
                    ]))
                  ], 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/competition.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=competition-tYKqnzbK.mjs.map
