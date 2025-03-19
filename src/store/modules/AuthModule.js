export default {
  state() {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.tokenExpiration = payload.tokenExpiration;
    },
  },
  actions: {
    async login(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAIgdCgUVesr_9_gE3a_tCpYqB_TSFVTJk",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const datas = await response.json();
      if (!response.ok) {
        throw new Error(datas.error.message);
      }
      context.commit("setUser", {
        userId: datas.localId,
        token: datas.idToken,
        tokenExpiration: datas.expiresIn,
      });
    },

    async signup(context, payload) {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAIgdCgUVesr_9_gE3a_tCpYqB_TSFVTJk",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: payload.email,
            password: payload.password,
            returnSecureToken: true,
          }),
        }
      );
      const datas = await response.json();

      if (!response.ok) {
        throw new Error(datas.error.message);
      }

      context.commit("setUser", {
        userId: datas.localId,
        token: datas.idToken,
        tokenExpiration: datas.expiresIn,
      });
    },

    logout(context) {
      context.commit("setUser", {
        token: null,
        userId: null,
        tokenExpiration: null,
      });
    },
  },
  getters: {
    userID(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
  },
};
