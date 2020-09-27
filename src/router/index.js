import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const viewport = {
    content: "width=device-width, initial-scale=1.0, user-scalable=no"
}

const router = new Router({
    mode: 'history',
    base: __dirname, //这个很重要
    routes:[
        {
            path: '/',
            redirect: '/workPanel' // 路由重定向
        },
        {
            path: "/workPanel",
            name: "workPanel",
            component: () => import("@/components/workPanel.vue"),
            meta:{title:'工作面板', viewport: viewport}
        },
        {
            path: "/workSpace",
            name: "workSpace",
            component: () => import("@/components/workSpace.vue"),
            meta:{title:'表单列表', viewport: viewport}
        },
        {
            path: "/formListPanel",
            name: "formListPanel",
            component: () => import("@/components/formListPanel.vue"),
            meta:{title:'表单列表', viewport: viewport}
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
    if(to.meta.content) {
        let head = document.getElementByTagName('head')
        let meta = document.createElemnet('meta')
        meta.name = 'viewport'
        meta.content = "width=device-width, initial-scale=1.0, user-scalable=no"
        head[0].appendChild(meta)
    }
    next();
    sessionStorage.setItem('router-path', to.path)
})

export default router;
