import Vue from 'vue'
import App from './App'
import Common from "@/units/Common";
import api from "@/units/servers/api";
import Header from "@/components/Header";
import {
    router,
    RouterMount
} from './router'

Vue.use(router)

Vue.filter('formatplace',(data)=>{
   var tys = data-0
   tys = tys.toFixed(2)
   return tys
})

Vue.component("Header", Header);



Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$Common = Common

App.mpType = 'app'

const app = new Vue({
    ...App
})

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif