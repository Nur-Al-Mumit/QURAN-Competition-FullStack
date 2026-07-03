import { d as __nuxt_component_0$1 } from './server.mjs';
import { ref, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { u as useStudentInfoStore } from './studentInfo-CyG5HN7S.mjs';
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
import './competitionForm-ClJDHIES.mjs';
import './authenticatedAxios-DoF-q_wg.mjs';

const _sfc_main = {
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const studentInfoStore = useStudentInfoStore();
    const currentTime = ref(/* @__PURE__ */ new Date());
    const dates = {
      registrationEnd: /* @__PURE__ */ new Date("2025-07-30T23:59:59"),
      smsPhase: /* @__PURE__ */ new Date("2025-07-31T23:59:59"),
      primaryRoundStart: /* @__PURE__ */ new Date("2025-08-01T00:00:00"),
      primaryRoundEnd: /* @__PURE__ */ new Date("2025-08-02T23:59:59"),
      trainingStart: /* @__PURE__ */ new Date("2025-08-03T00:00:00"),
      trainingEnd: /* @__PURE__ */ new Date("2025-08-07T23:59:59"),
      finalRound: /* @__PURE__ */ new Date("2025-08-09T00:00:00")
    };
    const progressStages = computed(() => {
      var _a, _b;
      return [
        { id: 1, title: "Account Created", icon: "CheckCircle", completed: true },
        {
          id: 2,
          title: "Competition Registration",
          icon: "Users",
          completed: ((_a = studentInfoStore == null ? void 0 : studentInfoStore.form) == null ? void 0 : _a.reg_no) ? true : false
        },
        {
          id: 3,
          title: "Registration Token Downloaded",
          icon: "BookOpen",
          completed: ((_b = studentInfoStore == null ? void 0 : studentInfoStore.form) == null ? void 0 : _b.reg_no) ? true : false
          // completed: false,
        },
        {
          id: 4,
          title: "Eligibility SMS Received",
          icon: "Bell",
          completed: true
        },
        { id: 5, title: "Training Completed", icon: "BookOpen", completed: false },
        { id: 6, title: "Final Round", icon: "Trophy", completed: false }
      ];
    });
    const userProgress = computed(() => {
      return progressStages.value.findIndex((stage) => stage.completed == false);
    });
    const currentPhase = computed(() => {
      const now = currentTime.value;
      if (now < dates.registrationEnd) {
        return {
          phase: "registration",
          title: "Registration Phase",
          message: "\u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8\u09C7\u09B0 \u09B6\u09C7\u09B7 \u09B8\u09AE\u09AF\u09BC",
          targetDate: dates.registrationEnd,
          status: "completed"
        };
      } else if (now < dates.smsPhase) {
        return {
          phase: "sms",
          title: "SMS Notification Phase",
          message: "\u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC\u09C7\u09B0 \u09A4\u09BE\u09B0\u09BF\u0996 \u0993 \u09B8\u09AE\u09AF\u09BC\u09C7\u09B0 SMS \u0986\u09B8\u09AC\u09C7",
          targetDate: dates.smsPhase,
          status: "active"
        };
      } else if (now < dates.primaryRoundEnd) {
        return {
          phase: "primary",
          title: "Primary Round",
          message: "\u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC \u099A\u09B2\u099B\u09C7",
          targetDate: dates.primaryRoundEnd,
          status: "active"
        };
      } else if (now < dates.trainingEnd) {
        return {
          phase: "training",
          title: "Training Phase",
          message: "\u09AC\u09BF\u09B6\u09C7\u09B7 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3 \u09AA\u09B0\u09CD\u09AC \u099A\u09B2\u099B\u09C7",
          targetDate: dates.trainingEnd,
          status: "active"
        };
      } else if (now < dates.finalRound) {
        return {
          phase: "waiting",
          title: "Waiting for Final",
          message: "\u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC\u09C7\u09B0 \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE\u09AF\u09BC",
          targetDate: dates.finalRound,
          status: "waiting"
        };
      } else {
        return {
          phase: "final",
          title: "Final Round",
          message: "\u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC",
          targetDate: dates.finalRound,
          status: "active"
        };
      }
    });
    const calculateTimeRemaining = (targetDate) => {
      const diff = targetDate - currentTime.value;
      if (diff <= 0) return null;
      const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
      const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
      const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
      const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
      return { days, hours, minutes, seconds };
    };
    computed(
      () => calculateTimeRemaining(currentPhase.value.targetDate)
    );
    const timelineEvents = [
      {
        date: "\u09E9\u09E6 \u099C\u09C1\u09B2\u09BE\u0987",
        title: "\u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09B8\u09AE\u09BE\u09AA\u09CD\u09A4\u09BF",
        description: "\u09B0\u09BE\u09A4 \u09E7\u09E7:\u09EB\u09EF \u09AE\u09BF\u09A8\u09BF\u099F\u09C7\u09B0 \u09AE\u09A7\u09CD\u09AF\u09C7 \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u0995\u09B0\u09C1\u09A8",
        status: currentTime.value > dates.registrationEnd ? "completed" : "active",
        icon: "Users"
      },
      {
        date: "\u09E9\u09E7 \u099C\u09C1\u09B2\u09BE\u0987",
        title: "SMS \u09A8\u09CB\u099F\u09BF\u09AB\u09BF\u0995\u09C7\u09B6\u09A8",
        description: "\u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC\u09C7\u09B0 \u09A4\u09BE\u09B0\u09BF\u0996 \u0993 \u09B8\u09AE\u09AF\u09BC\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF SMS \u09AA\u09BE\u09AC\u09C7\u09A8",
        status: currentTime.value > dates.smsPhase ? "completed" : currentTime.value > dates.registrationEnd ? "active" : "upcoming",
        icon: "Bell"
      },
      {
        date: "\u09E7-\u09E8 \u0986\u0997\u09B8\u09CD\u099F",
        title: "\u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC",
        description: "\u09A6\u09C1\u0987 \u09A6\u09BF\u09A8\u09AC\u09CD\u09AF\u09BE\u09AA\u09C0 \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BF\u09A4 \u09B9\u09AC\u09C7",
        status: currentTime.value > dates.primaryRoundEnd ? "completed" : currentTime.value > dates.primaryRoundStart ? "active" : "upcoming",
        icon: "BookOpen"
      },
      {
        date: "\u09E9-\u09ED \u0986\u0997\u09B8\u09CD\u099F",
        title: "\u09AC\u09BF\u09B6\u09C7\u09B7 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3",
        description: "\u09EB \u09A6\u09BF\u09A8\u09AC\u09CD\u09AF\u09BE\u09AA\u09C0 \u09AB\u09CD\u09B0\u09BF \u09A4\u09BF\u09B2\u09BE\u0993\u09AF\u09BC\u09BE\u09A4 \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3",
        status: currentTime.value > dates.trainingEnd ? "completed" : currentTime.value > dates.trainingStart ? "active" : "upcoming",
        icon: "BookOpen"
      },
      {
        date: "\u09EF \u0986\u0997\u09B8\u09CD\u099F",
        title: "\u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC",
        description: "\u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09B0 \u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC \u0985\u09A8\u09C1\u09B7\u09CD\u09A0\u09BF\u09A4 \u09B9\u09AC\u09C7",
        status: currentTime.value > dates.finalRound ? "completed" : currentTime.value.toDateString() === dates.finalRound.toDateString() ? "active" : "upcoming",
        icon: "Trophy"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-white rounded-2xl shadow-xl" }, _attrs))}><div><div class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"><div class="px-4 py-6"><h1 class="text-2xl md:text-3xl font-bold text-center mb-4"> \u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7 \u0995\u09C1\u09B0\u0986\u09A8 \u09AA\u09BE\u09A0 \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE \u09E7\u09EA\u09EA\u09ED \u09B9\u09BF\u099C\u09B0\u09BF </h1><div class="bg-white/20 backdrop-blur-sm rounded-lg p-4 animate-pulse"><div class="flex items-center justify-center space-x-2"><svg v class="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span class="font-semibold">${ssrInterpolate(unref(currentPhase).message)}</span></div>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></div></div></div><div class="flex justify-center pt-6"><div class="border-emerald-ripple inline-block"><button class="group relative inline-flex items-center justify-center px-8 py-4 sm:text-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 shine-sweep-effect"><span class="relative flex items-center text-2xl sm:text-3xl"><svg class="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u09BF\u099F \u09AA\u09CD\u09B2\u09CD\u09AF\u09BE\u09A8 \u09A6\u09C7\u0996\u09C1\u09A8 </span></button></div></div><div class="p-2 sm:px-4 py-8"><div class="bg-white rounded-xl shadow-lg p-2 sm:p-4 mb-8 border"><h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center"><svg class="w-6 h-6 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> \u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u0997\u09CD\u09B0\u0997\u09A4\u09BF </h2><div class="overflow-x-auto"><div class="relative sm:px-6 w-[500px] sm:w-full"><div class="absolute top-4 sm:top-6 left-8 right-8 sm:left-12 sm:right-12 h-0.5 bg-gray-200"><div class="h-full bg-gradient-to-r from-emerald-500 to-emerald-500 transition-all duration-1000" style="${ssrRenderStyle({
        width: `${unref(userProgress) / unref(progressStages).length * 100}%`
      })}"></div></div><div class="relative flex justify-between overflow-x-auto"><!--[-->`);
      ssrRenderList(unref(progressStages), (stage) => {
        _push(`<div class="flex flex-col items-center min-w-0 flex-1"><div class="${ssrRenderClass([
          "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0",
          stage.completed ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg" : stage.id === unref(userProgress) ? "bg-emerald-100 text-emerald-600 ring-2 sm:ring-4 ring-emerald-200" : "bg-gray-100 text-gray-400"
        ])}">`);
        if (stage.icon === "CheckCircle") {
          _push(`<svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`);
        } else if (stage.icon === "Users") {
          _push(`<svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
        } else if (stage.icon === "BookOpen") {
          _push(`<svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`);
        } else if (stage.icon === "Bell") {
          _push(`<svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`);
        } else if (stage.icon === "Trophy") {
          _push(`<svg class="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="mt-2 sm:mt-3 text-center w-full px-1"><div class="${ssrRenderClass([
          "text-xs sm:text-sm font-medium leading-tight break-words",
          stage.completed ? "text-emerald-600" : "text-gray-500"
        ])}">${ssrInterpolate(stage.title)}</div></div></div>`);
      });
      _push(`<!--]--></div></div></div></div><div class="bg-white rounded-xl shadow-lg p-3 sm:p-4 border"><h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center"><svg class="w-6 h-6 text-emerald-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> \u09AA\u09CD\u09B0\u09A4\u09BF\u09AF\u09CB\u0997\u09BF\u09A4\u09BE\u09B0 \u09B8\u09AE\u09AF\u09BC\u09B8\u09C2\u099A\u09C0 </h2><div class="space-y-4"><!--[-->`);
      ssrRenderList(timelineEvents, (event, index) => {
        _push(`<div class="${ssrRenderClass([
          "flex items-start space-x-4 p-2 sm:p-4 rounded-lgx transition-all duration-300",
          event.status === "completed" ? "bg-emerald-50 border-l-4 border-emerald-500" : event.status === "active" ? "bg-gradient-to-r from-emerald-100 to-teal-100 border-l-4 border-emerald-600 shadow-md" : "bg-gray-100 border-l-4 border-gray-300"
        ])}"><div class="${ssrRenderClass([
          "w-10 h-10 rounded-full flex items-center justify-center",
          event.status === "completed" ? "bg-emerald-500 text-white" : event.status === "active" ? "bg-emerald-600 text-white animate-pulse" : "bg-gray-300 text-gray-500"
        ])}">`);
        if (event.icon === "Users") {
          _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`);
        } else if (event.icon === "Bell") {
          _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`);
        } else if (event.icon === "BookOpen") {
          _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`);
        } else if (event.icon === "Trophy") {
          _push(`<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex-1"><div class="flex items-center space-x-2 sm:space-x-3 mb-1"><h3 class="${ssrRenderClass([
          "font-semibold",
          event.status === "active" ? "text-emerald-700" : "text-gray-700"
        ])}">${ssrInterpolate(event.title)}</h3><span class="${ssrRenderClass([
          "text-sm px-2 py-1 rounded-full whitespace-nowrap",
          event.status === "completed" ? "bg-emerald-100 text-emerald-700" : event.status === "active" ? "bg-emerald-200 text-emerald-800" : "bg-gray-100 text-gray-600"
        ])}">${ssrInterpolate(event.date)}</span></div><p class="text-gray-600 text-sm">${ssrInterpolate(event.description)}</p></div>`);
        if (event.status === "active") {
          _push(`<div class="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="mt-8 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl shadow-lg p-3 sm:p-6 text-white border"><h3 class="text-lg font-semibold mb-2">\u09AC\u09B0\u09CD\u09A4\u09AE\u09BE\u09A8 \u0985\u09AC\u09B8\u09CD\u09A5\u09BE</h3><p class="text-emerald-100 mb-4">`);
      if (unref(currentPhase).phase === "registration") {
        _push(`<span> \u09B0\u09C7\u099C\u09BF\u09B8\u09CD\u099F\u09CD\u09B0\u09C7\u09B6\u09A8 \u099A\u09B2\u09AE\u09BE\u09A8\u0964 \u09A4\u09BE\u09A1\u09BC\u09BE\u09A4\u09BE\u09A1\u09BC\u09BF \u09A8\u09BF\u09AC\u09A8\u09CD\u09A7\u09A8 \u09B8\u09AE\u09CD\u09AA\u09A8\u09CD\u09A8 \u0995\u09B0\u09C1\u09A8! </span>`);
      } else if (unref(currentPhase).phase === "sms") {
        _push(`<span> SMS \u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u0985\u09AA\u09C7\u0995\u09CD\u09B7\u09BE \u0995\u09B0\u09C1\u09A8\u0964 \u0986\u0997\u09BE\u09AE\u09C0\u0995\u09BE\u09B2 \u0986\u09AA\u09A8\u09BE\u09B0 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC\u09C7\u09B0 \u09A4\u09A5\u09CD\u09AF \u09AA\u09BE\u09AC\u09C7\u09A8\u0964 </span>`);
      } else if (unref(currentPhase).phase === "primary") {
        _push(`<span> \u09AA\u09CD\u09B0\u09BE\u09A5\u09AE\u09BF\u0995 \u09AC\u09BE\u099B\u09BE\u0987 \u09AA\u09B0\u09CD\u09AC \u099A\u09B2\u099B\u09C7\u0964 \u09B8\u09AB\u09B2 \u09B9\u09B2\u09C7 \u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0 \u09A7\u09BE\u09AA\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4 \u09A5\u09BE\u0995\u09C1\u09A8\u0964 </span>`);
      } else if (unref(currentPhase).phase === "training") {
        _push(`<span> \u09AA\u09CD\u09B0\u09B6\u09BF\u0995\u09CD\u09B7\u09A3 \u09AA\u09B0\u09CD\u09AC \u099A\u09B2\u099B\u09C7\u0964 \u09A8\u09BF\u09AF\u09BC\u09AE\u09BF\u09A4 \u0985\u0982\u09B6\u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09C1\u09A8\u0964 </span>`);
      } else if (unref(currentPhase).phase === "waiting") {
        _push(`<span> \u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u09AA\u09CD\u09B0\u09B8\u09CD\u09A4\u09C1\u09A4\u09BF \u09A8\u09BF\u09A8\u0964 </span>`);
      } else if (unref(currentPhase).phase === "final") {
        _push(`<span> \u099A\u09C2\u09A1\u09BC\u09BE\u09A8\u09CD\u09A4 \u09AA\u09B0\u09CD\u09AC! \u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u099A\u09C7\u09B7\u09CD\u099F\u09BE \u0995\u09B0\u09C1\u09A8\u0964 </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><div class="flex items-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
      _push(ssrRenderComponent(_component_client_only, null, {}, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(student)/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-S4gwgHPf.mjs.map
