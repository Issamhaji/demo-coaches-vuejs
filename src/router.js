import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "@/pages/coaches/CoachesList.vue";
import CoachesDetails from "@/pages/coaches/CoachesDetails.vue";
import CoachesRegistration from "@/pages/coaches/CoachesRegistration.vue";
import Request from "@/pages/requests/Request.vue";
import Contact from "@/pages/requests/Contact.vue";
import NotFound from "@/pages/NotFound.vue";
import UserAuth from "@/pages/auth/UserAuth.vue";
import store from "@/store"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/coaches'},
        {path: '/coaches', component: CoachesList},
        {path: '/coaches/:id',
            component: CoachesDetails,
            props: true,
            children: [
                {path: 'contact', component: Contact} // /coaches/id/contact
            ]
        },
        {path: '/register', component: CoachesRegistration, meta: { requiresAuth: true }},
        {path: '/request' , component: Request, meta: { requiresAuth: true }},
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true } },
        {path: '/:notFound(.*)', component: NotFound},
    ],
});
router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
});
export default router;