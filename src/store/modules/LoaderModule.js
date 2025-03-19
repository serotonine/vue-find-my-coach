export default {
  namespaced: true,
  state() {
    return {
      findMyCoach: null,
    };
  },
  mutations: {
    setFindMyCoach(state, payload) {
      state.findMyCoach = payload;
    },
  },
  actions: {
    async loadfindMyCoach(context) {
      const response = await fetch(
        "https://vuejs-http-request-d631c-default-rtdb.europe-west1.firebasedatabase.app/findmycoach.json"
      );
      const datas = await response.json();
     
      if (!response.ok || datas === null) {
        throw new Error(response?.message || "Failed to fetch");
      }
      // Set FindMyCoach.
      context.commit("setFindMyCoach", datas);
    },
  },
  getters: {
    getFindMyCoach(state) {
      return state.findMyCoach;
    },
  },
};
