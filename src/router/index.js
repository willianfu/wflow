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
            redirect: '/admin/design' // 路由重定向
        },
        {
            path: "/admin/design",
            name: "design",
            component: () => import("@/views/admin/FormProcessDesign.vue"),
            meta:{title:'表单流程设计', viewport: viewport},
            children:[
                {
                    path: "baseSetting",
                    name: "baseSetting",
                    component: () => import("@/views/admin/layout/FormBaseSetting.vue"),
                    meta:{title:'基础设置'}
                },{
                    path: "formSetting",
                    name: "formSetting",
                    component: () => import("@/views/admin/layout/FormDesign.vue"),
                    meta:{title:'表单设计'}
                },{
                    path: "processDesign",
                    name: "processDesign",
                    component: () => import("@/views/admin/layout/ProcessDesign.vue"),
                    meta:{title:'流程设计'}
                },{
                    path: "proSetting",
                    name: "proSetting",
                    component: () => import("@/views/admin/layout/FormProSetting.vue"),
                    meta:{title:'高级设置'}
                }
            ]
        },
       /* {
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
        }*/
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
