import {createStore} from "vuex";

import CoachesModule from "./modules/coaches/index.js";

const store = createStore({
   modules: {
       coache: CoachesModule,
   }
});

export default store;