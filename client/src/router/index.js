import Vue from 'vue'
import Router from 'vue-router'
import detail from '@/pages/mobile/detail'
import fill from '@/pages/mobile/fill'
import timeline from '@/pages/mobile/timeline'
import login from '@/pages/mobile/login'
import me from '@/pages/mobile/me'
import homepage from '@/pages/mobile/homepage'
import follow from '@/pages/mobile/follow'
import favs from '@/pages/mobile/favs'
import Mobile from '@/pages/mobile/mobile'
import settings from '@/pages/mobile/settings'
import PC from '@/pages/web/pc'
import timelinePC from '@/pages/web/timeline'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      beforeEnter (to, from, next) {
        if(document.body.clientWidth < 450){
          next({
            path: '/mobile/timeline'
          })
        }else {
          next({
            path: '/pc/timeline'
          })
        }
      }
    },
    {
      path: '/mobile',
      name: 'Mobile',
      component: Mobile,
      redirect: '/mobile/timeline',
      children: [
        {
          path: 'timeline',
          name: 'timeline',
          component: timeline
        },
        {
          path: 'detail',
          name: 'detail',
          component: detail
        },
        {
          path: 'fill',
          name: 'fill',
          component: fill
        },
        {
          path: 'login',
          name: 'login',
          component: login
        },
        {
          path: 'me',
          name: 'me',
          component: me
        },
        {
          path: 'home',
          name: 'home',
          component: homepage
        },
        {
          path: 'follow',
          name: 'follow',
          component: follow
        },
        {
          path: 'favs',
          name: 'favs',
          component: favs
        },
        {
          path: 'settings',
          name: 'settings',
          component: settings
        }
      ]
    },
    {
      path: '/pc',
      name: 'PC',
      component: PC,
      redirect: '/pc/timeline',
      children: [
        {
          path: 'timeline',
          name: 'timeline-pc',
          component: timelinePC
        },
      ]
    }
  ],
  mode: 'history'
})
