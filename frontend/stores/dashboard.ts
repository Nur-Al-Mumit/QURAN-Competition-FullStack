import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboardStore", () => {
  let timelineEvents = ref([]);
  let progressStages = ref([]);
  let currentPhase = ref(null);
  let isLoading = ref(false);
  let error: any = ref(null);
  let loaded = ref(false);

  async function _fetchDashboard() {
    isLoading.value = true;
    error.value = null;

    try {
      const endpoint = "/user/dashboard";
      const {
        data: { data },
      } = await useAuthenticatedAxios(endpoint, null, null, "GET");

      if (data?.dashboard) {
        timelineEvents.value = data.dashboard.timeline_events || [];
        progressStages.value = data.dashboard.progress_stages || [];
        currentPhase.value = data.dashboard.current_phase || null;
        loaded.value = true;
      }
      return data?.dashboard;
    } catch (err) {
      console.error("Error fetching dashboard:", err);
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchDashboard() {
    if (loaded.value) return {
      timelineEvents: timelineEvents.value,
      progressStages: progressStages.value,
      currentPhase: currentPhase.value,
    };
    return await _fetchDashboard();
  }

  async function refreshDashboard() {
    return await _fetchDashboard();
  }

  return {
    timelineEvents,
    progressStages,
    currentPhase,
    error,
    isLoading,
    loaded,
    fetchDashboard,
    refreshDashboard,
  };
});
