import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/user-center'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/user-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/user-center/user-center'),
                    meta: { title: '用户中心' }
                },
                {
                    path: '/developers',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/developers/developers'),
                    meta: { title: '开发商管理中心' }
                },
                {
                    path: '/cloud-set',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/cloud-set/cloud-set'),
                    meta: { title: '云管理设置' }
                },
                {
                    path: '/label-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/label-center/label-center'),
                    meta: { title: '标签数据管理中心' }
                },
                {
                    path: '/area-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/area-center/area-center'),
                    meta: { title: '区域板块管理中心' }
                },
                {
                    path: '/project-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/project-center/project-center'),
                    meta: { title: '项目数据管理中心' }
                },
                {
                    path: '/land-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/land-center/land-center'),
                    meta: { title: '土地数据管理中心' }
                },
                {
                    path: '/houses-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/houses-center/houses-center'),
                    meta: { title: '楼盘数据管理中心' }
                },
                {
                    path: '/house-type',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/house-type/house-type'),
                    meta: { title: '户型数据管理中心' }
                },
                {
                    path: '/supply-chain',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/supply-chain/supply-chain'),
                    meta: { title: '供应链库数据管理中心' }
                },
                {
                    path: '/building-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/building-center/building-center'),
                    meta: { title: '楼号数据管理中心' }
                },
                {
                    path: '/library-center',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/library-center/library-center'),
                    meta: { title: '材料库' }
                },
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import(/* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
