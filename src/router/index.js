import Vue from "vue"
import VueRouter from "vue-router"
import Login from "../components/login.vue"
import Home from "../components/Home.vue"
import WelCome from "../components/WelCome.vue"
import Users from "../components/users/users.vue"

Vue.use(VueRouter)

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login,  },
  { path: "/home", 
  component: Home,
  redirect: '/WelCome',
  children: [
    { path: '/welcome', component: WelCome },
    { path: '/users',component:Users},
  ]}
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // 访问登录页，放行
  if (to.path === "/login") return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem("token")
  // console.log(tokenStr)
  // 没有token, 强制跳转到登录页
  if (!tokenStr) return next("/login")
  // console.log(tokenStr)
  next()
})

export default router
