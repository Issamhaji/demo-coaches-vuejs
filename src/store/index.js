import {createStore} from "vuex";

import CoachesModule from "./modules/coaches/index.js";
import RequestModule from "@/store/modules/request";
import authModule from "@/store/modules/auth"

const store = createStore({
   modules: {
       coache: CoachesModule,
       requests: RequestModule,
       auth: authModule
   },
});

export default store;