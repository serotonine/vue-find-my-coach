import { createStore } from "vuex";
import CoachesModule from "./modules/CoachesModule";
import RequestModule from "./modules/RequestModule";
import LoaderModule from "./modules/LoaderModule";
import AuthModule from "./modules/AuthModule";
const store = createStore({
  modules: {
    _loader:LoaderModule,
    _coaches: CoachesModule,
    _request: RequestModule,
    _auth:AuthModule,
  },
});
export default store;
