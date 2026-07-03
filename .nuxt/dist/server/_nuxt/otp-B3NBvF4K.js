import { _ as __nuxt_component_0 } from "./OTP-DlPKQZVz.js";
import { ref, watch, mergeProps, unref, isRef, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from "vue/server-renderer";
import { g as getIcons } from "./icon-Cav00vLi.js";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import { u as useStudentAuthStore } from "./studentAuth-ZeK5cdiv.js";
import { u as useStudentInfoStore } from "./studentInfo-CyG5HN7S.js";
import { u as useRegisteredFormStore } from "./registeredForm-D-3AJ_rW.js";
import { _ as _export_sfc, e as useStudentAuthInfoStore, n as navigateTo } from "../server.mjs";
import { u as useAxios } from "./axios-DBcmg16B.js";
import { u as useMenuStore } from "./menuStore-DjC5MiZx.js";
import "pinia";
import "./authenticatedAxios-DoF-q_wg.js";
import "axios";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/unctx/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/h3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/defu/dist/defu.mjs";
import "vue-router";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/radix3/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ufo/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/destr/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/ohash/dist/index.mjs";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/klona/dist/index.mjs";
import "deep-pick-omit";
const useNavigationLinks = () => {
  const Roles = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    EXAMINER: 3,
    VOLUNTEER: 4,
    STUDENT: 5
  };
  const adminCommonLinks = [
    {
      title: "Dashboard",
      icon: "Dashboard",
      link: "/admin/dashboard"
    },
    {
      title: "View Profile",
      icon: "ViewProfile",
      link: "/admin/profile"
    }
  ];
  const adminCommonLinksLast = [
    {
      title: "Report Issues",
      icon: "Circular",
      link: "/admin/report-issues"
    }
  ];
  const commonLinksLast = [
    // {
    //   title: "Settings",
    //   icon: "Settings",
    //   link: "/settings",
    // },
    {
      title: "Log Out",
      icon: "LogOut",
      link: ""
    }
  ];
  const studentLinks = [
    {
      title: "Dashboard",
      icon: "Dashboard",
      link: "/dashboard"
    },
    {
      title: "View Profile",
      icon: "ViewProfile",
      link: "/profile"
    },
    {
      title: "View Registration",
      icon: "Circular",
      link: "/registration/view"
    },
    {
      title: "Update Registration",
      icon: "UpdateProfile",
      link: "/registration"
    },
    {
      title: "Registration Token",
      icon: "Circular",
      link: "/registration/token"
    }
  ];
  const examinersLinks = [
    {
      title: "Submit Viva Result",
      icon: "Circular",
      link: "/admin/submit-viva-result"
    }
  ];
  const volunteerLinks = [
    {
      title: "Verify Registration",
      icon: "Circular",
      link: "/admin/verify-registration"
    }
  ];
  const adminLinks = [
    {
      title: "View Registrations",
      icon: "Circular",
      link: "/admin/view-registrations"
    }
  ];
  const superAdminLinks = [
    {
      title: "Create Admin",
      icon: "UpdateProfile",
      link: "/admin/create-admin"
    }
  ];
  return {
    Roles,
    adminLinks,
    commonLinksLast,
    adminCommonLinksLast,
    studentLinks,
    volunteerLinks,
    examinersLinks,
    superAdminLinks,
    adminCommonLinks
  };
};
function useSetMenuLinks(role = 5) {
  const menuStore = useMenuStore();
  const {
    Roles,
    adminLinks,
    studentLinks,
    volunteerLinks,
    examinersLinks,
    superAdminLinks,
    commonLinksLast,
    adminCommonLinks,
    adminCommonLinksLast
  } = useNavigationLinks();
  try {
    menuStore.links = [];
    if (role !== Roles.STUDENT) {
      menuStore.links.push(...adminCommonLinks);
    }
    if (role === Roles.SUPER_ADMIN) {
      menuStore.links.push(...adminLinks);
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...superAdminLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.ADMIN) {
      menuStore.links.push(...adminLinks);
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.EXAMINER) {
      menuStore.links.push(...examinersLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.VOLUNTEER) {
      menuStore.links.push(...volunteerLinks);
      menuStore.links.push(...adminCommonLinksLast);
      menuStore.links.push(...commonLinksLast);
    } else if (role === Roles.STUDENT) {
      menuStore.links.push(...studentLinks);
      menuStore.links.push(...commonLinksLast);
    }
  } catch (error) {
    console.error("Error setting menu links:", error);
  }
}
const _sfc_main = {
  __name: "otp",
  __ssrInlineRender: true,
  setup(__props) {
    const useFormStore = useCompetitionFormStore();
    const studentAuthStore = useStudentAuthStore();
    const studentInfoStore = useStudentInfoStore();
    const registeredFormStore = useRegisteredFormStore();
    const studentAuthInfoStore = useStudentAuthInfoStore();
    let otp2 = ref(null);
    let isIncorrectOTP = ref(false);
    let isDisable = ref(false);
    let isOtpSend = ref(false);
    const registrationWithOtp = async (otp22) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      if (isOtpSend.value) return;
      (void 0).showLoading("OTP Matching...");
      isOtpSend.value = true;
      try {
        const endpoint = "/registration/complete";
        const payload = {
          phone: useFormStore.form.phone,
          otp: otp22,
          otp_ref: studentAuthStore.formRegistration.uuid,
          competitionForm: useFormStore.form
        };
        const { data } = await useAxios(endpoint, payload, null, "POST");
        if ((_a = data == null ? void 0 : data.data) == null ? void 0 : _a.authResponse) {
          (void 0).showSuccess("Success!", "User Created successfully", 2e3);
          studentAuthInfoStore.isStudentLoggedIn = true;
          studentAuthInfoStore.loggedInData = data.data.authResponse;
          (void 0).hideLoading();
          isOtpSend.value = false;
          isIncorrectOTP.value = false;
          useSetMenuLinks(5);
        } else {
          (void 0).showError("Error!", "Failed to create user", 2e3);
          isOtpSend.value = false;
          isIncorrectOTP.value = true;
        }
        if ((_b = data == null ? void 0 : data.data) == null ? void 0 : _b.user) {
          studentInfoStore.user = data.data.user;
          studentInfoStore.profileLoaded = true;
        }
        if ((_d = (_c = data == null ? void 0 : data.data) == null ? void 0 : _c.form) == null ? void 0 : _d.reg_no) {
          useFormStore.form = data.data.form;
          registeredFormStore.registeredForm = data.data.form;
          registeredFormStore.registeredFormLoaded = true;
          navigateTo("/registration/token");
          setTimeout(() => {
            (void 0).showSuccess("Success!", "Register Form successfully", 2e3);
          }, 3e3);
        } else {
          (void 0).hideLoading();
          setTimeout(() => {
            (void 0).showError(
              "Error!",
              "Failed to register form. Please try again",
              2e3
            );
          }, 3e3);
          navigateTo("/registration");
        }
      } catch (error) {
        isOtpSend.value = false;
        if (((_f = (_e = error == null ? void 0 : error.response) == null ? void 0 : _e.data) == null ? void 0 : _f.message) === "Invalid OTP") {
          isIncorrectOTP.value = true;
          (void 0).showError(
            "Error!",
            ((_h = (_g = error == null ? void 0 : error.response) == null ? void 0 : _g.data) == null ? void 0 : _h.message) || "Something went wrong",
            2e3
          );
        }
        (void 0).hideLoading();
      }
    };
    watch(
      () => otp2.value,
      () => {
        isIncorrectOTP.value = false;
        if (otp2.value.length === 6) {
          registrationWithOtp(otp2.value);
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d;
      const _component_InputsOTP = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "min-h-[60vh] sm:min-h-[95vh] flex items-center justify-center bg-gray-50 p-4" }, _attrs))} data-v-0429d9eb><div class="w-full sm:max-w-lg bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-v-0429d9eb><div class="h-2 bg-emerald-500" data-v-0429d9eb></div><div class="mt-2 sm:mt-0 px-4 sm:p-5" data-v-0429d9eb><div class="flex justify-center mb-4" data-v-0429d9eb><div class="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center" data-v-0429d9eb><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-0429d9eb><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-0429d9eb></path></svg></div></div><div class="bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm p-4 rounded-md mb-6 text-center leading-relaxed" data-v-0429d9eb><p class="font-semibold mb-1 underline" data-v-0429d9eb>নির্দেশনা</p><p data-v-0429d9eb> প্রিয় <span class="font-bold" data-v-0429d9eb>${ssrInterpolate((_b = (_a = unref(useFormStore)) == null ? void 0 : _a.form) == null ? void 0 : _b.name_bn)},</span> আপনার মোবাইল নাম্বার <span class="font-mono font-semibold" data-v-0429d9eb>${ssrInterpolate((_d = (_c = unref(useFormStore)) == null ? void 0 : _c.form) == null ? void 0 : _d.phone)}</span> -এ একটি OTP পাঠানো হয়েছে। <br data-v-0429d9eb> নিচের ঘরে সেই ৬ সংখ্যার কোডটি লিখে <strong data-v-0429d9eb>&quot;সাবমিট করুন&quot;</strong> বাটনে ক্লিক করুন। </p><p class="mt-2" data-v-0429d9eb> ভবিষ্যতে আপনি এই মোবাইল নাম্বার এবং OTP ব্যবহার করেই লগইন করতে পারবেন। যদি কোডটি না পান, তাহলে নিচের <strong data-v-0429d9eb>&quot;আবার পাঠান&quot;</strong> লিংকে ক্লিক করুন। </p></div><div class="relative" data-v-0429d9eb><div data-v-0429d9eb><form data-v-0429d9eb><div data-v-0429d9eb><p class="text-center font-bold text-[22px] leading-[24px] mb-4 sm:mb-5" data-v-0429d9eb> আপনার ওটিপি দিন </p>`);
      _push(ssrRenderComponent(_component_InputsOTP, {
        modelValue: unref(otp2),
        "onUpdate:modelValue": ($event) => isRef(otp2) ? otp2.value = $event : otp2 = $event,
        isIncorrectOTP: unref(isIncorrectOTP),
        digits: 6
      }, null, _parent));
      _push(`</div><div class="text-center mt-8" data-v-0429d9eb><button type="submit"${ssrIncludeBooleanAttr(unref(isDisable)) ? " disabled" : ""} class="inline-flex justify-center items-center px-6 py-3 border border-emerald-800 text-base font-bold rounded-md text-emerald-700 bg-white hover:bg-primary hover:text-white transition-colors duration-200 group relative cursor-pointer w-full" data-v-0429d9eb><span data-v-0429d9eb>সাবমিট করুন</span><div class="absolute right-5" data-v-0429d9eb>`);
      if (!unref(isDisable)) {
        _push(`<span data-v-0429d9eb><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 base-trans" viewBox="0 0 20 20" fill="currentColor" data-v-0429d9eb><path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" data-v-0429d9eb></path></svg></span>`);
      } else {
        _push(`<span class="absolute right-5" data-v-0429d9eb>${unref(getIcons)(
          "sppiner",
          `w-[20px] transition-transform duration-300`
        ) ?? ""}</span>`);
      }
      _push(`</div></button></div><div class="my-3 text-center hover:text-black base-trans" data-v-0429d9eb><a class="cursor-pointer hover:text-primary base-trans hover:underline" data-v-0429d9eb> কোডটি পাইনি? আবার পাঠান </a></div></form></div></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/registration/otp.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const otp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0429d9eb"]]);
export {
  otp as default
};
//# sourceMappingURL=otp-B3NBvF4K.js.map
