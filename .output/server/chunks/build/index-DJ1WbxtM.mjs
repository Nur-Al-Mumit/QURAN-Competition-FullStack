import { _ as _sfc_main$1 } from './BaseInput-ZxyR8QLM.mjs';
import { _ as _sfc_main$2 } from './BaseRadio-BncdAuIi.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Cl1STy2k.mjs';
import { _ as _sfc_main$3 } from './index-Ctzpa2gy.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, isRef, createBlock, openBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { g as getIcons } from './icon-Cav00vLi.mjs';
import { e as useStudentAuthInfoStore } from './server.mjs';
import { u as useRegisteredFormStore } from './registeredForm-D-3AJ_rW.mjs';
import { u as useStudentInfoStore } from './studentInfo-CyG5HN7S.mjs';
import { u as useStudentAuthStore } from './studentAuth-ZeK5cdiv.mjs';
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
import './authenticatedAxios-DoF-q_wg.mjs';

const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { isStudentLoggedIn } = useStudentAuthInfoStore();
    useRegisteredFormStore();
    const studentInfoStore = useStudentInfoStore();
    useStudentAuthStore();
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
    const genderOptions = [
      { id: 1, name: "\u09AA\u09C1\u09B0\u09C1\u09B7" },
      { id: 2, name: "\u09A8\u09BE\u09B0\u09C0" }
    ];
    const rulesAgreementOptions = [
      { id: 1, name: "\u09B9\u09CD\u09AF\u09BE\u0981, \u0986\u09AE\u09BF \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0\u09A4\u09C7 \u09B8\u09AE\u09CD\u09AE\u09A4" },
      { id: 2, name: "\u09A8\u09BE, \u0986\u09AE\u09BF \u09B8\u09AE\u09CD\u09AE\u09A4 \u09A8\u0987" }
    ];
    let isModalOpen = ref(false);
    let isGenderModalOpen = ref(false);
    let isTrainingModalOpen = ref(false);
    let isRegCloseModalOpen = ref(false);
    let isDisclaimerModalOpen = ref(true);
    let isRecitationModalOpen = ref(false);
    ref(false);
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
    const isFormDisabled = computed(() => {
      return dobError.value || useFormStore.form.gender === 2 || useFormStore.form.rulesAgreement !== 1;
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
    watch(
      () => useFormStore.form.gender,
      (newValue) => {
        if (newValue === 2) {
          isGenderModalOpen.value = true;
        }
      }
    );
    watch(
      () => useFormStore.form.rulesAgreement,
      (newValue) => {
        if (newValue !== 1) {
          isDisclaimerModalOpen.value = true;
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a2;
      var _a, _b;
      const _component_inputs_base_input = _sfc_main$1;
      const _component_inputs_base_radio = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_modal = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sm:max-w-3xl mx-auto px-4 py-8" }, _attrs))}><h1 class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE - \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </h1><h1 class="text-lg sm:text-xl font-bold text-center mb-2"> \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09AB\u09B0\u09CD\u09AE </h1><h4 class="text-xs font-bold text-center mb-6 text-red-500"><strong>\u09A6\u09C1\u0983\u0996\u09BF\u09A4!</strong> \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u099F\u09BF \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09AA\u09C1\u09B0\u09C1\u09B7\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 <br class="hidden sm:block"> \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u09A8\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0\u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u09B0\u09BE\u0996\u09BE \u09B9\u09AC\u09C7 </h4><form><div class="space-y-4"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0997\u09A4 \u09A4\u09A5\u09CD\u09AF </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">`);
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
        placeholder: "\u09AE\u09CB\u09AC\u09BE\u0987\u09B2 \u09A8\u09BE\u09AE\u09CD\u09AC\u09BE\u09B0",
        disable: ((_a = unref(studentInfoStore).user) == null ? void 0 : _a.phone) ? true : false
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
      _push(`<div class="grid place-items-center gap-4 pt-4"><div class="sm:col-span-2"><h2 class="font-semibold mb-2"> \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09C0 \u09AA\u09C1\u09B0\u09C1\u09B7 \u09A8\u09BE\u0995\u09BF \u09A8\u09BE\u09B0\u09C0 \u09A4\u09BE \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8 </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: genderOptions,
        modelValue: unref(useFormStore).form.gender,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.gender = $event,
        required: true,
        colors: {
          2: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div></div><div><h2 class="font-semibold mb-2"> \u0986\u09AA\u09A8\u09BF \u0995\u09BF \u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09A4\u09C7\u09B2\u09BE\u0993\u09AF\u09BC\u09BE\u09A4 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8? </h2><div class="flex items-center justify-center">`);
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
      _push(`</div></div><div class="sm:col-span-2 mt-10"><p class="text-red-600 mb-3 text-center text-[13px] sm:text-sm"> \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0 \u0993 \u09B6\u09B0\u09CD\u09A4\u09BE\u09AC\u09B2\u09C0 \u09AA\u09A1\u09BC\u09C7 \u09B8\u09AE\u09CD\u09AE\u09A4\u09BF \u09AA\u09CD\u09B0\u09A6\u09BE\u09A8 \u0995\u09B0\u09BE \u09AC\u09BE\u09A7\u09CD\u09AF\u09A4\u09BE\u09AE\u09C2\u09B2\u0995\u0964 \u09A6\u09AF\u09BC\u09BE \u0995\u09B0\u09C7 `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/competition-rules",
        class: "text-emerald-600 hover:text-emerald-800 underline hover:scale-105 transition-transform duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0 `);
          } else {
            return [
              createTextVNode(" \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \u09AD\u09BE\u09B2\u09CB\u09AD\u09BE\u09AC\u09C7 \u09AA\u09A1\u09BC\u09C1\u09A8 \u098F\u09AC\u0982 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8 \u09AF\u09C7 \u0986\u09AA\u09A8\u09BF \u09B8\u09AE\u09CD\u09AE\u09A4 \u09B9\u099A\u09CD\u099B\u09C7\u09A8 \u098F\u09AC\u0982 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09B0 \u09B8\u0995\u09B2 \u09B6\u09B0\u09CD\u09A4 \u09AE\u09C7\u09A8\u09C7 \u099A\u09B2\u09A4\u09C7 \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u0964 </p><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: rulesAgreementOptions,
        modelValue: unref(useFormStore).form.rulesAgreement,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.rulesAgreement = $event,
        required: true,
        colors: {
          2: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div></div></div></div><div class="text-center py-6"><button${ssrIncludeBooleanAttr(unref(isFormDisabled)) ? " disabled" : ""} class="inline-flex justify-center items-center px-6 py-3 border rounded-md text-base font-bold w-full transition-colors duration-200 group relative cursor-pointer border-emerald-800 text-emerald-700 bg-white hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-400 disabled:text-gray-600 disabled:hover:bg-gray-200 disabled:hover:text-gray-600">`);
      if ((_b = unref(useFormStore).form) == null ? void 0 : _b.reg_no) {
        _push(`<span>\u0986\u09AA\u09A1\u09C7\u099F \u0995\u09B0\u09C1\u09A8</span>`);
      } else {
        _push(`<span>\u09B8\u09BE\u09AC\u09AE\u09BF\u099F \u0995\u09B0\u09C1\u09A8</span>`);
      }
      _push(`<div class="absolute right-5">`);
      if (!unref(isFormSubmit)) {
        _push(`<span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span>`);
      } else {
        _push(`<span>${(_a2 = unref(getIcons)("sppiner", `w-[20px]`)) != null ? _a2 : ""}</span>`);
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
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isGenderModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}><strong${_scopeId}>\u09A6\u09C1\u0983\u0996\u09BF\u09A4!</strong> \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u099F\u09BF \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09AA\u09C1\u09B0\u09C1\u09B7\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u09A8\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0\u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u09B0\u09BE\u0996\u09BE \u09B9\u09AC\u09C7 </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, [
                  createVNode("strong", null, "\u09A6\u09C1\u0983\u0996\u09BF\u09A4!"),
                  createTextVNode(" \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u099F\u09BF \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09AA\u09C1\u09B0\u09C1\u09B7\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u09A8\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0\u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u09B0\u09BE\u0996\u09BE \u09B9\u09AC\u09C7 ")
                ]),
                createVNode("div", { class: "flex justify-center mt-6" }, [
                  createVNode("button", {
                    onClick: () => isRef(isGenderModalOpen) ? isGenderModalOpen.value = false : isGenderModalOpen = false,
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
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isDisclaimerModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-3 sm:p-6 mx-auto"${_scopeId}><div class="flex justify-center mb-4"${_scopeId}><svg class="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"${_scopeId}></path></svg></div><h2 class="text-xl font-bold text-center mb-6 text-red-700"${_scopeId}> \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09B0 \u09B6\u09B0\u09CD\u09A4\u09BE\u09AC\u09B2\u09C0 </h2><div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-5"${_scopeId}><h3 class="text-red-700 font-semibold mb-3 flex items-center"${_scopeId}><svg class="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"${_scopeId}></path></svg> \u09AF\u09BE\u09B0\u09BE \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE </h3><div class="space-y-1049238W text-[16px] text-red-700"${_scopeId}><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span${_scopeId}><span class="font-medium"${_scopeId}>\u09AF\u09BE\u09A6\u09C7\u09B0 \u09AC\u09DF\u09B8 \u09E7\u09EC \u09AC\u099B\u09B0\u09C7\u09B0 \u0995\u09AE</span></span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span${_scopeId}>\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE \u09AC\u09CD\u09AF\u09BE\u0995\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span${_scopeId}>\u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09A1\u09BC\u09A4\u09C7 \u09A8\u09BE \u09AA\u09BE\u09B0\u09BE \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span${_scopeId}>\u0989\u099A\u09CD\u099A \u09A6\u0995\u09CD\u09B7\u09A4\u09BE\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0\u0995\u09BE\u09B0\u09C0(\u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u09B2)</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span${_scopeId}>\u09B9\u09BE\u09AB\u09BF\u099C\u09C7 \u0995\u09C1\u09B0\u0986\u09A8</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>\u2022</span><span class="font-medium"${_scopeId}>\u09A8\u09BE\u09B0\u09C0</span></div></div></div><div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6"${_scopeId}><p class="text-red-700 text-sm text-center leading-relaxed"${_scopeId}><strong${_scopeId}>\u09A6\u09C1\u0983\u0996\u09BF\u09A4!</strong> \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u099F\u09BF \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09AA\u09C1\u09B0\u09C1\u09B7\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u09A8\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0\u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u09B0\u09BE\u0996\u09BE \u09B9\u09AC\u09C7 </p></div><div class="text-center mb-6"${_scopeId}><a href="/competition-rules" class="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline decoration-emerald-300 hover:decoration-emerald-600 transition-colors"${_scopeId}> \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0 \u0993 \u09B6\u09B0\u09CD\u09A4\u09BE\u09A6\u09BF \u09A6\u09C7\u0996\u09C1\u09A8 </a></div><div class="flex justify-center"${_scopeId}><button class="inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm hover:shadow-md font-bold"${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> \u09AC\u09C1\u099D\u09C7\u099B\u09BF </button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-3 sm:p-6 mx-auto" }, [
                createVNode("div", { class: "flex justify-center mb-4" }, [
                  (openBlock(), createBlock("svg", {
                    class: "w-16 h-16 text-amber-500",
                    fill: "currentColor",
                    viewBox: "0 0 20 20"
                  }, [
                    createVNode("path", {
                      "fill-rule": "evenodd",
                      d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
                      "clip-rule": "evenodd"
                    })
                  ]))
                ]),
                createVNode("h2", { class: "text-xl font-bold text-center mb-6 text-red-700" }, " \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09B0 \u09B6\u09B0\u09CD\u09A4\u09BE\u09AC\u09B2\u09C0 "),
                createVNode("div", { class: "bg-red-50 border border-red-200 rounded-lg p-4 mb-5" }, [
                  createVNode("h3", { class: "text-red-700 font-semibold mb-3 flex items-center" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2 text-red-600",
                      fill: "currentColor",
                      viewBox: "0 0 20 20"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createTextVNode(" \u09AF\u09BE\u09B0\u09BE \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE ")
                  ]),
                  createVNode("div", { class: "space-y-1049238W text-[16px] text-red-700" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", null, [
                        createVNode("span", { class: "font-medium" }, "\u09AF\u09BE\u09A6\u09C7\u09B0 \u09AC\u09DF\u09B8 \u09E7\u09EC \u09AC\u099B\u09B0\u09C7\u09B0 \u0995\u09AE")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", null, "\u09AE\u09BE\u09A6\u09CD\u09B0\u09BE\u09B8\u09BE \u09AC\u09CD\u09AF\u09BE\u0995\u0997\u09CD\u09B0\u09BE\u0989\u09A8\u09CD\u09A1\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", null, "\u09A6\u09C7\u0996\u09C7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09A1\u09BC\u09A4\u09C7 \u09A8\u09BE \u09AA\u09BE\u09B0\u09BE \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", null, "\u0989\u099A\u09CD\u099A \u09A6\u0995\u09CD\u09B7\u09A4\u09BE\u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0\u0995\u09BE\u09B0\u09C0(\u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u09B2)")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", null, "\u09B9\u09BE\u09AB\u09BF\u099C\u09C7 \u0995\u09C1\u09B0\u0986\u09A8")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "\u2022"),
                      createVNode("span", { class: "font-medium" }, "\u09A8\u09BE\u09B0\u09C0")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-red-50 border border-red-200 rounded-lg p-3 mb-6" }, [
                  createVNode("p", { class: "text-red-700 text-sm text-center leading-relaxed" }, [
                    createVNode("strong", null, "\u09A6\u09C1\u0983\u0996\u09BF\u09A4!"),
                    createTextVNode(" \u098F\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u099F\u09BF \u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09AA\u09C1\u09B0\u09C1\u09B7\u09A6\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF\u0964 \u0987\u09A8\u09B6\u09BE\u0986\u09B2\u09CD\u09B2\u09BE\u09B9 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u0995\u09CB\u09A8\u09CB \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09AF\u09BC \u09A8\u09BE\u09B0\u09C0\u09A6\u09C7\u09B0\u0993 \u09AC\u09CD\u09AF\u09AC\u09B8\u09CD\u09A5\u09BE \u09B0\u09BE\u0996\u09BE \u09B9\u09AC\u09C7 ")
                  ])
                ]),
                createVNode("div", { class: "text-center mb-6" }, [
                  createVNode("a", {
                    href: "/competition-rules",
                    class: "text-emerald-600 hover:text-emerald-800 text-sm font-medium underline decoration-emerald-300 hover:decoration-emerald-600 transition-colors"
                  }, " \u09AC\u09BF\u09B8\u09CD\u09A4\u09BE\u09B0\u09BF\u09A4 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BE\u09AC\u09B2\u09C0 \u0993 \u09B6\u09B0\u09CD\u09A4\u09BE\u09A6\u09BF \u09A6\u09C7\u0996\u09C1\u09A8 ")
                ]),
                createVNode("div", { class: "flex justify-center" }, [
                  createVNode("button", {
                    onClick: () => isRef(isDisclaimerModalOpen) ? isDisclaimerModalOpen.value = false : isDisclaimerModalOpen = false,
                    class: "inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm hover:shadow-md font-bold"
                  }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-5 h-5 mr-2",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M5 13l4 4L19 7"
                      })
                    ])),
                    createTextVNode(" \u09AC\u09C1\u099D\u09C7\u099B\u09BF ")
                  ], 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isRegCloseModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-xl text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> \u09A6\u09C1\u0983\u0996\u09BF\u09A4 \u098F\u0987 \u09B8\u09C7\u09B6\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09AC\u09A8\u09CD\u09A7 \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09B8\u09C7\u09B6\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8 \u099C\u09BE\u09AF\u09BE\u0995\u09BE\u09B2\u09CD\u09B2\u09BE\u09B9\u09C1 \u0996\u0987\u09B0\u09A8 </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-xl text-red-600 font-semibold leading-relaxed text-center" }, " \u09A6\u09C1\u0983\u0996\u09BF\u09A4 \u098F\u0987 \u09B8\u09C7\u09B6\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09AC\u09A8\u09CD\u09A7 \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09B8\u09C7\u09B6\u09A8\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8 \u099C\u09BE\u09AF\u09BE\u0995\u09BE\u09B2\u09CD\u09B2\u09BE\u09B9\u09C1 \u0996\u0987\u09B0\u09A8 "),
                createVNode("div", { class: "flex justify-center mt-6" }, [
                  createVNode("button", {
                    onClick: () => isRef(isRegCloseModalOpen) ? isRegCloseModalOpen.value = false : isRegCloseModalOpen = false,
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
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/registration/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-DJ1WbxtM.mjs.map
