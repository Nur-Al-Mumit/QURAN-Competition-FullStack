import { _ as _sfc_main$1 } from "./BaseInput-ZxyR8QLM.js";
import { _ as _sfc_main$2 } from "./BaseRadio-BncdAuIi.js";
import { _ as __nuxt_component_0 } from "./nuxt-link-Cl1STy2k.js";
import { _ as _sfc_main$3 } from "./index-Ctzpa2gy.js";
import { ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, createVNode, isRef, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { e as useStudentAuthInfoStore } from "../server.mjs";
import { u as useRegisteredFormStore } from "./registeredForm-D-3AJ_rW.js";
import { u as useStudentInfoStore } from "./studentInfo-CyG5HN7S.js";
import { u as useStudentAuthStore } from "./studentAuth-ZeK5cdiv.js";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "./authenticatedAxios-DoF-q_wg.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
import "pinia";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/radix3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/destr/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ohash/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/klona/dist/index.mjs";
import "deep-pick-omit";
import "axios";
import "./axios-DBcmg16B.js";
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
      { id: 1, title: "general", name: "জেনারেল" },
      { id: 2, title: "madrasah", name: "মাদ্রাসা" },
      { id: 3, title: "both", name: "উভয়" }
    ];
    const yesNoOptions = [
      { id: 1, name: "হ্যাঁ" },
      { id: null, name: "না" }
    ];
    const genderOptions = [
      { id: 1, name: "পুরুষ" },
      { id: 2, name: "নারী" }
    ];
    const rulesAgreementOptions = [
      { id: 1, name: "হ্যাঁ, আমি নিয়মাবলীতে সম্মত" },
      { id: 2, name: "না, আমি সম্মত নই" }
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
      var _a, _b;
      const _component_inputs_base_input = _sfc_main$1;
      const _component_inputs_base_radio = _sfc_main$2;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_modal = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sm:max-w-3xl mx-auto px-4 py-8" }, _attrs))}><h1 class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><h1 class="text-lg sm:text-xl font-bold text-center mb-2"> রেজিস্ট্রেশন ফর্ম </h1><h4 class="text-xs font-bold text-center mb-6 text-red-500"><strong>দুঃখিত!</strong> এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। <br class="hidden sm:block"> ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে </h4><form><div class="space-y-4"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> ব্যক্তিগত তথ্য </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">`);
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "নাম (বাংলায়):",
        placeholder: "আপনার নাম",
        modelValue: unref(useFormStore).form.name_bn,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.name_bn = $event,
        required: true
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "নাম (ইংরেজিতে):",
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
        label: "জন্ম তারিখ:",
        placeholder: "আপনার জন্ম তারিখ",
        type: "date",
        max: unref(maxDob)
      }, null, _parent));
      if (unref(dobError)) {
        _push(`<p class="text-red-500 text-sm mt-1"> আপনার বয়স ১ জুলাই ২০২৫ এর হিসেবে কমপক্ষে ১৬ বছর হতে হবে। </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_inputs_base_input, {
        required: true,
        type: "number",
        label: "মোবাইল নম্বর:",
        modelValue: unref(useFormStore).form.phone,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.phone = $event,
        placeholder: "মোবাইল নাম্বার",
        disable: ((_a = unref(studentInfoStore).user) == null ? void 0 : _a.phone) ? true : false
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        type: "email",
        label: "ইমেইল:",
        modelValue: unref(useFormStore).form.email,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.email = $event,
        placeholder: "example@domain.com"
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        modelValue: unref(useFormStore).form.occupation,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.occupation = $event,
        required: true,
        placeholder: "আপনার পেশা",
        label: "পেশা:"
      }, null, _parent));
      _push(ssrRenderComponent(_component_inputs_base_input, {
        label: "ঠিকানা:",
        placeholder: "আপনার ঠিকানা",
        modelValue: unref(useFormStore).form.address,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.address = $event,
        class: "w-full sm:col-span-2",
        required: true
      }, null, _parent));
      _push(`</div><div class="flex justify-center items-center flex-col"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> শিক্ষাগত তথ্য </h2>`);
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
        _push(`<div class="space-y-2 sm:space-y-4"><h2 class="font-semibold text-center text-red-500"> আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত ছিলেন, তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি উপযুক্ত হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে। </h2><h2 class="font-semibold">আপনার মাদ্রাসার তথ্য:</h2>`);
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.madrasah_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.madrasah_name = $event,
          type: "text",
          label: "মাদ্রাসার নাম:",
          placeholder: "মাদ্রাসার নাম",
          required: true,
          class: "w-full"
        }, null, _parent));
        _push(`<h3 class="pl-1 mb-1 font-semibold text-left"> বিস্তারিত: <span class="text-red-600">*</span></h3><textarea required placeholder="মাদ্রাসায় আপনি কী পড়েছেন বিস্তারিত লিখুন..." class="w-full px-5 border rounded-lg outline-hidden focus:border-primary base-tran py-2 focus:outline-none">${ssrInterpolate(unref(useFormStore).form.madrasah_study_details)}</textarea></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(useFormStore).form.education_background === 1 || unref(useFormStore).form.education_background === 3) {
        _push(`<div class="space-y-2"><h2 class="font-semibold">আপনার শিক্ষা প্রতিষ্ঠানসমূহের নাম:</h2>`);
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.school_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.school_name = $event,
          type: "text",
          label: "স্কুলের নাম:",
          placeholder: "স্কুলের নাম",
          required: true
        }, null, _parent));
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.college_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.college_name = $event,
          type: "text",
          label: "কলেজের নাম:",
          placeholder: "কলেজের নাম",
          class: "w-full"
        }, null, _parent));
        _push(ssrRenderComponent(_component_inputs_base_input, {
          modelValue: unref(useFormStore).form.university_name,
          "onUpdate:modelValue": ($event) => unref(useFormStore).form.university_name = $event,
          type: "text",
          label: "ভার্সিটির নাম:",
          placeholder: "ভার্সিটির নাম",
          class: "w-full"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid place-items-center gap-4 pt-4"><div class="sm:col-span-2"><h2 class="font-semibold mb-2"> প্রতিযোগী পুরুষ নাকি নারী তা নির্বাচন করুন </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: genderOptions,
        modelValue: unref(useFormStore).form.gender,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.gender = $event,
        required: true,
        colors: {
          2: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div></div><div><h2 class="font-semibold mb-2"> আপনি কি দেখে কুরআন তেলাওয়াত করতে পারেন? </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: yesNoOptions,
        modelValue: unref(useFormStore).form.is_recitation,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.is_recitation = $event,
        colors: {
          null: "bg-red-500 text-white border-red-500"
        }
      }, null, _parent));
      _push(`</div></div><div><h2 class="font-semibold mb-2"> আপনি কি কুরআন পাঠের প্রশিক্ষণে অংশগ্রহণ করতে চান? </h2><div class="flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_inputs_base_radio, {
        options: yesNoOptions,
        modelValue: unref(useFormStore).form.need_training,
        "onUpdate:modelValue": ($event) => unref(useFormStore).form.need_training = $event
      }, null, _parent));
      _push(`</div></div><div class="sm:col-span-2 mt-10"><p class="text-red-600 mb-3 text-center text-[13px] sm:text-sm"> প্রতিযোগিতায় অংশগ্রহণের জন্য নিয়মাবলী ও শর্তাবলী পড়ে সম্মতি প্রদান করা বাধ্যতামূলক। দয়া করে `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/competition-rules",
        class: "text-emerald-600 hover:text-emerald-800 underline hover:scale-105 transition-transform duration-200"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` নিয়মাবলী `);
          } else {
            return [
              createTextVNode(" নিয়মাবলী ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` ভালোভাবে পড়ুন এবং নিশ্চিত করুন যে আপনি সম্মত হচ্ছেন এবং প্রতিযোগিতার সকল শর্ত মেনে চলতে প্রস্তুত। </p><div class="flex items-center justify-center">`);
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
        _push(`<span>আপডেট করুন</span>`);
      } else {
        _push(`<span>সাবমিট করুন</span>`);
      }
      _push(`<div class="absolute right-5">`);
      if (!unref(isFormSubmit)) {
        _push(`<span><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></span>`);
      } else {
        _push(`<span>${unref(getIcons)("sppiner", `w-[20px]`) ?? ""}</span>`);
      }
      _push(`</div></button></div></form>`);
      _push(ssrRenderComponent(_component_modal, { "is-open": unref(isModalOpen) }, {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত ছিলেন, তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি উপযুক্ত হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে। </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, " আপনি যদি মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন হন, তাহলে সাধারণভাবে এই প্রতিযোগিতায় অংশগ্রহণ করতে পারবেন না। তবে যদি আপনি কুরআন পড়া মাদ্রাসায় শিখে না থাকেন, বা অন্য কারণে মাদ্রাসার সাথে যুক্ত ছিলেন, তাহলে বিষয়টি যাচাই করে দেখা হবে। কর্তৃপক্ষের বিবেচনায় আপনি উপযুক্ত হলে এসএমএস বা ওয়েবসাইটের মাধ্যমে জানানো হবে। "),
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
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> তাজবিদ বা উচ্চারণে সীমিত ভুল গ্রহণযোগ্য হলেও, দেখে কুরআন পড়তে না পারলে প্রাথমিক বাছাই পর্বে নির্বাচিত করা সম্ভব হবে না। </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, " তাজবিদ বা উচ্চারণে সীমিত ভুল গ্রহণযোগ্য হলেও, দেখে কুরআন পড়তে না পারলে প্রাথমিক বাছাই পর্বে নির্বাচিত করা সম্ভব হবে না। "),
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
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-green-600 font-semibold leading-relaxed text-center"${_scopeId}> প্রাথমিক পর্বে উত্তীর্ণ হয়েছেন কিন্তু কুরআন তিলাওয়াত এখনও পুরোপুরি শুদ্ধ নয়, তাদের জন্য দক্ষ হাফিযদের মাধ্যমে ৩ আগস্ট থেকে ৭ আগস্ট পর্যন্ত ৫ দিনব্যাপী একটি বিশেষ ও সম্পূর্ণ ফ্রি প্রশিক্ষণের আয়োজন করা হয়েছে। </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-green-600 hover:text-green-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-green-600 font-semibold leading-relaxed text-center" }, " প্রাথমিক পর্বে উত্তীর্ণ হয়েছেন কিন্তু কুরআন তিলাওয়াত এখনও পুরোপুরি শুদ্ধ নয়, তাদের জন্য দক্ষ হাফিযদের মাধ্যমে ৩ আগস্ট থেকে ৭ আগস্ট পর্যন্ত ৫ দিনব্যাপী একটি বিশেষ ও সম্পূর্ণ ফ্রি প্রশিক্ষণের আয়োজন করা হয়েছে। "),
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
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-red-600 font-semibold leading-relaxed text-center"${_scopeId}><strong${_scopeId}>দুঃখিত!</strong> এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-red-600 font-semibold leading-relaxed text-center" }, [
                  createVNode("strong", null, "দুঃখিত!"),
                  createTextVNode(" এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে ")
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
            _push2(`<div class="p-3 sm:p-6 mx-auto"${_scopeId}><div class="flex justify-center mb-4"${_scopeId}><svg class="w-16 h-16 text-amber-500" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"${_scopeId}></path></svg></div><h2 class="text-xl font-bold text-center mb-6 text-red-700"${_scopeId}> প্রতিযোগিতার শর্তাবলী </h2><div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-5"${_scopeId}><h3 class="text-red-700 font-semibold mb-3 flex items-center"${_scopeId}><svg class="w-5 h-5 mr-2 text-red-600" fill="currentColor" viewBox="0 0 20 20"${_scopeId}><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"${_scopeId}></path></svg> যারা অংশগ্রহণ করতে পারবেন না </h3><div class="space-y-1049238W text-[16px] text-red-700"${_scopeId}><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span${_scopeId}><span class="font-medium"${_scopeId}>যাদের বয়স ১৬ বছরের কম</span></span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span${_scopeId}>মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন ব্যক্তি</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span${_scopeId}>দেখে কুরআন পড়তে না পারা ব্যক্তি</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span${_scopeId}>উচ্চ দক্ষতাসম্পন্ন কুরআন পাঠকারী(জেনারেল)</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span${_scopeId}>হাফিজে কুরআন</span></div><div class="flex items-center"${_scopeId}><span class="text-red-500 mr-2"${_scopeId}>•</span><span class="font-medium"${_scopeId}>নারী</span></div></div></div><div class="bg-red-50 border border-red-200 rounded-lg p-3 mb-6"${_scopeId}><p class="text-red-700 text-sm text-center leading-relaxed"${_scopeId}><strong${_scopeId}>দুঃখিত!</strong> এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে </p></div><div class="text-center mb-6"${_scopeId}><a href="/competition-rules" class="text-emerald-600 hover:text-emerald-800 text-sm font-medium underline decoration-emerald-300 hover:decoration-emerald-600 transition-colors"${_scopeId}> বিস্তারিত নিয়মাবলী ও শর্তাদি দেখুন </a></div><div class="flex justify-center"${_scopeId}><button class="inline-flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 shadow-sm hover:shadow-md font-bold"${_scopeId}><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"${_scopeId}></path></svg> বুঝেছি </button></div></div>`);
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
                createVNode("h2", { class: "text-xl font-bold text-center mb-6 text-red-700" }, " প্রতিযোগিতার শর্তাবলী "),
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
                    createTextVNode(" যারা অংশগ্রহণ করতে পারবেন না ")
                  ]),
                  createVNode("div", { class: "space-y-1049238W text-[16px] text-red-700" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", null, [
                        createVNode("span", { class: "font-medium" }, "যাদের বয়স ১৬ বছরের কম")
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", null, "মাদ্রাসা ব্যাকগ্রাউন্ডসম্পন্ন ব্যক্তি")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", null, "দেখে কুরআন পড়তে না পারা ব্যক্তি")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", null, "উচ্চ দক্ষতাসম্পন্ন কুরআন পাঠকারী(জেনারেল)")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", null, "হাফিজে কুরআন")
                    ]),
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode("span", { class: "text-red-500 mr-2" }, "•"),
                      createVNode("span", { class: "font-medium" }, "নারী")
                    ])
                  ])
                ]),
                createVNode("div", { class: "bg-red-50 border border-red-200 rounded-lg p-3 mb-6" }, [
                  createVNode("p", { class: "text-red-700 text-sm text-center leading-relaxed" }, [
                    createVNode("strong", null, "দুঃখিত!"),
                    createTextVNode(" এই প্রতিযোগিতাটি শুধুমাত্র পুরুষদের জন্য। ইনশাআল্লাহ পরবর্তী কোনো প্রতিযোগিতায় নারীদেরও ব্যবস্থা রাখা হবে ")
                  ])
                ]),
                createVNode("div", { class: "text-center mb-6" }, [
                  createVNode("a", {
                    href: "/competition-rules",
                    class: "text-emerald-600 hover:text-emerald-800 text-sm font-medium underline decoration-emerald-300 hover:decoration-emerald-600 transition-colors"
                  }, " বিস্তারিত নিয়মাবলী ও শর্তাদি দেখুন ")
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
                    createTextVNode(" বুঝেছি ")
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
            _push2(`<div class="p-5"${_scopeId}><h1 class="text-xl text-red-600 font-semibold leading-relaxed text-center"${_scopeId}> দুঃখিত এই সেশনের জন্য আমাদের রেজিস্ট্রেশন বন্ধ হয়ে গেছে অনুগ্রহ করে পরবর্তী সেশনের জন্য অপেক্ষা করুন জাযাকাল্লাহু খইরন </h1><div class="flex justify-center mt-6"${_scopeId}><button class="text-red-600 hover:text-red-800 transition cursor-pointer" aria-label="Close"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 md:h-12 md:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"${_scopeId}></path></svg></button></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("h1", { class: "text-xl text-red-600 font-semibold leading-relaxed text-center" }, " দুঃখিত এই সেশনের জন্য আমাদের রেজিস্ট্রেশন বন্ধ হয়ে গেছে অনুগ্রহ করে পরবর্তী সেশনের জন্য অপেক্ষা করুন জাযাকাল্লাহু খইরন "),
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
export {
  _sfc_main as default
};
//# sourceMappingURL=index-DJ1WbxtM.js.map
