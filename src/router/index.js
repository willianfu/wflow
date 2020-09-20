import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: __dirname, //这个很重要
    routes:[
        {
            path: "/workPanel",
            name: "workPanel",
            component: () => import("@/components/workPanel.vue"),
            meta:{title:'工作面板'}
        },
        {
            path: "/workSpace",
            name: "workSpace",
            component: () => import("@/components/workSpace.vue"),
            meta:{title:'表单列表'}
        },
        {
            path: "/formListPanel",
            name: "formListPanel",
            component: () => import("@/components/formListPanel.vue"),
            meta:{title:'表单列表'}
        },
        {
            path: "/layout",
            name: "layout",
            component: () => import("@/components/layout.vue"),
            children:[
                {
                    path: "baseSetup",
                    name: "baseSetup",
                    component: () => import("@/components/layouts/baseSetup.vue"),
                    meta:{title:'基础设置'}
                },
                {
                    path: "formDesign",
                    name: "formDesign",
                    component: () => import("@/components/layouts/formDesign.vue"),
                    meta:{title:'表单设计器'}
                },
                {
                    path: "processDesign",
                    name: "processDesign",
                    component: () => import("@/components/layouts/processDesign.vue"),
                    meta:{title:'流程设计器'}
                },
                {
                    path: "seniorSetup",
                    name: "seniorSetup",
                    component: () => import("@/components/layouts/seniorSetup.vue"),
                    meta:{title:'高级设置'}
                }
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.title){
        document.title = to.meta.title
    }
    next();
    sessionStorage.setItem('router-path', to.path)
})

export default router;
