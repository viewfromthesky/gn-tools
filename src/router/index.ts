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
        /* webpackChunkName: "adv-team-generator" */ "../views/AdvancedTeamGenerator.vue"
      )
  },
  {
    path: "/indecision-fixer",
    name: "Indecision Fixer",
    component: () =>
      import(
        /* webpackChunkName: "indecision-fixer" */ "../views/IndecisionFixer.vue"
      )
  },
  {
    path: "/insights",
    name: "Insights",
    component: () =>
      import(/* webpackChunkName: "insights" */ "../views/Insights.vue")
  },
  {
    path: "/edit/games",
    name: "Games Editor",
    component: () =>
      import(/* webpackChunkName: "games-editor" */ "../views/GamesEditor.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
