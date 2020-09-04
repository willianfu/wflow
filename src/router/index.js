import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: __dirname, //这个很重要
    routes:[
        {
            path: "/layout",
            name: "layout",
            component: () => import("@/components/layout.vue"),
            children:[
                {
                    path: "baseSetup",
                    name: "baseSetup",
                    component: () => import("@/components/layouts/baseSetup.vue"),
                },
                {
                    path: "formDesign",
                    name: "formDesign",
                    component: () => import("@/components/layouts/formDesign.vue"),
                },
                {
                    path: "processDesign",
                    name: "processDesign",
                    component: () => import("@/components/layouts/processDesign.vue"),
                },
                {
                    path: "seniorSetup",
                    name: "seniorSetup",
                    component: () => import("@/components/layouts/seniorSetup.vue"),
                }
            ]
        },
    ]
})

export default router;
