import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/iframe-test",
    name: "Iframe Test",
    component: () =>
      import(/* webpackChunkName: "iframe-test" */ "../views/IframeTest.vue")
  },
  {
    path: "/team-generator",
    name: "Team generator",
    component: () =>
      import(
        /* webpackChunkName: "team-generator" */ "../views/TeamGenerator.vue"
      )
  },
  {
    path: "/adv-team-generator",
    name: "Advanced Team generator",
    component: () =>
      import(
        /* webpackChunkName: "team-generator" */ "../views/AdvancedTeamGenerator.vue"
      )
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
