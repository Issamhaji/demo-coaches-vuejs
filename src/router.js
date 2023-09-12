import { createRouter, createWebHistory } from "vue-router";

import CoachesList from "@/pages/coaches/CoachesList.vue";
import CoachesDetails from "@/pages/coaches/CoachesDetails.vue";
import CoachesRegistration from "@/pages/coaches/CoachesRegistration.vue";
import Request from "@/pages/requests/Request.vue";
import Contact from "@/pages/requests/Contact.vue";
import NotFound from "@/pages/NotFound.vue";

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
        {path: '/register', component: CoachesRegistration},
        {path: '/request' , component: Request},
        {path: '/:notFound(.*)', component: NotFound},
    ],
});
export default router;