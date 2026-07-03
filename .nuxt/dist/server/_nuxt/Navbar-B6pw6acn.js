import { _ as __nuxt_component_0 } from "./nuxt-link-Cl1STy2k.js";
import { mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext, unref, createVNode, createBlock, createCommentVNode, openBlock, ref, computed } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderAttr } from "vue/server-renderer";
import { _ as _export_sfc, e as useStudentAuthInfoStore, f as useAdminAuthInfoStore } from "../server.mjs";
import { u as useStudentInfoStore } from "./studentInfo-CyG5HN7S.js";
import { u as useCompetitionFormStore } from "./competitionForm-ClJDHIES.js";
import "./authenticatedAxios-DoF-q_wg.js";
import "/home/nur/Documents/WEB/qrc-img/frontend/node_modules/hookable/dist/index.mjs";
import "./adminAuthenticatedAxios-boaAp65y.js";
import { u as useMenuStore } from "./menuStore-DjC5MiZx.js";
const _sfc_main$4 = {
  __name: "Menus",
  __ssrInlineRender: true,
  props: {
    customClass: {
      type: String,
      default: "relative py-3 block px-5 font-semibold text-lg base-trans whitespace-nowrap border-b-2"
    }
  },
  setup(__props) {
    const menus = [
      { id: 1, title: "Home", url: "/" },
      { id: 4, title: "Registration", url: "/registration" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<menu${ssrRenderAttrs(mergeProps(_ctx.$attrs, _attrs))} data-v-4c97f241><!--[-->`);
      ssrRenderList(menus, (menu, key) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key,
          to: menu.url,
          class: [
            "relative px-6 py-3 font-semibold block text-lg base-trans whitespace-nowrap border-b-2 sm:border-b-0 sm:px-0 sm:py-0 link sm:flex sm:justify-center sm:text-[18px]"
          ]
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(menu.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString(menu.title), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></menu>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar/Menus.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4c97f241"]]);
const icons$1 = {
  "Dashboard": `
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tra#000000erCarrier" stroke-line#000000#000000ap="round" stroke-linejoin="round"></g><g id="SVGRepo_i#000000onCarrier"> <path d="M55.64 22.751H35.09C34.5596 22.751 34.0509 22.9617 33.6758 23.3368C33.3007 23.7118 33.09 24.2205 33.09 24.751V55.571C33.0916 56.1009 33.3028 56.6087 33.6775 56.9834C34.0523 57.3582 34.5601 57.5694 35.09 57.571H55.64C56.1699 57.5694 56.6777 57.3582 57.0525 56.9834C57.4272 56.6087 57.6384 56.1009 57.64 55.571V24.751C57.64 24.2205 57.4293 23.7118 57.0542 23.3368C56.6791 22.9617 56.1704 22.751 55.64 22.751Z" fill="currentColor"></path> <path d="M55.64 5.62695H35.09C34.5596 5.62695 34.0509 5.83767 33.6758 6.21274C33.3007 6.58781 33.09 7.09652 33.09 7.62695V17.8969C33.0916 18.4269 33.3028 18.9347 33.6775 19.3094C34.0523 19.6841 34.5601 19.8954 35.09 19.8969H55.64C56.1699 19.8954 56.6777 19.6841 57.0525 19.3094C57.4272 18.9347 57.6384 18.4269 57.64 17.8969V7.62695C57.64 7.09652 57.4293 6.58781 57.0542 6.21274C56.6791 5.83767 56.1704 5.62695 55.64 5.62695Z" fill="#000000"></path> <path d="M28.24 36.451H7.7C6.59543 36.451 5.7 37.3465 5.7 38.451V55.5711C5.7 56.6756 6.59543 57.5711 7.7 57.5711H28.24C29.3446 57.5711 30.24 56.6756 30.24 55.5711V38.451C30.24 37.3465 29.3446 36.451 28.24 36.451Z" fill="#000000"></path> <path d="M28.24 5.62697H7.70002C7.43712 5.62604 7.17661 5.67714 6.93355 5.77733C6.69048 5.87751 6.46964 6.02477 6.28373 6.21068C6.09783 6.39658 5.95054 6.61742 5.85035 6.86049C5.75017 7.10355 5.6991 7.36406 5.70002 7.62697V31.557C5.70002 32.0874 5.91074 32.5961 6.28581 32.9712C6.66088 33.3462 7.16959 33.557 7.70002 33.557H28.24C28.7704 33.557 29.2791 33.3462 29.6542 32.9712C30.0293 32.5961 30.24 32.0874 30.24 31.557V7.62697C30.2409 7.36406 30.1898 7.10355 30.0896 6.86049C29.9895 6.61742 29.8422 6.39658 29.6563 6.21068C29.4704 6.02477 29.2495 5.87751 29.0065 5.77733C28.7634 5.67714 28.5029 5.62604 28.24 5.62697Z" fill="currentColor"></path> </g></svg>
  `,
  "Profile": `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
   </svg>
  `,
  "ViewProfile": `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 19.2857L15.8 21L20 17M4 21C4 17.134 7.13401 14 11 14C12.4872 14 13.8662 14.4638 15 15.2547M15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  `,
  "UpdateProfile": `
  <svg fill="currentColor" viewBox="0 0 24 24" id="edit-user-5" xmlns="http://www.w3.org/2000/svg" class="icon line"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path id="primary" d="M17,9.27A2.44,2.44,0,0,0,17,9a6,6,0,1,0-6.44,6" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path><path id="primary-2" data-name="primary" d="M7,13.7A7,7,0,0,0,3,20a1,1,0,0,0,1,1H9" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path><path id="primary-3" data-name="primary" d="M20.71,16.09,15.8,21H13V18.2l4.91-4.91a1,1,0,0,1,1.4,0l1.4,1.4A1,1,0,0,1,20.71,16.09Z" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></g></svg>
  `,
  "PostJobs": `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"></circle> <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
  `,
  "MyJobs": `
    <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M5.508 2.466L4.356 5H2.5A1.5 1.5 0 001 6.5v1.882l.503.251a19 19 0 0016.994 0L19 8.382V6.5A1.5 1.5 0 0017.5 5h-1.856l-1.152-2.534A2.5 2.5 0 0012.216 1H7.784a2.5 2.5 0 00-2.276 1.466zM7.784 3a.5.5 0 00-.455.293L6.553 5h6.894l-.776-1.707A.5.5 0 0012.216 3H7.784z" fill="currentColor"></path><path d="M19 10.613a20.986 20.986 0 01-8 2.003V14a1 1 0 01-2 0v-1.384c-2.74-.131-5.46-.798-8-2.003V17.5A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-6.887z" fill="currentColor"></path></g></svg>
  `,
  "Jobs": `
    <svg fill="currentColor" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490 490" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon points="33.1,364 126,456.9 126,364 "></polygon> <g> <path d="M301.3,196.6h-20.5v30.6h20.5c10.4,0,18.9-6.9,18.9-15.3C320.2,203.5,311.7,196.6,301.3,196.6z"></path> <ellipse cx="195.9" cy="186.2" rx="18.3" ry="41"></ellipse> <path d="M301.3,145.3h-20.5v30.6h20.5c10.4,0,18.9-6.9,18.9-15.3C320.2,152.1,311.7,145.3,301.3,145.3z"></path> <path d="M0,0v336.4h140c7.4,0,13.6,6.2,13.6,13.6v140H490V0H0z M131,211.7c0,19.9-20,36.1-44.6,36.1s-44.6-16.2-44.6-36.1v-1.9 c0-5.7,5.7-10.3,12.7-10.3s12.7,4.6,12.7,10.3v1.9c0,8.5,8.6,15.5,19.1,15.5s19.1-7,19.1-15.5V135c0-5.7,5.7-10.3,12.7-10.3 s12.7,4.6,12.7,10.3v76.7H131z M195.9,247.8c-24.2,0-43.8-27.6-43.8-61.6s19.6-61.6,43.8-61.6s43.8,27.6,43.8,61.6 S220.1,247.8,195.9,247.8z M345.7,211.9c0,19.8-19.9,35.9-44.4,35.9h-33.2c-7,0-12.7-4.6-12.7-10.3v-51.2c0,0,0,0,0-0.1 c0,0,0,0,0-0.1V135c0-5.7,5.7-10.3,12.7-10.3h33.2c24.5,0,44.4,16.1,44.4,35.9c0,10-5.1,19.1-13.4,25.7 C340.6,192.8,345.7,201.9,345.7,211.9z M403.9,247.8c-12.2,0-24-4.1-32.3-11.3c-4.8-4.1-4.6-10.7,0.5-14.6 c5.1-3.9,13.2-3.7,18,0.4c3.6,3.1,8.5,4.8,13.8,4.8c10.4,0,18.9-6.9,18.9-15.3s-8.5-15.3-18.9-15.3c-24.5,0-44.4-16.1-44.4-36 c0-19.8,19.9-36,44.4-36c12.2,0,24,4.1,32.3,11.3c4.8,4.1,4.6,10.7-0.5,14.6c-5.1,3.9-13.2,3.7-18-0.4c-3.6-3.1-8.5-4.8-13.8-4.8 c-10.4,0-18.9,6.9-18.9,15.3s8.5,15.3,18.9,15.3c24.5,0,44.4,16.1,44.4,36S428.3,247.8,403.9,247.8z"></path> </g> </g> </g> </g></svg>
  `,
  "Circular": `
    <svg fill="currentColor" viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect height="1" width="12" x="10" y="29"></rect><rect height="1" width="12" x="10" y="2"></rect><rect height="1" width="4" x="9" y="5"></rect><rect height="1" width="4" x="9" y="9"></rect><rect height="1" width="10" x="13" y="12"></rect><rect height="1" width="3" x="9" y="12"></rect><rect height="1" width="10" x="13" y="15"></rect><rect height="1" width="3" x="9" y="15"></rect><rect height="1" width="10" x="13" y="18"></rect><rect height="1" width="3" x="9" y="18"></rect><rect height="1" width="10" x="13" y="21"></rect><rect height="1" width="3" x="9" y="21"></rect><rect height="1" width="10" x="13" y="24"></rect><rect height="1" width="3" x="9" y="24"></rect><rect height="1" transform="translate(9.5 41.5) rotate(-90)" width="20" x="15.5" y="15.5"></rect><path d="M22,2V3h2a1,1,0,0,1,1,1V6h1V4a2,2,0,0,0-2-2Z"></path><rect height="1" transform="translate(-9.5 22.5) rotate(-90)" width="20" x="-3.5" y="15.5"></rect><path d="M10,2V3H8A1,1,0,0,0,7,4V6H6V4A2,2,0,0,1,8,2Z"></path><path d="M22,30V29h2a1,1,0,0,0,1-1V26h1v2a2,2,0,0,1-2,2Z"></path><path d="M10,30V29H8a1,1,0,0,1-1-1V26H6v2a2,2,0,0,0,2,2Z"></path><rect height="5" width="1" x="9" y="5"></rect><rect height="5" width="1" x="12" y="5"></rect></g></svg>
  `,
  "AppliedJobs": `
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" d="M5.508 2.466L4.356 5H2.5A1.5 1.5 0 001 6.5v1.882l.503.251a19 19 0 0016.994 0L19 8.382V6.5A1.5 1.5 0 0017.5 5h-1.856l-1.152-2.534A2.5 2.5 0 0012.216 1H7.784a2.5 2.5 0 00-2.276 1.466zM7.784 3a.5.5 0 00-.455.293L6.553 5h6.894l-.776-1.707A.5.5 0 0012.216 3H7.784z" fill="currentColor"></path><path d="M19 10.613a20.986 20.986 0 01-8 2.003V14a1 1 0 01-2 0v-1.384c-2.74-.131-5.46-.798-8-2.003V17.5A1.5 1.5 0 002.5 19h15a1.5 1.5 0 001.5-1.5v-6.887z" fill="currentColor"></path></g></svg>
  `,
  "JobAlert": `
  <svg fill="currentColor" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M13.5 27c-.276.004-.504.224-.5.5v.5c0 1.1.9 2 2 2s2-.9 2-2v-.5c0-.333-.25-.5-.5-.5s-.5.162-.5.5v.5c0 .563-.437 1-1 1s-1-.437-1-1v-.5c.004-.282-.218-.504-.5-.5zM15 0c-1.65 0-3 1.35-3 3v.5c0 .65 1 .66 1 0V3c0-1.11.89-2 2-2 1.11 0 2 .89 2 2v.5c0 .654 1 .66 1 0V3c0-1.65-1.35-3-3-3zm7.5 3C25.534 3 28 5.468 28 8.5c0 .665-1 .665-1 0C27 6.01 24.994 4 22.5 4c-.667 0-.663-1 0-1zm-15 0C4.468 3 2 5.468 2 8.5c0 .665 1 .665 1 0C3 6.01 5.01 4 7.5 4c.668 0 .665-1 0-1zM15 5c-4.32 0-6.688 1.81-7.838 4.102C6.012 11.394 6 14.096 6 16c0 2 0 5.817-2.88 9.174A.5.5 0 0 0 3.5 26h23a.5.5 0 0 0 .38-.826C24 21.817 24 18 24 16c0-1.904-.013-4.606-1.162-6.898C21.688 6.81 19.32 5 15 5zm0 1c4.054 0 5.937 1.543 6.943 3.55C22.95 11.56 23 14.108 23 16c0 1.852.107 5.567 2.586 9H4.414C6.894 21.567 7 17.852 7 16c0-1.893.05-4.44 1.057-6.45C9.063 7.544 10.947 6 15 6z"></path></g></svg>
  `,
  "Settings": `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5"></circle> <path opacity="0.5" d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z" stroke="currentColor" stroke-width="2"></path> </g></svg>
  `,
  "LogOut": `
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.5" d="M12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"></path> <path d="M10 12H20M20 12L17 9M20 12L17 15" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  `
};
function getIcons$1(icon, style = "") {
  try {
    const iconSVG = icons$1[icon];
    const svg = iconSVG.replace("<svg", `<svg class="${style}"`);
    return svg;
  } catch (error) {
    console.error(error);
  }
}
const _sfc_main$3 = {
  __name: "SideBarItems",
  __ssrInlineRender: true,
  props: {
    links: {
      type: Array,
      required: true
    },
    customClass: {
      type: String
      // default: "",
    }
  },
  setup(__props) {
    useStudentAuthInfoStore();
    useStudentInfoStore();
    useCompetitionFormStore();
    useAdminAuthInfoStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "space-y-2" }, _attrs))} data-v-8d458ede><!--[-->`);
      ssrRenderList(__props.links, (link, key) => {
        _push(`<div class="relative" data-v-8d458ede>`);
        if (link.link) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: link.link,
            class: [
              __props.customClass || "group relative flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:text-emerald-700 hover:bg-emerald-50 transition-all duration-200 ease-out hover:shadow-sm hover:scale-[1.02] transform",
              "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-0 before:bg-emerald-600 before:rounded-r-full before:transition-all before:duration-300",
              "hover:before:h-8",
              "focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:bg-emerald-50"
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-emerald-600 transition-colors duration-200" data-v-8d458ede${_scopeId}><div data-v-8d458ede${_scopeId}>${unref(getIcons$1)(link.icon, "w-6 h-6") ?? ""}</div></div><span class="flex-1 font-semibold text-sm sm:text-base whitespace-nowrap truncate" data-v-8d458ede${_scopeId}>${ssrInterpolate(link.title)}</span>`);
                if (link.badge) {
                  _push2(`<div class="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm" data-v-8d458ede${_scopeId}>${ssrInterpolate(link.badge)}</div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-v-8d458ede${_scopeId}><svg class="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8d458ede${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" data-v-8d458ede${_scopeId}></path></svg></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-emerald-600 transition-colors duration-200" }, [
                    createVNode("div", {
                      innerHTML: unref(getIcons$1)(link.icon, "w-6 h-6")
                    }, null, 8, ["innerHTML"])
                  ]),
                  createVNode("span", { class: "flex-1 font-semibold text-sm sm:text-base whitespace-nowrap truncate" }, toDisplayString(link.title), 1),
                  link.badge ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-[1.25rem] h-5 flex items-center justify-center shadow-sm"
                  }, toDisplayString(link.badge), 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "opacity-0 group-hover:opacity-100 transition-opacity duration-200" }, [
                    (openBlock(), createBlock("svg", {
                      class: "w-4 h-4 text-emerald-600",
                      fill: "none",
                      stroke: "currentColor",
                      viewBox: "0 0 24 24"
                    }, [
                      createVNode("path", {
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round",
                        "stroke-width": "2",
                        d: "M9 5l7 7-7 7"
                      })
                    ]))
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        } else {
          _push(`<button class="${ssrRenderClass([
            "cursor-pointer",
            __props.customClass || "group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-medium text-gray-700 hover:text-red-700 hover:bg-red-50 transition-all duration-200 ease-out hover:shadow-sm hover:scale-[1.02] transform",
            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-0 before:bg-red-600 before:rounded-r-full before:transition-all before:duration-300",
            "hover:before:h-8",
            "focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:bg-red-50"
          ])}" data-v-8d458ede><div class="flex-shrink-0 w-6 h-6 text-gray-500 group-hover:text-red-600 transition-colors duration-200" data-v-8d458ede><div data-v-8d458ede>${unref(getIcons$1)(link.icon, "w-6 h-6") ?? ""}</div></div><span class="flex-1 font-semibold text-sm sm:text-base whitespace-nowrap truncate" data-v-8d458ede>${ssrInterpolate(link.title)}</span><div class="opacity-0 group-hover:opacity-100 transition-opacity duration-200" data-v-8d458ede><svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-v-8d458ede><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" data-v-8d458ede></path></svg></div></button>`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/SideBarItems.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SideBarItems = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-8d458ede"]]);
const _imports_0 = "" + __buildAssetsURL("logo.C06kxdrM.png");
const _sfc_main$2 = {
  __name: "Disclosure",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative" }, _attrs))}><button>`);
      ssrRenderSlot(_ctx.$slots, "disclosureButton", {}, null, _push, _parent);
      _push(`</button><ul class="${ssrRenderClass([{ "invisible opacity-0": !unref(isOpen) }, "absolute w-fit shadow-2xl right-0 top-full bg-white dark:bg-dark-2 mt-1 base-trans rounded-md dark:text-dark-text-1 font-semibold z-50"])}">`);
      ssrRenderSlot(_ctx.$slots, "disclosureMenu", {
        onClick: ($event) => isOpen.value = !unref(isOpen)
      }, null, _push, _parent);
      _push(`</ul></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Disclosure/Disclosure.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "CustomSideMenu",
  __ssrInlineRender: true,
  setup(__props) {
    const isOpen = ref(false);
    ref(false);
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="relative"><button>`);
      ssrRenderSlot(_ctx.$slots, "sideMenuButton", {}, null, _push, _parent);
      _push(`</button></div><ul id="disMenu" class="${ssrRenderClass([
        "absolute top-0 right-0 left-10 bottom-0 z-20 min-h-screen bg-white base-trans",
        unref(isOpen) ? "translate-x-0" : "translate-x-[120%]"
      ])}"><div class="sm:hidden fixed top-5 right-5 w-fit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd"></path></svg></div>`);
      ssrRenderSlot(_ctx.$slots, "sideMenu", {
        onClick: ($event) => isOpen.value = !unref(isOpen)
      }, null, _push, _parent);
      _push(`</ul><!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Disclosure/CustomSideMenu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const icons = {
  "icon1": `
    <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 576 576"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="__lottie_element_2">
                <rect width="576" height="576" x="0" y="0"></rect>
              </clipPath>
              <g id="__lottie_element_4">
                <g
                  transform="matrix(1,0,0,1,240,240)"
                  opacity="1"
                  style="display: block"
                >
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      fill="rgb(0,10,180)"
                      fill-opacity="1"
                      d=" M0,-192 C105.96479797363281,-192 192,-105.96479797363281 192,0 C192,105.96479797363281 105.96479797363281,192 0,192 C-105.96479797363281,192 -192,105.96479797363281 -192,0 C-192,-105.96479797363281 -105.96479797363281,-192 0,-192z"
                    ></path>
                  </g>
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
                </g>
              </g>
              <mask id="__lottie_element_4_1" mask-type="alpha">
                <use xlink:href="#__lottie_element_4"></use>
              </mask>
            </defs>
            <g clip-path="url(#__lottie_element_2)">
              <g mask="url(#__lottie_element_4_1)" style="display: block">
                <g transform="matrix(1,0,0,1,472,-96)" opacity="1">
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                    <path
                      fill="rgb(76,214,129)"
                      fill-opacity="1"
                      d=" M0,-84 C46.35960006713867,-84 84,-46.35960006713867 84,0 C84,46.35960006713867 46.35960006713867,84 0,84 C-46.35960006713867,84 -84,46.35960006713867 -84,0 C-84,-46.35960006713867 -46.35960006713867,-84 0,-84z"
                    ></path>
                  </g>
                  <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
                </g>
              </g>
              <g
                transform="matrix(1,0,0,1,48,48)"
                opacity="1"
                style="display: block"
              >
                <g opacity="1" transform="matrix(1,0,0,1,-0.125,0.5)">
                  <path
                    fill="rgb(0,0,0)"
                    fill-opacity="1"
                    d=" M192,0 C298.03900146484375,0 384,85.96099853515625 384,192 C384,298.03900146484375 298.03900146484375,384 192,384 C85.96099853515625,384 0,298.03900146484375 0,192 C0,85.96099853515625 85.96099853515625,0 192,0z M192,36 C105.98100280761719,36 36,105.98100280761719 36,192 C36,278.0190124511719 105.98100280761719,348 192,348 C278.0190124511719,348 348,278.0190124511719 348,192 C348,105.98100280761719 278.0190124511719,36 192,36"
                  ></path>
                </g>
              </g>
              <g
                transform="matrix(1,0,0,1,387.7720031738281,387.7720031738281)"
                opacity="1"
                style="display: block"
              >
                <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                  <path
                    fill="rgb(0,0,0)"
                    fill-opacity="1"
                    d=" M25.45599937438965,0 C25.45599937438965,0 144.45599365234375,119 144.45599365234375,119 C144.45599365234375,119 119,144.45599365234375 119,144.45599365234375 C119,144.45599365234375 0,25.45599937438965 0,25.45599937438965 C0,25.45599937438965 25.45599937438965,0 25.45599937438965,0z"
                  ></path>
                </g>
                <g opacity="1" transform="matrix(1,0,0,1,0,0)"></g>
              </g>
            </g>
    </svg>
    `,
  "signIn": `
    <?xml version="1.0" ?><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g>
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M4 15h2v5h12V4H6v5H4V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6zm6-4V8l5 4-5 4v-3H2v-2h8z" fill="white"/>
    </g></svg>
  `,
  "search": `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="d-flex align-items-center SearchBar_inputIcon__lhgRB"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.4 11.601A5.2 5.2 0 1 0 6.4 1.2a5.2 5.2 0 0 0 0 10.401Zm0 1.2A6.4 6.4 0 1 0 6.4 0a6.4 6.4 0 0 0 0 12.801Zm5.775-1.473 3.824 3.825-.848.848-3.825-3.824.849-.849Z" fill="#727272"></path></svg>
    `,
  "Location": `
    <svg width="14" height="18" viewBox="0 0 14 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="d-flex align-items-center SearchBar_inputIcon__lhgRB"><path fill-rule="evenodd" clip-rule="evenodd" d="M12.738 7.4c0-3.093-2.452-5.6-5.478-5.6-3.025 0-5.477 2.507-5.477 5.6 0 2.788 1.798 5.657 5.477 8.593 3.68-2.936 5.478-5.805 5.478-8.593ZM7.26 17C3.087 13.8 1 10.6 1 7.4 1 3.865 3.803 1 7.26 1s6.26 2.865 6.26 6.4c0 3.2-2.087 6.4-6.26 9.6Zm0-8c.865 0 1.565-.716 1.565-1.6 0-.884-.7-1.6-1.565-1.6-.864 0-1.565.716-1.565 1.6 0 .884.701 1.6 1.565 1.6Zm0 .8c-1.296 0-2.348-1.075-2.348-2.4S5.964 5 7.26 5c1.296 0 2.348 1.075 2.348 2.4S8.556 9.8 7.26 9.8Z" fill="currentColor"></path><path d="m7.26 15.993-.156.195.156.125.156-.125-.156-.195Zm0 1.007-.152.198.152.117.152-.117L7.26 17Zm5.728-9.6c0-3.226-2.56-5.85-5.728-5.85v.5c2.882 0 5.228 2.39 5.228 5.35h.5ZM7.26 1.55c-3.168 0-5.727 2.624-5.727 5.85h.5c0-2.96 2.345-5.35 5.227-5.35v-.5ZM1.533 7.4c0 2.902 1.87 5.835 5.571 8.788l.312-.39C3.76 12.877 2.033 10.073 2.033 7.4h-.5Zm5.883 8.788c3.7-2.953 5.572-5.886 5.572-8.788h-.5c0 2.674-1.726 5.479-5.384 8.397l.312.391Zm-.004.614C3.262 13.619 1.25 10.483 1.25 7.4h-.5c0 3.317 2.162 6.581 6.358 9.798l.304-.396ZM1.25 7.4c0-3.402 2.696-6.15 6.01-6.15v-.5C3.66.75.75 3.733.75 7.4h.5Zm6.01-6.15c3.314 0 6.01 2.748 6.01 6.15h.5c0-3.667-2.91-6.65-6.51-6.65v.5Zm6.01 6.15c0 3.083-2.011 6.219-6.162 9.402l.304.396c4.196-3.217 6.358-6.481 6.358-9.798h-.5ZM7.26 9.25c1.008 0 1.815-.834 1.815-1.85h-.5c0 .75-.594 1.35-1.315 1.35v.5ZM9.075 7.4c0-1.016-.807-1.85-1.815-1.85v.5c.721 0 1.315.6 1.315 1.35h.5ZM7.26 5.55c-1.007 0-1.815.834-1.815 1.85h.5c0-.75.594-1.35 1.315-1.35v-.5ZM5.445 7.4c0 1.016.808 1.85 1.815 1.85v-.5c-.72 0-1.315-.6-1.315-1.35h-.5ZM7.26 9.55c-1.153 0-2.098-.957-2.098-2.15h-.5c0 1.458 1.158 2.65 2.598 2.65v-.5ZM5.162 7.4c0-1.193.945-2.15 2.098-2.15v-.5c-1.44 0-2.598 1.192-2.598 2.65h.5ZM7.26 5.25c1.153 0 2.098.957 2.098 2.15h.5c0-1.458-1.158-2.65-2.598-2.65v.5ZM9.358 7.4c0 1.193-.945 2.15-2.098 2.15v.5c1.44 0 2.598-1.192 2.598-2.65h-.5Z" fill="currentColor"></path></svg>
  `,
  "profile": `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
   </svg>
`
};
function getIcons(icon, style = "") {
  try {
    const iconSVG = icons[icon];
    const svg = iconSVG.replace("<svg", `<svg class="${style}"`);
    return svg;
  } catch (error) {
    console.error(error);
  }
}
const _sfc_main = {
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const menuStore = useMenuStore();
    const studentInfoStore = useStudentInfoStore();
    const studentAuthInfoStore = useStudentAuthInfoStore();
    const adminAuthInfoStore = useAdminAuthInfoStore();
    const isMenuHidden = ref(false);
    const isNavHidden = ref(false);
    ref(false);
    const isUserOrAdminLoggedIn = computed(() => {
      return studentAuthInfoStore.isStudentLoggedIn || adminAuthInfoStore.isAdminLoggedIn;
    });
    const profilePicture = computed(() => {
      var _a;
      return (_a = studentInfoStore.user) == null ? void 0 : _a.profile_picture;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NavbarMenus = __nuxt_component_1;
      const _component_SidebarSideBarItems = SideBarItems;
      _push(`<header${ssrRenderAttrs(mergeProps({
        class: [[unref(isNavHidden) ? "translate-y-[-100px]" : "translate-y-0"], "bg-white fixed left-0 right-0 opacity-100 base-trans border-b z-50 print:hidden"]
      }, _attrs))}><nav class="flex flex-row justify-between bg-white items-center sm:justify-between base-width"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "font-bold text-xl 2xl:text-2xl flex items-center sm:h-[70px]"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img class="w-12 sm:w-14 rounded-full mr-3"${ssrRenderAttr("src", _imports_0)} alt=""${_scopeId}><span class="hidden sm:block"${_scopeId}>এসো কুরআন শিখি</span>`);
          } else {
            return [
              createVNode("img", {
                class: "w-12 sm:w-14 rounded-full mr-3",
                src: _imports_0,
                alt: ""
              }),
              createVNode("span", { class: "hidden sm:block" }, "এসো কুরআন শিখি")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(_component_NavbarMenus, {
        class: [[
          unref(isMenuHidden) ? "translate-x-0 left-14 right-0" : "translate-x-[100%] right-0 sm:translate-x-0"
        ], "fixed z-20 bg-white shadow-2xl top-0 left-0 base-trans pt-10 sm:relative lg:gap-3 sm:flex 2xl:gap-5 sm:pl-0 sm:pt-0 min-h-screen sm:min-h-full menu-container"]
      }, null, _parent));
      _push(`<div class="${ssrRenderClass([[unref(isMenuHidden) ? "translate-x-0" : "translate-x-[100vw]"], "sm:hidden absolute base-trans right-5 top-5 z-20"])}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" role="img" data-test="mobile-drawer-close"><path fill="currentColor" fill-rule="evenodd" d="M6.623 5.278a.95.95 0 1 0-1.345 1.345L10.656 12l-5.378 5.377a.95.95 0 1 0 1.345 1.345L12 13.344l5.377 5.378a.95.95 0 0 0 1.345-1.345L13.344 12l5.378-5.377a.95.95 0 0 0-1.345-1.345L12 10.656 6.623 5.278Z" clip-rule="evenodd"></path></svg></div></div><div class="flex items-center gap-2 py-2 sm:py-0"><div>`);
      if (!unref(isUserOrAdminLoggedIn)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/sign-in",
          class: "flex items-center gap-1 text-white py-2 px-5 bg-primary hover:bg-primary-hover base-trans rounded-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${unref(getIcons)("signIn", "w-[20px]") ?? ""}</span><span${_scopeId}>Sign In</span>`);
            } else {
              return [
                createVNode("span", {
                  innerHTML: unref(getIcons)("signIn", "w-[20px]")
                }, null, 8, ["innerHTML"]),
                createVNode("span", null, "Sign In")
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div><div class="hidden sm:block">`);
        _push(ssrRenderComponent(_sfc_main$2, null, {
          disclosureButton: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="hover:bg-gray-200 rounded-full base-trans -mb-1"${_scopeId}>`);
              if (!unref(profilePicture)) {
                _push2(`<span${_scopeId}>${unref(getIcons)("profile", "w-[40px]") ?? ""}</span>`);
              } else {
                _push2(`<img${ssrRenderAttr("src", unref(profilePicture))} alt="" class="w-[40px] rounded-full h-[40px] bg-gray-100"${_scopeId}>`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "hover:bg-gray-200 rounded-full base-trans -mb-1" }, [
                  !unref(profilePicture) ? (openBlock(), createBlock("span", {
                    key: 0,
                    innerHTML: unref(getIcons)("profile", "w-[40px]")
                  }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("img", {
                    key: 1,
                    src: unref(profilePicture),
                    alt: "",
                    class: "w-[40px] rounded-full h-[40px] bg-gray-100"
                  }, null, 8, ["src"]))
                ])
              ];
            }
          }),
          disclosureMenu: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="min-w-[300px] p-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_SidebarSideBarItems, {
                links: unref(menuStore).links
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "min-w-[300px] p-3" }, [
                  createVNode(_component_SidebarSideBarItems, {
                    links: unref(menuStore).links
                  }, null, 8, ["links"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="sm:hidden">`);
        _push(ssrRenderComponent(unref(_sfc_main$1), null, {
          sideMenuButton: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}>`);
              if (!unref(profilePicture)) {
                _push2(`<span${_scopeId}>${unref(getIcons)("profile", "w-[30px] -mb-1") ?? ""}</span>`);
              } else {
                _push2(`<img${ssrRenderAttr("src", unref(profilePicture))} alt="" class="w-[35px] rounded-full h-[40px] bg-gray-100"${_scopeId}>`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", null, [
                  !unref(profilePicture) ? (openBlock(), createBlock("span", {
                    key: 0,
                    innerHTML: unref(getIcons)("profile", "w-[30px] -mb-1")
                  }, null, 8, ["innerHTML"])) : (openBlock(), createBlock("img", {
                    key: 1,
                    src: unref(profilePicture),
                    alt: "",
                    class: "w-[35px] rounded-full h-[40px] bg-gray-100"
                  }, null, 8, ["src"]))
                ])
              ];
            }
          }),
          sideMenu: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_SidebarSideBarItems, {
                links: unref(menuStore).links,
                class: "mt-16",
                customClass: "relative px-6 py-3 flex items-center gap-2 font-semibold text-lg base-trans whitespace-nowrap border-b-2"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_SidebarSideBarItems, {
                  links: unref(menuStore).links,
                  class: "mt-16",
                  customClass: "relative px-6 py-3 flex items-center gap-2 font-semibold text-lg base-trans whitespace-nowrap border-b-2"
                }, null, 8, ["links"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      _push(`</div><div class="sm:hidden"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" role="img"><g fill="currentColor" fill-rule="evenodd"><path d="M21 11H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2ZM3 5h18a1 1 0 0 0 0-2H3a1 1 0 0 0 0 2ZM21 19H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2Z"></path></g></svg></div></div></nav></header>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar/Navbar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  SideBarItems as S,
  _sfc_main as _
};
//# sourceMappingURL=Navbar-B6pw6acn.js.map
