<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">{{
                                    threeItem.title
                                }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
            <div class="box">
                <div class="logo"><img class="logimg" :src="systemForm.logo" alt="" />{{ systemForm.systemName }}</div>
                <div class="tac">{{ systemForm.bottomCopyright }}</div>
            </div>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import userApi from '@/service/user.js';
export default {
    data() {
        return {
            systemForm: '',
            collapse: false,
            items: [
                // {
                //     icon: 'el-icon-lx-home',
                //     index: 'dashboard',
                //     title: '系统首页'
                // },
                {
                    icon: '',
                    index: 'user-center',
                    title: '用户中心'
                },
                {
                    icon: '',
                    index: 'cloud-set',
                    title: '云管理设置'
                },
                {
                    icon: '',
                    index: 'label-center',
                    title: '标签数据管理中心'
                },
                {
                    icon: '',
                    index: 'developers',
                    title: '开发商管理中心'
                },
                {
                    icon: '',
                    index: 'area-center',
                    title: '区域板块管理中心'
                },
                {
                    icon: '',
                    index: 'project-center',
                    title: '项目数据管理中心'
                },
                {
                    icon: '',
                    index: 'land-center',
                    title: '土地数据管理中心'
                },
                {
                    icon: '',
                    index: 'houses-center',
                    title: '楼盘数据管理中心'
                },
                {
                    icon: '',
                    index: 'house-type',
                    title: '户型数据管理中心'
                },
                {
                    icon: '',
                    index: 'building-center',
                    title: '楼号数据管理中心'
                },
                {
                    icon: '',
                    index: '3',
                    title: '供应链库数据管理中心',
                    subs: [
                        {
                            index: 'supply-chain',
                            title: '仓库管理'
                        }
                        // {
                        //     index: 'library-center',
                        //     title: '材料库'
                        // }
                    ]
                }
                // {
                //     icon: 'el-icon-lx-cascades',
                //     index: 'table',
                //     title: '基础表格'
                // },
                // {
                //     icon: 'el-icon-lx-copy',
                //     index: 'tabs',
                //     title: 'tab选项卡'
                // },
                // {
                //     icon: 'el-icon-lx-calendar',
                //     index: '3',
                //     title: '表单相关',
                //     subs: [
                //         {
                //             index: 'form',
                //             title: '基本表单'
                //         },
                //         {
                //             index: '3-2',
                //             title: '三级菜单',
                //             subs: [
                //                 {
                //                     index: 'editor',
                //                     title: '富文本编辑器'
                //                 },
                //                 {
                //                     index: 'markdown',
                //                     title: 'markdown编辑器'
                //                 }
                //             ]
                //         },
                //         {
                //             index: 'upload',
                //             title: '文件上传'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-emoji',
                //     index: 'icon',
                //     title: '自定义图标'
                // },
                // {
                //     icon: 'el-icon-pie-chart',
                //     index: 'charts',
                //     title: 'schart图表'
                // },
                // {
                //     icon: 'el-icon-rank',
                //     index: '6',
                //     title: '拖拽组件',
                //     subs: [
                //         {
                //             index: 'drag',
                //             title: '拖拽列表'
                //         },
                //         {
                //             index: 'dialog',
                //             title: '拖拽弹框'
                //         }
                //     ]
                // },
                // {
                //     icon: 'el-icon-lx-global',
                //     index: 'i18n',
                //     title: '国际化功能'
                // },
                // {
                //     icon: 'el-icon-lx-warn',
                //     index: '7',
                //     title: '错误处理',
                //     subs: [
                //         {
                //             index: 'permission',
                //             title: '权限测试'
                //         },
                //         {
                //             index: '404',
                //             title: '404页面'
                //         }
                //     ]
                // },
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    mounted() {
        userApi.selectLibrary((res) => {
            console.log('主页 查询库', res);
            console.log(this.items[9].subs);
            let tableData = res.data.data;
            tableData.forEach((item) => {
                let obj = {};
                // console.log(item)
                obj.index = 'library-center?id=' + item.id;
                obj.title = item.libraryName;
                this.items[10].subs.push(obj);
            });
        });
        userApi.systemSelect((res) => {
            console.log('系统设置', res);
            this.systemForm = res.data.data[0];
        });
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', (msg) => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style lang="less" scoped>
.logimg {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    display: inline-block;
    vertical-align: middle;
}
.box {
    padding-top: 16px;
    /* height: 100%; */
    background-color: #324157;
    color: #BFCBD9;
}
.tac {
    margin-top: 8px;
    text-align: center;
    padding-bottom: 8px;
}
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
.el-menu-item {
    font-size: 16px;
}
/deep/.el-submenu__title {
    font-size: 16px;
}
</style>
