// Global variable to check the Expires In.
let timer;
export default {
  state() {
    return {
      userId: null,
      token: null,
      didAutoLogout: false,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.didAutoLogout = false;
    },
    setAutoLogout(state) {
      state.didAutoLogout = true;
    },
  },
  actions: {
    async auth(context, payload) {
      const mode = payload.mode;
      let signMode = "";

      if (mode === "signup") {
        signMode = "signUp";
      }
      if (mode === "login") {
        signMode = "signInWithPassword";
      }
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:${signMode}?key=AIzaSyAIgdCgUVesr_9_gE3a_tCpYqB_TSFVTJk`;

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      });
      const datas = await response.json();
      if (!response.ok) {
        throw new Error(datas.error.message);
      }
      // Local Storage.
      /* Expires in */
      const expireIn = + datas.expiresIn * 1000;
      const expirationDate = new Date().getTime() + expireIn;
      localStorage.setItem("expirationDate", expirationDate);
      /* Store in localStorage */
      localStorage.setItem("token", datas.idToken);
      localStorage.setItem("userID", datas.localId);
      /* Check expiration */
      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expireIn);

      // Store User datas
      context.commit("setUser", {
        userId: datas.localId,
        token: datas.idToken,
      });
    },
    async login(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "login",
      });
    },

    async signup(context, payload) {
      return context.dispatch("auth", {
        ...payload,
        mode: "signup",
      });
    },
    autoLogin(context) {
      const token = localStorage.getItem("token");
      const userID = localStorage.getItem("userID");
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      /* Check Epiration in */
      const expirationIn = +tokenExpiration - new Date().getTime();
      if (expirationIn < 0) {
        return;
      }
      /* Check expiration */
      timer = setTimeout(function () {
        context.dispatch("autoLogout");
      }, expirationIn);

      if (token && userID) {
        context.commit("setUser", {
          userId: token,
          token: userID,
        });
      }
    },
    // In case of logout in a page wher you need to be auth.
    autoLogout(context) {
      context.dispatch("logout");
      context.commit("setAutoLogout");
    },

    logout(context) {
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
      localStorage.removeItem("tokenExpiration");

      // No need to check Expiration date.
      clearTimeout(timer);

      context.commit("setUser", {
        token: null,
        userId: null,
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
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
};
