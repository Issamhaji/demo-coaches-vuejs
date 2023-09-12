import {createStore} from "vuex";

import CoachesModule from "./modules/coaches/index.js";
import RequestModule from "@/store/modules/request";

const store = createStore({
   modules: {
       coache: CoachesModule,
       requests: RequestModule,
   },
    state() {
       return {
           userId: 'c3'
       };
       },
    getters: {
       userId(state) {
           return state.userId;
       }
   }
});

export default store;