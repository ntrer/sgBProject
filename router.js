// router.js
import {
    RouterMount,
    createRouter
} from 'uni-simple-router';

import commonToast from '@/units/Common.js'

const router = createRouter({
    APP: {
        //设置等待页面背景色
        loddingPageStyle: () => JSON.parse('{"backgroundColor":"#ffffff"}'),
        //通过启动页生命钩子绘制加载gif
        loddingPageHook: (view) => {
            // view.show();
        },
        launchedHook: () => {
            plus.navigator.closeSplashscreen();
            console.log('加载完成啦')
        }
    },
    h5: {
        paramsToQuery: true,
    },
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    if (to.meta.auth) {
        if (!uni.getStorageSync('user') || !uni.getStorageSync('token')) {
            next({
                name: 'login'
            })
            return
        }
    }
    next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
    router,
    RouterMount
}