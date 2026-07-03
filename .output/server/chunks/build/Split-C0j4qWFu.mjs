import { _ as __nuxt_component_1 } from './Footer-CyiV92Ny.mjs';
import { ref, mergeProps, unref, isRef, watch, withCtx, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { _ as _sfc_main$4 } from './index-Ctzpa2gy.mjs';
import { _ as _sfc_main$3, S as SideBarItems } from './Navbar-B6pw6acn.mjs';
import { u as useMenuStore } from './menuStore-DjC5MiZx.mjs';
import { defineStore } from 'pinia';
import { f as useAdminAuthInfoStore, _ as _export_sfc, e as useStudentAuthInfoStore, s as storages } from './server.mjs';
import { u as useStudentInfoStore } from './studentInfo-CyG5HN7S.mjs';
import axios from 'axios';
import { a as useAxios } from './authenticatedAxios-DoF-q_wg.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './nuxt-link-Cl1STy2k.mjs';
import './competitionForm-ClJDHIES.mjs';
import 'vue-router';
import 'deep-pick-omit';

const useAdminAuthenticatedAxios = async (endpoint, payLoad, headers, method) => {
  const {
    loggedInData: { token_type, access_token }
  } = useAdminAuthInfoStore();
  const config = ref({
    headers: {
      Authorization: `${token_type} ${access_token}`
    }
  });
  const { data, error } = await useAxios(
    endpoint,
    payLoad,
    config.value,
    method
  );
  return { data, error };
};
async function refreshToken() {
  const authStore = useAdminAuthInfoStore();
  const {
    loggedInData: { refresh_token }
  } = authStore;
  const endPoint = `/auth/admin/refresh`;
  let payload = {
    refresh_token
  };
  try {
    const { data } = await useAxios(endPoint, payload);
    if (data == null ? void 0 : data.data) {
      authStore.loggedInData = data.data;
      authStore.isAdminLoggedIn = true;
      return data.data;
    }
  } catch (refreshError) {
    console.error("Failed to refresh token:", refreshError);
    throw refreshError;
  }
}
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { token_type, access_token } = await refreshToken();
        originalRequest.headers["Authorization"] = `${token_type} ${access_token}`;
        return axios(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const _sfc_main$2 = {
  __name: "ProfilePictureUploadModal",
  __ssrInlineRender: true,
  props: {
    isModalOpen: {
      type: Boolean,
      default: false
    },
    currentImage: String
  },
  emits: ["update:isModalOpen", "upload"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const modalRef = ref(null);
    const isOpen = ref(props.isModalOpen);
    const selectedFile = ref(null);
    const previewImage = ref(null);
    const isUploading = ref(false);
    ref({});
    ref(false);
    watch(
      () => props.isOpen,
      (newVal) => {
        if (!newVal) {
          resetForm();
        }
      }
    );
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit");
        return;
      }
      selectedFile.value = file;
      previewImage.value = URL.createObjectURL(file);
    };
    const removeImage = () => {
      selectedFile.value = null;
      previewImage.value = null;
    };
    const uploadImage = async () => {
      if (!selectedFile.value) return;
      isUploading.value = true;
      try {
        emit("upload", selectedFile.value);
        modalRef.value.handleClose();
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        isUploading.value = false;
      }
    };
    const closeModal = () => {
      emit("update:isModalOpen", false);
    };
    watch(
      () => props.isModalOpen,
      (value) => {
        isOpen.value = value;
      }
    );
    watch(
      () => isOpen.value,
      (value) => {
        emit("update:isModalOpen", value);
      }
    );
    const resetForm = () => {
      selectedFile.value = null;
      previewImage.value = null;
      isUploading.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Modal = _sfc_main$4;
      _push(ssrRenderComponent(_component_Modal, mergeProps({
        "is-open": unref(isOpen),
        "onUpdate:isOpen": ($event) => isRef(isOpen) ? isOpen.value = $event : null,
        ref_key: "modalRef",
        ref: modalRef
      }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5 pb-0"${_scopeId}><h1 class="text-xl font-bold text-center text-gray-800"${_scopeId}> \u2728 Update Your Avatar </h1></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5 pb-0" }, [
                createVNode("h1", { class: "text-xl font-bold text-center text-gray-800" }, " \u2728 Update Your Avatar ")
              ])
            ];
          }
        }),
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-5"${_scopeId}><div class="relative mx-auto w-40 h-40 mb-6"${_scopeId}><div class="absolute inset-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors overflow-hidden"${_scopeId}>`);
            if (!unref(previewImage) && __props.currentImage) {
              _push2(`<img${ssrRenderAttr("src", __props.currentImage)} class="w-full h-full object-cover"${_scopeId}>`);
            } else if (unref(previewImage)) {
              _push2(`<img${ssrRenderAttr("src", unref(previewImage))} class="w-full h-full object-cover"${_scopeId}>`);
            } else {
              _push2(`<!--[--><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"${_scopeId}></path></svg><p class="text-sm text-gray-500"${_scopeId}>Add Photo</p><!--]-->`);
            }
            _push2(`</div><label class="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition-colors"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"${_scopeId}></path></svg><input type="file" accept="image/*" class="hidden"${_scopeId}></label>`);
            if (unref(previewImage) || __props.currentImage) {
              _push2(`<button class="absolute top-0 right-0 bg-red-500 p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"${_scopeId}><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"${_scopeId}></path></svg></button>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="text-center text-sm text-gray-500 mb-6"${_scopeId}><p${_scopeId}>Recommended size: 500\xD7500 pixels</p><p${_scopeId}>Max file size: 5MB</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-5" }, [
                createVNode("div", { class: "relative mx-auto w-40 h-40 mb-6" }, [
                  createVNode("div", { class: "absolute inset-0 flex flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors overflow-hidden" }, [
                    !unref(previewImage) && __props.currentImage ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: __props.currentImage,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : unref(previewImage) ? (openBlock(), createBlock("img", {
                      key: 1,
                      src: unref(previewImage),
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src"])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "h-8 w-8 mx-auto text-gray-400 mb-2",
                        fill: "none",
                        viewBox: "0 0 24 24",
                        stroke: "currentColor"
                      }, [
                        createVNode("path", {
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "M12 6v6m0 0v6m0-6h6m-6 0H6"
                        })
                      ])),
                      createVNode("p", { class: "text-sm text-gray-500" }, "Add Photo")
                    ], 64))
                  ]),
                  createVNode("label", { class: "absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition-colors" }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-5 w-5 text-white",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z",
                        "clip-rule": "evenodd"
                      })
                    ])),
                    createVNode("input", {
                      type: "file",
                      accept: "image/*",
                      class: "hidden",
                      onChange: handleFileChange
                    }, null, 32)
                  ]),
                  unref(previewImage) || __props.currentImage ? (openBlock(), createBlock("button", {
                    key: 0,
                    onClick: removeImage,
                    class: "absolute top-0 right-0 bg-red-500 p-1 rounded-full shadow-md hover:bg-red-600 transition-colors"
                  }, [
                    (openBlock(), createBlock("svg", {
                      xmlns: "http://www.w3.org/2000/svg",
                      class: "h-4 w-4 text-white",
                      viewBox: "0 0 20 20",
                      fill: "currentColor"
                    }, [
                      createVNode("path", {
                        "fill-rule": "evenodd",
                        d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
                        "clip-rule": "evenodd"
                      })
                    ]))
                  ])) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "text-center text-sm text-gray-500 mb-6" }, [
                  createVNode("p", null, "Recommended size: 500\xD7500 pixels"),
                  createVNode("p", null, "Max file size: 5MB")
                ])
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-center gap-3 p-5 pt-0"${_scopeId}><button class="px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"${_scopeId}> Maybe Later </button><button${ssrIncludeBooleanAttr(!unref(selectedFile) || unref(isUploading)) ? " disabled" : ""} class="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"${_scopeId}>${ssrInterpolate(unref(isUploading) ? "Uploading..." : "Save Avatar")}</button></div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-center gap-3 p-5 pt-0" }, [
                createVNode("button", {
                  onClick: closeModal,
                  class: "px-5 py-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                }, " Maybe Later "),
                createVNode("button", {
                  onClick: uploadImage,
                  disabled: !unref(selectedFile) || unref(isUploading),
                  class: "px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                }, toDisplayString(unref(isUploading) ? "Uploading..." : "Save Avatar"), 9, ["disabled"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProfilePictureUploadModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useSideBarStore = defineStore(
  "SideBarStore",
  () => {
    let user = ref({});
    return { user };
  },
  {
    persist: {
      storage: storages.cookies({
        maxAge: 60 * 60 * 24 * 180,
        secure: true
      })
    }
  }
);
const useAdminInfoStore = defineStore(
  "AdminInfoStores",
  () => {
    let admin = ref(null);
    let isLoading = ref(false);
    let profileLoaded = ref(false);
    async function _fetchAdminProfile() {
      var _a, _b;
      isLoading.value = true;
      try {
        const endpoint = "/admin/profile/get";
        const {
          data: { data }
        } = await useAdminAuthenticatedAxios(endpoint, null, null, "GET");
        if (data == null ? void 0 : data.admin) {
          admin.value = data.admin;
          profileLoaded.value = true;
        }
        return admin.value;
      } catch (err) {
        (void 0).showError(
          "Error!",
          ((_b = (_a = err == null ? void 0 : err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Error fetching admin profile:",
          3e3
        );
      } finally {
        isLoading.value = false;
      }
    }
    async function fetchAdminProfile() {
      if (profileLoaded.value) return admin.value;
      const result = await _fetchAdminProfile();
      return result;
    }
    async function updateAdminProfile() {
      const result = await _fetchAdminProfile();
      return result;
    }
    return {
      admin,
      isLoading,
      profileLoaded,
      fetchAdminProfile,
      updateAdminProfile
    };
  },
  {
    persist: {
      storage: storages.cookies({
        maxAge: 60 * 60 * 24 * 180,
        secure: true
      })
    }
  }
);
const _sfc_main$1 = {
  __name: "SideBar",
  __ssrInlineRender: true,
  setup(__props) {
    const menuStore = useMenuStore();
    const sideBarStore = useSideBarStore();
    useStudentInfoStore();
    useStudentAuthInfoStore();
    useAdminInfoStore();
    useAdminAuthInfoStore();
    let profilePictureModal = ref(false);
    let portal = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_ProfilePictureUploadModal = _sfc_main$2;
      _push(`<!--[--><section class="w-full sm:w-[320px] bg-white shadow-xl sm:min-h-[85vh] sticky top-5 rounded-t-2xl sm:rounded-2xl border border-gray-100 overflow-hidden print:hidden"><aside class="flex flex-col h-full"><div class="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-4 border-b border-gray-100"><div class="flex items-center sm:justify-center mb-6 text-left"><div class="flex sm:block items-center gap-6 text-center w-full"><div class="flex justify-center"><div class="flex flex-col items-center gap-4"><div class="relative group">`);
      if (!((_a = unref(sideBarStore).user) == null ? void 0 : _a.profile_picture)) {
        _push(`<div class="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"><svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg></div>`);
      } else {
        _push(`<img${ssrRenderAttr("src", (_b = unref(sideBarStore).user) == null ? void 0 : _b.profile_picture)} alt="user_profile_picture" class="w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-white">`);
      }
      _push(`<button class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/25"><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path><circle cx="12" cy="12" r="3"></circle></svg></button></div>`);
      if ((_c = unref(sideBarStore).user) == null ? void 0 : _c.signature_scan) {
        _push(`<img${ssrRenderAttr("src", (_d = unref(sideBarStore).user) == null ? void 0 : _d.signature_scan)} alt="signature" class="max-w-[140px] h-auto opacity-70 filter contrast-125">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="text-left sm:text-center space-y-2 sm:mt-8"><h1 class="font-bold text-xl sm:text-2xl text-gray-900 leading-tight">${ssrInterpolate((_e = unref(sideBarStore).user) == null ? void 0 : _e.name)}</h1><div class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"><svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zM12 14a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"></path></svg> ${ssrInterpolate(unref(portal))}</div></div></div></div></div><div class="flex-1 overflow-y-auto p-2 sm:p-4">`);
      _push(ssrRenderComponent(SideBarItems, {
        links: unref(menuStore).links,
        class: "flex gap-2 sm:block space-y-1"
      }, null, _parent));
      _push(`</div></aside></section>`);
      _push(ssrRenderComponent(_component_ProfilePictureUploadModal, {
        "is-modal-open": unref(profilePictureModal),
        "onUpdate:isModalOpen": ($event) => isRef(profilePictureModal) ? profilePictureModal.value = $event : profilePictureModal = $event
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Sidebar/SideBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "Split",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Footer = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "bg-gray-100 min-h-screen" }, _attrs))} data-v-b6981594><div class="base-width" data-v-b6981594><div class="pb-10 sm:pb-16" data-v-b6981594>`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div><div class="sm:flex gap-5 justify-center py-7" data-v-b6981594><aside class="mb-5 sm:mb-0" data-v-b6981594>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</aside><div class="w-full scroll-bar-hidden sm:shadow-sm h-fit rounded-2xl" data-v-b6981594>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div><div class="bg-white" data-v-b6981594>`);
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/Split.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Split = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6981594"]]);

export { Split as default };
//# sourceMappingURL=Split-C0j4qWFu.mjs.map
