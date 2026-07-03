
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'AuthForgetPasswordStudentForgetPasswordStage1': typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue")['default']
    'AuthForgetPasswordStudentForgetPasswordStage2': typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue")['default']
    'AuthSignInStudentUserLogInStage1': typeof import("../components/Auth/SignIn/Student/UserLogInStage1.vue")['default']
    'AuthSignUpStudentSignUpStage1': typeof import("../components/Auth/SignUp/Student/SignUpStage1.vue")['default']
    'AuthSignUpStudentSignUpStage2': typeof import("../components/Auth/SignUp/Student/SignUpStage2.vue")['default']
    'CountAnimation': typeof import("../components/CountAnimation.vue")['default']
    'DisclosureCustomSideMenu': typeof import("../components/Disclosure/CustomSideMenu.vue")['default']
    'Disclosure': typeof import("../components/Disclosure/Disclosure.vue")['default']
    'Footer': typeof import("../components/Footer.vue")['default']
    'InputsBaseFIleUpload': typeof import("../components/Inputs/BaseFIleUpload.vue")['default']
    'InputsBaseFilterSelect': typeof import("../components/Inputs/BaseFilterSelect.vue")['default']
    'InputsBaseFilterSelectCuntry': typeof import("../components/Inputs/BaseFilterSelectCuntry.vue")['default']
    'InputsBaseInput': typeof import("../components/Inputs/BaseInput.vue")['default']
    'InputsBaseRadio': typeof import("../components/Inputs/BaseRadio.vue")['default']
    'InputsOTP': typeof import("../components/Inputs/OTP.vue")['default']
    'LoadingOverlay': typeof import("../components/LoadingOverlay.vue")['default']
    'ModalBackdrop': typeof import("../components/Modal/Backdrop.vue")['default']
    'ModalContainer': typeof import("../components/Modal/Container.vue")['default']
    'Modal': typeof import("../components/Modal/index.vue")['default']
    'NavbarMenus': typeof import("../components/Navbar/Menus.vue")['default']
    'Navbar': typeof import("../components/Navbar/Navbar.vue")['default']
    'ProfilePictureUploadModal': typeof import("../components/ProfilePictureUploadModal.vue")['default']
    'SidebarSideBar': typeof import("../components/Sidebar/SideBar.vue")['default']
    'SidebarSideBarItems': typeof import("../components/Sidebar/SideBarItems.vue")['default']
    'Toast': typeof import("../components/Toast.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtTime': typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
    'NuxtPicture': typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyAuthForgetPasswordStudentForgetPasswordStage1': LazyComponent<typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue")['default']>
    'LazyAuthForgetPasswordStudentForgetPasswordStage2': LazyComponent<typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue")['default']>
    'LazyAuthSignInStudentUserLogInStage1': LazyComponent<typeof import("../components/Auth/SignIn/Student/UserLogInStage1.vue")['default']>
    'LazyAuthSignUpStudentSignUpStage1': LazyComponent<typeof import("../components/Auth/SignUp/Student/SignUpStage1.vue")['default']>
    'LazyAuthSignUpStudentSignUpStage2': LazyComponent<typeof import("../components/Auth/SignUp/Student/SignUpStage2.vue")['default']>
    'LazyCountAnimation': LazyComponent<typeof import("../components/CountAnimation.vue")['default']>
    'LazyDisclosureCustomSideMenu': LazyComponent<typeof import("../components/Disclosure/CustomSideMenu.vue")['default']>
    'LazyDisclosure': LazyComponent<typeof import("../components/Disclosure/Disclosure.vue")['default']>
    'LazyFooter': LazyComponent<typeof import("../components/Footer.vue")['default']>
    'LazyInputsBaseFIleUpload': LazyComponent<typeof import("../components/Inputs/BaseFIleUpload.vue")['default']>
    'LazyInputsBaseFilterSelect': LazyComponent<typeof import("../components/Inputs/BaseFilterSelect.vue")['default']>
    'LazyInputsBaseFilterSelectCuntry': LazyComponent<typeof import("../components/Inputs/BaseFilterSelectCuntry.vue")['default']>
    'LazyInputsBaseInput': LazyComponent<typeof import("../components/Inputs/BaseInput.vue")['default']>
    'LazyInputsBaseRadio': LazyComponent<typeof import("../components/Inputs/BaseRadio.vue")['default']>
    'LazyInputsOTP': LazyComponent<typeof import("../components/Inputs/OTP.vue")['default']>
    'LazyLoadingOverlay': LazyComponent<typeof import("../components/LoadingOverlay.vue")['default']>
    'LazyModalBackdrop': LazyComponent<typeof import("../components/Modal/Backdrop.vue")['default']>
    'LazyModalContainer': LazyComponent<typeof import("../components/Modal/Container.vue")['default']>
    'LazyModal': LazyComponent<typeof import("../components/Modal/index.vue")['default']>
    'LazyNavbarMenus': LazyComponent<typeof import("../components/Navbar/Menus.vue")['default']>
    'LazyNavbar': LazyComponent<typeof import("../components/Navbar/Navbar.vue")['default']>
    'LazyProfilePictureUploadModal': LazyComponent<typeof import("../components/ProfilePictureUploadModal.vue")['default']>
    'LazySidebarSideBar': LazyComponent<typeof import("../components/Sidebar/SideBar.vue")['default']>
    'LazySidebarSideBarItems': LazyComponent<typeof import("../components/Sidebar/SideBarItems.vue")['default']>
    'LazyToast': LazyComponent<typeof import("../components/Toast.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtTime': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const AuthForgetPasswordStudentForgetPasswordStage1: typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue")['default']
export const AuthForgetPasswordStudentForgetPasswordStage2: typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue")['default']
export const AuthSignInStudentUserLogInStage1: typeof import("../components/Auth/SignIn/Student/UserLogInStage1.vue")['default']
export const AuthSignUpStudentSignUpStage1: typeof import("../components/Auth/SignUp/Student/SignUpStage1.vue")['default']
export const AuthSignUpStudentSignUpStage2: typeof import("../components/Auth/SignUp/Student/SignUpStage2.vue")['default']
export const CountAnimation: typeof import("../components/CountAnimation.vue")['default']
export const DisclosureCustomSideMenu: typeof import("../components/Disclosure/CustomSideMenu.vue")['default']
export const Disclosure: typeof import("../components/Disclosure/Disclosure.vue")['default']
export const Footer: typeof import("../components/Footer.vue")['default']
export const InputsBaseFIleUpload: typeof import("../components/Inputs/BaseFIleUpload.vue")['default']
export const InputsBaseFilterSelect: typeof import("../components/Inputs/BaseFilterSelect.vue")['default']
export const InputsBaseFilterSelectCuntry: typeof import("../components/Inputs/BaseFilterSelectCuntry.vue")['default']
export const InputsBaseInput: typeof import("../components/Inputs/BaseInput.vue")['default']
export const InputsBaseRadio: typeof import("../components/Inputs/BaseRadio.vue")['default']
export const InputsOTP: typeof import("../components/Inputs/OTP.vue")['default']
export const LoadingOverlay: typeof import("../components/LoadingOverlay.vue")['default']
export const ModalBackdrop: typeof import("../components/Modal/Backdrop.vue")['default']
export const ModalContainer: typeof import("../components/Modal/Container.vue")['default']
export const Modal: typeof import("../components/Modal/index.vue")['default']
export const NavbarMenus: typeof import("../components/Navbar/Menus.vue")['default']
export const Navbar: typeof import("../components/Navbar/Navbar.vue")['default']
export const ProfilePictureUploadModal: typeof import("../components/ProfilePictureUploadModal.vue")['default']
export const SidebarSideBar: typeof import("../components/Sidebar/SideBar.vue")['default']
export const SidebarSideBarItems: typeof import("../components/Sidebar/SideBarItems.vue")['default']
export const Toast: typeof import("../components/Toast.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyAuthForgetPasswordStudentForgetPasswordStage1: LazyComponent<typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage1.vue")['default']>
export const LazyAuthForgetPasswordStudentForgetPasswordStage2: LazyComponent<typeof import("../components/Auth/ForgetPassword/Student/ForgetPasswordStage2.vue")['default']>
export const LazyAuthSignInStudentUserLogInStage1: LazyComponent<typeof import("../components/Auth/SignIn/Student/UserLogInStage1.vue")['default']>
export const LazyAuthSignUpStudentSignUpStage1: LazyComponent<typeof import("../components/Auth/SignUp/Student/SignUpStage1.vue")['default']>
export const LazyAuthSignUpStudentSignUpStage2: LazyComponent<typeof import("../components/Auth/SignUp/Student/SignUpStage2.vue")['default']>
export const LazyCountAnimation: LazyComponent<typeof import("../components/CountAnimation.vue")['default']>
export const LazyDisclosureCustomSideMenu: LazyComponent<typeof import("../components/Disclosure/CustomSideMenu.vue")['default']>
export const LazyDisclosure: LazyComponent<typeof import("../components/Disclosure/Disclosure.vue")['default']>
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyInputsBaseFIleUpload: LazyComponent<typeof import("../components/Inputs/BaseFIleUpload.vue")['default']>
export const LazyInputsBaseFilterSelect: LazyComponent<typeof import("../components/Inputs/BaseFilterSelect.vue")['default']>
export const LazyInputsBaseFilterSelectCuntry: LazyComponent<typeof import("../components/Inputs/BaseFilterSelectCuntry.vue")['default']>
export const LazyInputsBaseInput: LazyComponent<typeof import("../components/Inputs/BaseInput.vue")['default']>
export const LazyInputsBaseRadio: LazyComponent<typeof import("../components/Inputs/BaseRadio.vue")['default']>
export const LazyInputsOTP: LazyComponent<typeof import("../components/Inputs/OTP.vue")['default']>
export const LazyLoadingOverlay: LazyComponent<typeof import("../components/LoadingOverlay.vue")['default']>
export const LazyModalBackdrop: LazyComponent<typeof import("../components/Modal/Backdrop.vue")['default']>
export const LazyModalContainer: LazyComponent<typeof import("../components/Modal/Container.vue")['default']>
export const LazyModal: LazyComponent<typeof import("../components/Modal/index.vue")['default']>
export const LazyNavbarMenus: LazyComponent<typeof import("../components/Navbar/Menus.vue")['default']>
export const LazyNavbar: LazyComponent<typeof import("../components/Navbar/Navbar.vue")['default']>
export const LazyProfilePictureUploadModal: LazyComponent<typeof import("../components/ProfilePictureUploadModal.vue")['default']>
export const LazySidebarSideBar: LazyComponent<typeof import("../components/Sidebar/SideBar.vue")['default']>
export const LazySidebarSideBarItems: LazyComponent<typeof import("../components/Sidebar/SideBarItems.vue")['default']>
export const LazyToast: LazyComponent<typeof import("../components/Toast.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
