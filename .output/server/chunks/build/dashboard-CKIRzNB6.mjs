import { ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useHead } from './v3-gEMt0CXe.mjs';
import './server.mjs';
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
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const data = ref([
      {
        id: 5,
        user_id: 6,
        season_id: 1,
        reg_no: "RC16966",
        name_en: "Nur Al Mumit",
        name_bn: "\u09A8\u09C1\u09B0 \u0986\u09B2 \u09AE\u09C1\u09AE\u09BF\u09A4",
        dob: "2002-09-11",
        gender: 1,
        phone: "01818623808",
        address: "Kumarpara, sylhet",
        education_background: 1,
        school_name: "Lions school and collage, saidpur",
        college_name: null,
        university_name: null,
        madrasah_name: null,
        madrasah_study_details: null,
        occupation: "Job holder",
        is_recitation: 1,
        need_training: null,
        is_active: 1,
        is_sms_sent: null,
        created_at: "2025-07-21T08:14:12.000000Z",
        updated_at: "2025-07-29T09:19:37.000000Z",
        criteria_id: null
      },
      {
        id: 6,
        user_id: 13,
        season_id: 1,
        reg_no: "RC113985",
        name_en: "SHAHIN MIAH",
        name_bn: "\u09B6\u09BE\u09B9\u09BF\u09A8 \u09AE\u09BF\u09AF\u09BC\u09BE",
        dob: "1999-12-12",
        gender: 1,
        phone: "01764931367",
        address: "\u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09BE\u099A\u0982, \u09B9\u09AC\u09BF\u0997\u099E\u09CD\u099C",
        education_background: 1,
        school_name: "\u098F\u09B2. \u0986\u09B0. \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u0989\u099A\u09CD\u099A \u09AC\u09BF\u09A6\u09CD\u09AF\u09BE\u09B2\u09AF\u09BC",
        college_name: "\u099C\u09A8\u09BE\u09AC \u0986\u09B2\u09C0 \u09B8\u09B0\u0995\u09BE\u09B0\u09BF \u09A1\u09BF\u0997\u09CD\u09B0\u09BF \u0995\u09B2\u09C7\u099C, \u09AC\u09BE\u09A8\u09BF\u09AF\u09BC\u09BE\u099A\u0982",
        university_name: null,
        madrasah_name: null,
        madrasah_study_details: null,
        occupation: "\u09B6\u09BF\u0995\u09CD\u09B7\u0995 (\u099C\u09C7\u09A8\u09BE\u09B0\u09C7\u09B2)",
        is_recitation: 1,
        need_training: null,
        is_active: 1,
        is_sms_sent: null,
        created_at: "2025-07-21T08:44:11.000000Z",
        updated_at: "2025-07-21T08:44:11.000000Z",
        criteria_id: null
      }
    ]);
    const filters = ref({
      search: "",
      gender: "",
      education_background: "",
      is_recitation: "",
      need_training: "",
      is_active: "",
      is_sms_sent: ""
    });
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const filteredData = computed(() => {
      let filtered = data.value;
      if (filters.value.search) {
        const search = filters.value.search.toLowerCase();
        filtered = filtered.filter(
          (item) => item.name_en.toLowerCase().includes(search) || item.name_bn.toLowerCase().includes(search) || item.phone.includes(search) || item.reg_no.toLowerCase().includes(search)
        );
      }
      if (filters.value.gender) {
        filtered = filtered.filter((item) => item.gender == filters.value.gender);
      }
      if (filters.value.education_background) {
        filtered = filtered.filter(
          (item) => item.education_background == filters.value.education_background
        );
      }
      if (filters.value.is_recitation !== "") {
        filtered = filtered.filter(
          (item) => item.is_recitation == filters.value.is_recitation
        );
      }
      if (filters.value.need_training !== "") {
        filtered = filtered.filter((item) => {
          if (filters.value.need_training === "1") {
            return item.need_training === 1;
          } else {
            return item.need_training === 0 || item.need_training === null;
          }
        });
      }
      if (filters.value.is_active !== "") {
        filtered = filtered.filter(
          (item) => item.is_active == filters.value.is_active
        );
      }
      if (filters.value.is_sms_sent !== "") {
        filtered = filtered.filter((item) => {
          if (filters.value.is_sms_sent === "1") {
            return item.is_sms_sent === 1;
          } else {
            return item.is_sms_sent === null || item.is_sms_sent === 0;
          }
        });
      }
      return filtered;
    });
    const totalPages = computed(
      () => Math.ceil(filteredData.value.length / itemsPerPage.value)
    );
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredData.value.slice(start, end);
    });
    const visiblePages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const pages = [];
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(total);
        } else if (current >= total - 3) {
          pages.push(1);
          pages.push("...");
          for (let i = total - 4; i <= total; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(total);
        }
      }
      return pages.filter((page) => page !== "...");
    });
    const calculateAge = (dob) => {
      if (!dob) return "N/A";
      const birthDate = new Date(dob);
      const today = /* @__PURE__ */ new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
        age--;
      }
      return age;
    };
    const getEducationBackground = (type) => {
      switch (type) {
        case 1:
          return "General";
        case 2:
          return "Madrasah";
        case 3:
          return "Both";
        default:
          return "Unknown";
      }
    };
    const getEducationBadgeClass = (type) => {
      switch (type) {
        case 1:
          return "bg-blue-100 text-blue-800";
        case 2:
          return "bg-green-100 text-green-800";
        case 3:
          return "bg-purple-100 text-purple-800";
        default:
          return "bg-gray-100 text-gray-800";
      }
    };
    watch(
      [filters, itemsPerPage],
      () => {
        currentPage.value = 1;
      },
      { deep: true }
    );
    useHead({
      title: "Competition Forms - Admin Dashboard"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50 py-8" }, _attrs))}><div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900">Competition Forms</h1><p class="mt-2 text-gray-600"> Manage and view all user competition form submissions </p></div><div class="mb-6 rounded-lg bg-white p-6 shadow-sm"><h2 class="mb-4 text-lg font-semibold text-gray-900">Filters</h2><div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><div class="xl:col-span-2"><label class="block text-sm font-medium text-gray-700 mb-1"> Search </label><input${ssrRenderAttr("value", unref(filters).search)} type="text" placeholder="Search by name, phone, or reg no..." class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Gender </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).gender) ? ssrLooseContain(unref(filters).gender, "") : ssrLooseEqual(unref(filters).gender, "")) ? " selected" : ""}>All Genders</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).gender) ? ssrLooseContain(unref(filters).gender, "1") : ssrLooseEqual(unref(filters).gender, "1")) ? " selected" : ""}>Male</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).gender) ? ssrLooseContain(unref(filters).gender, "2") : ssrLooseEqual(unref(filters).gender, "2")) ? " selected" : ""}>Female</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Education </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).education_background) ? ssrLooseContain(unref(filters).education_background, "") : ssrLooseEqual(unref(filters).education_background, "")) ? " selected" : ""}>All Education</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).education_background) ? ssrLooseContain(unref(filters).education_background, "1") : ssrLooseEqual(unref(filters).education_background, "1")) ? " selected" : ""}>General</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).education_background) ? ssrLooseContain(unref(filters).education_background, "2") : ssrLooseEqual(unref(filters).education_background, "2")) ? " selected" : ""}>Madrasah</option><option value="3"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).education_background) ? ssrLooseContain(unref(filters).education_background, "3") : ssrLooseEqual(unref(filters).education_background, "3")) ? " selected" : ""}>Both</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Recitation </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_recitation) ? ssrLooseContain(unref(filters).is_recitation, "") : ssrLooseEqual(unref(filters).is_recitation, "")) ? " selected" : ""}>All</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_recitation) ? ssrLooseContain(unref(filters).is_recitation, "1") : ssrLooseEqual(unref(filters).is_recitation, "1")) ? " selected" : ""}>Yes</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_recitation) ? ssrLooseContain(unref(filters).is_recitation, "0") : ssrLooseEqual(unref(filters).is_recitation, "0")) ? " selected" : ""}>No</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Need Training </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).need_training) ? ssrLooseContain(unref(filters).need_training, "") : ssrLooseEqual(unref(filters).need_training, "")) ? " selected" : ""}>All</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).need_training) ? ssrLooseContain(unref(filters).need_training, "1") : ssrLooseEqual(unref(filters).need_training, "1")) ? " selected" : ""}>Yes</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).need_training) ? ssrLooseContain(unref(filters).need_training, "0") : ssrLooseEqual(unref(filters).need_training, "0")) ? " selected" : ""}>No</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> Status </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "") : ssrLooseEqual(unref(filters).is_active, "")) ? " selected" : ""}>All Status</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "1") : ssrLooseEqual(unref(filters).is_active, "1")) ? " selected" : ""}>Active</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_active) ? ssrLooseContain(unref(filters).is_active, "0") : ssrLooseEqual(unref(filters).is_active, "0")) ? " selected" : ""}>Inactive</option></select></div><div><label class="block text-sm font-medium text-gray-700 mb-1"> SMS Status </label><select class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_sms_sent) ? ssrLooseContain(unref(filters).is_sms_sent, "") : ssrLooseEqual(unref(filters).is_sms_sent, "")) ? " selected" : ""}>All SMS</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_sms_sent) ? ssrLooseContain(unref(filters).is_sms_sent, "1") : ssrLooseEqual(unref(filters).is_sms_sent, "1")) ? " selected" : ""}>Sent</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(filters).is_sms_sent) ? ssrLooseContain(unref(filters).is_sms_sent, "0") : ssrLooseEqual(unref(filters).is_sms_sent, "0")) ? " selected" : ""}>Not Sent</option></select></div><div class="flex items-end"><button class="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"> Clear Filters </button></div></div></div><div class="mb-4 flex items-center justify-between"><p class="text-sm text-gray-600"> Showing ${ssrInterpolate((unref(currentPage) - 1) * unref(itemsPerPage) + 1)} to ${ssrInterpolate(Math.min(unref(currentPage) * unref(itemsPerPage), unref(filteredData).length))} of ${ssrInterpolate(unref(filteredData).length)} results </p><div class="flex items-center space-x-2"><label class="text-sm text-gray-600">Show:</label><select class="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"><option value="10"${ssrIncludeBooleanAttr(Array.isArray(unref(itemsPerPage)) ? ssrLooseContain(unref(itemsPerPage), "10") : ssrLooseEqual(unref(itemsPerPage), "10")) ? " selected" : ""}>10</option><option value="25"${ssrIncludeBooleanAttr(Array.isArray(unref(itemsPerPage)) ? ssrLooseContain(unref(itemsPerPage), "25") : ssrLooseEqual(unref(itemsPerPage), "25")) ? " selected" : ""}>25</option><option value="50"${ssrIncludeBooleanAttr(Array.isArray(unref(itemsPerPage)) ? ssrLooseContain(unref(itemsPerPage), "50") : ssrLooseEqual(unref(itemsPerPage), "50")) ? " selected" : ""}>50</option><option value="100"${ssrIncludeBooleanAttr(Array.isArray(unref(itemsPerPage)) ? ssrLooseContain(unref(itemsPerPage), "100") : ssrLooseEqual(unref(itemsPerPage), "100")) ? " selected" : ""}>100</option></select></div></div><div class="overflow-hidden rounded-lg bg-white shadow"><div class="overflow-x-auto"><table class="min-w-full divide-y divide-gray-200"><thead class="bg-gray-50"><tr><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Registration Info </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Personal Details </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Education </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Contact </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Status </th><th class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"> Actions </th></tr></thead><tbody class="divide-y divide-gray-200 bg-white"><!--[-->`);
      ssrRenderList(unref(paginatedData), (form) => {
        _push(`<tr class="hover:bg-gray-50"><td class="px-6 py-4 whitespace-nowrap"><div class="text-sm"><div class="font-medium text-gray-900">${ssrInterpolate(form.reg_no)}</div><div class="text-gray-500">ID: ${ssrInterpolate(form.id)}</div></div></td><td class="px-6 py-4"><div class="text-sm"><div class="font-medium text-gray-900">${ssrInterpolate(form.name_en)}</div><div class="text-gray-600 mb-1">${ssrInterpolate(form.name_bn)}</div><div class="flex items-center space-x-2"><span class="${ssrRenderClass([
          form.gender === 1 ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800",
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        ])}">${ssrInterpolate(form.gender === 1 ? "Male" : "Female")}</span><span class="text-gray-500">${ssrInterpolate(calculateAge(form.dob))} years </span></div></div></td><td class="px-6 py-4"><div class="text-sm"><div class="${ssrRenderClass([getEducationBadgeClass(form.education_background), "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1"])}">${ssrInterpolate(getEducationBackground(form.education_background))}</div><div class="text-gray-600 text-xs">`);
        if (form.school_name) {
          _push(`<div> School: ${ssrInterpolate(form.school_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.college_name) {
          _push(`<div> College: ${ssrInterpolate(form.college_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.university_name) {
          _push(`<div> University: ${ssrInterpolate(form.university_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        if (form.madrasah_name) {
          _push(`<div> Madrasah: ${ssrInterpolate(form.madrasah_name)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></td><td class="px-6 py-4"><div class="text-sm"><div class="text-gray-900">${ssrInterpolate(form.phone)}</div><div class="text-gray-600 text-xs">${ssrInterpolate(form.address)}</div>`);
        if (form.occupation) {
          _push(`<div class="text-gray-500 text-xs mt-1">${ssrInterpolate(form.occupation)}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="px-6 py-4 whitespace-nowrap"><div class="space-y-1"><div class="flex items-center space-x-1"><span class="${ssrRenderClass([
          form.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        ])}">${ssrInterpolate(form.is_active ? "Active" : "Inactive")}</span></div><div class="flex items-center space-x-1"><span class="${ssrRenderClass([
          form.is_recitation ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-800",
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        ])}">${ssrInterpolate(form.is_recitation ? "Recitation" : "No Recitation")}</span></div><div class="flex items-center space-x-1">`);
        if (form.need_training !== null) {
          _push(`<span class="${ssrRenderClass([
            form.need_training ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-800",
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
          ])}">${ssrInterpolate(form.need_training ? "Needs Training" : "No Training")}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center space-x-1"><span class="${ssrRenderClass([
          form.is_sms_sent ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800",
          "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
        ])}">${ssrInterpolate(form.is_sms_sent ? "SMS Sent" : "SMS Pending")}</span></div></div></td><td class="px-6 py-4 whitespace-nowrap text-sm font-medium"><div class="flex space-x-2"><button class="text-blue-600 hover:text-blue-900"> View </button><button class="text-green-600 hover:text-green-900"> Edit </button><button class="text-red-600 hover:text-red-900"> Delete </button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
      if (unref(paginatedData).length === 0) {
        _push(`<div class="py-12 text-center"><div class="mx-auto h-12 w-12 text-gray-400"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><h3 class="mt-2 text-sm font-medium text-gray-900">No forms found</h3><p class="mt-1 text-sm text-gray-500"> Try adjusting your search or filter criteria. </p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(totalPages) > 1) {
        _push(`<div class="mt-6 flex items-center justify-between"><div class="flex items-center"><p class="text-sm text-gray-700"> Page ${ssrInterpolate(unref(currentPage))} of ${ssrInterpolate(unref(totalPages))}</p></div><nav class="flex items-center space-x-2"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> First </button><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> Previous </button><div class="flex space-x-1"><!--[-->`);
        ssrRenderList(unref(visiblePages), (page) => {
          _push(`<button class="${ssrRenderClass([
            "rounded-md px-3 py-2 text-sm font-medium",
            unref(currentPage) === page ? "bg-blue-600 text-white" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          ])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> Next </button><button${ssrIncludeBooleanAttr(unref(currentPage) === unref(totalPages)) ? " disabled" : ""} class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"> Last </button></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-CKIRzNB6.mjs.map
