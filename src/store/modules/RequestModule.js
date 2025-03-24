export default {
  namespaced: true,
  state() {
    return {
      requests: [],
      filteredRequests:[],
    };
  },
  mutations: {
    addRequest(state, payload) {
      state.requests.unshift(payload);
    },
    setRequests(state, payload) {
      state.requests = payload;
    },
    getRequests(state, payload) {
      state.filteredRequests = state.requests.filter((req) => req.coachId === payload);
    },
  },
  actions: {
    /*async*/ loadRequests(context) {
      const root = context.rootGetters["_loader/getFindMyCoach"];
      const requests = [];
      for (const key in root.requests) {
        requests.push({
          id: key,
          date: root.requests[key].date,
          coachId: root.requests[key].coachId,
          name:root.requests[key].name,
          email: root.requests[key].email,
          message: root.requests[key].message,
        });
      }
      context.commit("setRequests", requests.reverse());
    },
    // payload.
    async addRequest(context, payload) {
      const requestData = {
        // How to catch var from another module or parent.
        date: Date.now(),
        coachId: payload.coachId,
        name:payload.name,
        email: payload.email,
        message: payload.message,
      };
      const response = await fetch(
        "https://vuejs-http-request-d631c-default-rtdb.europe-west1.firebasedatabase.app/findmycoach/requests.json",
        {
          method: "POST",
          body: JSON.stringify(requestData),
        }
      );
      //const datas = await response.json();
      if (!response.ok) {
        throw new Error(`${response.status} : ${response.statusText}` || "Failed to fetch");
      }
      context.commit("addRequest", requestData);
    },
  },
  getters: {
    getRequests(state) {
      return state.requests;
    },
    getFilteredRequests(state){
      return state.filteredRequests;
    }
  },
};
