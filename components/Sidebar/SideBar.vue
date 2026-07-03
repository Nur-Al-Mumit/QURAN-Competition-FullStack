<template>
  <section
    class="w-full sm:w-[320px] bg-white shadow-xl sm:min-h-[85vh] sticky top-5 rounded-t-2xl sm:rounded-2xl border border-gray-100 overflow-hidden print:hidden"
  >
    <aside class="flex flex-col h-full">
      <!-- Profile Section -->
      <div
        class="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-4 border-b border-gray-100"
      >
        <div class="flex items-center sm:justify-center mb-6 text-left">
          <div class="flex sm:block items-center gap-6 text-center w-full">
            <!-- Avatar Section -->
            <div class="flex justify-center">
              <div class="flex flex-col items-center gap-4">
                <div class="relative group">
                  <!-- Default Avatar -->
                  <div
                    v-if="!sideBarStore.user?.profile_picture"
                    class="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"
                  >
                    <svg
                      class="w-10 h-10 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                  </div>

                  <!-- Profile Picture -->
                  <img
                    v-else
                    :src="sideBarStore.user?.profile_picture"
                    alt="user_profile_picture"
                    class="w-24 h-24 rounded-2xl object-cover shadow-lg border-4 border-white"
                  />

                  <!-- Camera Button -->
                  <button
                    @click="profilePictureModal = !profilePictureModal"
                    class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-emerald-500/25"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
                      />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                </div>

                <!-- Signature -->
                <img
                  v-if="sideBarStore.user?.signature_scan"
                  :src="sideBarStore.user?.signature_scan"
                  alt="signature"
                  class="max-w-[140px] h-auto opacity-70 filter contrast-125"
                />
              </div>
            </div>

            <!-- User Info -->
            <div class="text-left sm:text-center space-y-2 sm:mt-8">
              <h1
                class="font-bold text-xl sm:text-2xl text-gray-900 leading-tight"
              >
                {{ sideBarStore.user?.name }}
              </h1>
              <div
                class="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium"
              >
                <svg
                  class="w-4 h-4 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zM12 14a7 7 0 0 0-7 7 1 1 0 0 0 2 0 5 5 0 0 1 10 0 1 1 0 0 0 2 0 7 7 0 0 0-7-7z"
                  />
                </svg>
                {{ portal }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <div class="flex-1 overflow-y-auto p-2 sm:p-4">
        <SideBarItems
          :links="menuStore.links"
          class="flex gap-2 sm:block space-y-1"
        />
      </div>
    </aside>
  </section>

  <ProfilePictureUploadModal v-model:is-modal-open="profilePictureModal" />
</template>
<script setup>
  import SideBarItems from "~/components/Sidebar/SideBarItems.vue";

  // Stores
  const menuStore = useMenuStore();
  const sideBarStore = useSideBarStore();
  // Student Stores
  const studentInfoStore = useStudentInfoStore();
  const studentAuthInfoStore = useStudentAuthInfoStore();
  // Admin Stores
  const adminInfoStore = useAdminInfoStore();
  const adminAuthInfoStore = useAdminAuthInfoStore();

  // States
  let profilePictureModal = ref(false);
  let portal = ref("");

  async function syncUserInfo() {
    try {
      if (studentAuthInfoStore.isStudentLoggedIn) {
        await studentInfoStore.fetchUserProfile();
        let user = {
          name: studentInfoStore.user?.name_en || "Welcome User",
          profile_picture: studentInfoStore.user?.profile_picture || null,
        };
        portal.value = "Student Portal";
        sideBarStore.user = user;
      } else if (adminAuthInfoStore.isAdminLoggedIn) {
        await adminInfoStore.fetchAdminProfile();
        let user = {
          name: adminInfoStore.admin?.name || "Admin",
          profile_picture: adminInfoStore.admin?.profile_picture || null,
        };

        console.log(adminAuthInfoStore.isAdminLoggedIn);
        console.log(adminAuthInfoStore.adminRole);
        switch (adminAuthInfoStore.adminRole) {
          case 1:
            portal.value = "Super Admin Portal";
            break;
          case 2:
            portal.value = "Admin Portal";
            break;
          case 3:
            portal.value = "Examiner Portal";
            break;
          case 4:
            portal.value = "Volunteer Portal";
            break;
        }
        sideBarStore.user = user;
      } else {
        window.showError("Error!", "You are not logged in", 3000);
      }
    } catch (err) {
      window.showError("Error!", err, 3000);
    }
  }

  onMounted(async () => {
    await syncUserInfo();
  });
</script>
