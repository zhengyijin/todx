/*
 * @Author: your name
 * @Date: 2020-05-31 08:53:28
 * @LastEditTime: 2020-06-12 19:43:09
 * @LastEditors:  
 * @Description: In User Settings Edit
 * @FilePath: \lwbzzm-frontend\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

    // { //路由重定向
    //   path: '/',
    //   redirect: '/register',
    //   component: () => import('../views/register.vue')
    // },

    { //获取提交状态
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login.vue')
    },

    { //班组招募填写页面
        path: '/',
        name: 'Recruit',
        component: () =>
            import ('../views/RecruitSubmit.vue'),
        meta: {
            title: '班组招募信息搜集'
        }
    },

    { //查看班组提交信息页面
        path: '/RecruitView',
        name: 'RecruitView',
        component: () =>
            import ('../views/RecruitView.vue'),
        meta: {
            title: '班组个人信息'
        }
    },

    { //班组招标页面
        path: '/ZhaoBiao',
        name: 'ZhaoBiao',
        component: () =>
            import ('../views/ZhaoBiao.vue'),
        meta: {
            title: '招标公告'
        }
    },

    { //材料招标页面
        path: '/ZhaoBiaoMaterial',
        name: 'ZhaoBiaoMaterial',
        component: () =>
            import ('../views/ZhaoBiaoMaterial.vue'),
        meta: {
            title: '招标公告'
        }
    },

    { //招标公告查询
        path: '/ZhaoBiaoList',
        name: 'ZhaoBiaoList',
        component: () =>
            import ('../views/ZhaoBiaoList.vue'),
        meta: {
            title: '招标公告查询'
        }
    },

    { //根据提交状态跳转不同页面
        path: '/RecruitStatus',
        name: 'RecruitStatus',
        component: () =>
            import ('../components/recruit/RecruitStatus.vue')
    },

    //我的招募信息
    {
        path: '/MyOrder',
        name: 'MyOrder',
        component: () =>
            import ('../views/MyOrder.vue'),
        meta: {
            title: '我的'
        }
    }
]

const router = new VueRouter({
    routes
})

export default router