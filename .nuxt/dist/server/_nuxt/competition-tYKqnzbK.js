import { _ as _sfc_main$1 } from "./BaseInput-ZxyR8QLM.js";
import { _ as _sfc_main$2 } from "./BaseRadio-BncdAuIi.js";
import { _ as _sfc_main$3 } from "./index-Ctzpa2gy.js";
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, isRef, createBlock, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { e as useStudentAuthInfoStore } from "../server.mjs";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
  __name: "competition",
  __ssrInlineRender: true,
  setup(__props) {
    const { isStudentLoggedIn } = useStudentAuthInfoStore();
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
      const _component_inputs_base_input = _sfc_main$1;
      const _component_inputs_base_radio = _sfc_main$2;
      const _component_modal = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sm:max-w-3xl mx-auto px-4 py-8" }, _attrs))}><h1 class="text-xl sm:text-2xl font-bold text-center bg-gradient-to-r from-emerald-600 to-emerald-800 text-transparent pt-2 bg-clip-text"> বিশুদ্ধ কুরআন পাঠ প্রতিযোগিতা - ১৪৪৭ হিজরি </h1><h1 class="text-lg sm:text-xl font-bold text-center mb-6"> রেজিস্ট্রেশন ফর্ম </h1><form><div class="space-y-4"><h2 class="font-semibold text-center underline mb-5 text-lg sm:text-xl"> ব্যক্তিগত তথ্য </h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 w-full">`);
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
        placeholder: "মোবাইল নাম্বার"
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
      _push(`<div class="grid place-items-center gap-4 pt-4"><div><h2 class="font-semibold mb-2"> আপনি কি দেখে কুরআন তেলাওয়াত করতে পারেন? </h2><div class="flex items-center justify-center">`);
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
      _push(`</div></div></div></div><div class="text-center py-6 mt-10"><button${ssrIncludeBooleanAttr(unref(isDisable) || unref(dobError)) ? " disabled" : ""} class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group relative cursor-pointer w-full"><span>সাবমিট করুন</span><div class="absolute right-5">`);
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
export {
  _sfc_main as default
};
//# sourceMappingURL=competition-tYKqnzbK.js.map
