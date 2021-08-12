import Vue from 'vue'
import VueRouter from 'vue-router'
import rgbToHex from './rgbToHex' // 路由模块-rgbToHex
Vue.use(VueRouter)

// 重复点击同一路由问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/view/pages/Home')
    }
  ].concat(rgbToHex)
})

// console.log(routesHome)
