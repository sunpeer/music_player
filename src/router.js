import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'view-design'
import axios from 'axios'
import bus from 'vue-bus'

import 'view-design/dist/styles/iview.css'

import login_view from './view/login_view'
import home_view from './view/home_view'

import profile_view from './view/home_subpages/user_info_views/profile_view.vue'
import playlists_view from './view/home_subpages/user_info_views/playlists_view.vue'
import favorite_view from './view/home_subpages/user_info_views/favorite_view.vue'

axios.defaults.withCredentials=true
Vue.use(Router)
Vue.use(ViewUI)
Vue.prototype.$axios=axios
Vue.use(bus)

const router=new Router({
    routes:[
        {
            path:'/login',
            name:'login_view',
            component:login_view,
            meta:{
                needLogin:false
            }
        },
        {
            path:'*',
            name:'any',
            redirect:'/login',
        },
        {
            path:'/home',
            name:'home_view',
            component:home_view,
            meta:{
                needLogin:true
            },
            children:[
                {
                    path:'profile',
                    component:profile_view
                },
                {
                    path:'playlists',
                    component:playlists_view
                },
                {
                    path:'favorite',
                    component:favorite_view
                }
            ]
        },
    ]
})

router.beforeEach(function(to,from,next){
    if(to.meta.needLogin){
        // if(localStorage.getItem('token')){
        if(sessionStorage.getItem('uid')){
            next()
        }else{
            next({name:"login_view"})
        }
    }else{
        next()
    }
})

export default router