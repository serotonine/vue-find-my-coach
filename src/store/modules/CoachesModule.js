export default {
  namespaced: true,
  state() {
    return {
      coaches: [
      ],
      areas:null,
    };
  },
  mutations: {
    registerCoach(state, payload) {
      state.coaches.unshift(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
    setAreas(state, payload){
      state.areas = payload;
    },
  },
  actions: {
    getFullName(_, payload){
      return `${payload.firstName}&nbsp;${payload.lastName}`
    },
    loadCoaches(context) {
      // Check current States.
      if( context.state.areas !== null && context.state.coaches.length > 0){
        return;
      }
      const root = context.rootGetters['_loader/getFindMyCoach'];
      const coaches = [];
      for (const key in root.coaches) {
        coaches.push({
          id: key,
          firstName: root.coaches[key].firstName,
          lastName: root.coaches[key].lastName,
          areas: root.coaches[key].areas,
          description: root.coaches[key].description,
          hourlyRate: root.coaches[key].hourlyRate,
        });
      }
      // Set Coaches.
      context.commit("setCoaches", coaches);
      // Set Areas.
      context.commit("setAreas", root.areas);
    },

    async registerCoach(context, payload) {
      const userID = context.rootGetters.userID;
      const token = context.rootGetters.token;
      const response = await fetch(
        `https://vuejs-http-request-d631c-default-rtdb.europe-west1.firebasedatabase.app/findmycoach/coaches/${userID}.json?auth=${token}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
        }
      );
      //const datas = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} : ${response.statusText}` || "Failed to fetch");
      }
      context.commit("registerCoach", {
        ...payload,
        id: userID,
      });
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      return state.coaches && state.coaches.length;
    },
    isCoach(_, getters, _2, rootGetters) {
      const userId = rootGetters.userID;
      return getters.coaches.some((coach) => coach.id === userId);
    },
   
    getAreas(state){
      return state.areas;
    },
    getFilteredAreas(state) {
      const map = state.coaches
        .map((coach) => coach.areas.map((area) => area))
        .flat();
      return new Set(map);
    },
  },
};
