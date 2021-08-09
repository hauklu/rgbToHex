import Vue from 'vue'
import VueRouter from 'vue-router'

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
  ]
})
