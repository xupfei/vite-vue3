import { createRouter, createWebHashHistory } from 'vue-router'

//createWebHashHistory  hash模式 
//createWebHistory  history模式 

// 在 Vue-router新版本中，需要使用createRouter来创建路由
let routes = [
  {
    path: "/",
    redirect: '/login'
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/page/login/index.vue"),
  },
  {
    path: "/nav",
    name: "nav",
    component: () => import("@/page/nav/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/page/home/index.vue"),
      },
      {
        path: "/tree/tree2.1",
        name: "tree2.1",
        component: () => import("@/page/tree/tree2.1/index.vue"),
      },
      {
        path: "/tree/tree2.2",
        name: "tree2.2",
        component: () => import("@/page/tree/tree2.2/index.vue"),
      },
      {
        path: "/tree/tree2.3",
        name: "tree2.3",
        component: () => import("@/page/tree/tree2.3/index.vue"),
      },
      {
        path: "/introduce",
        name: "introduce",
        component: () => import("@/page/introduce/index.vue"),
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: () => import("@/page/dashboard/index.vue"),
      },
    ]
  }
]


let router = createRouter({
  // 指定路由的模式,此处使用的是hash模式
  history: createWebHashHistory(),
  // 路由地址
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!localStorage.getItem("token")) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
})

export default router



