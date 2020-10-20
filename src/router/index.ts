import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
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
