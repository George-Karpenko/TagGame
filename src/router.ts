import { createRouter, createWebHistory } from "vue-router";

export const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("./pages/Index.vue"),
  },
  {
    path: "/play",
    name: "Play",
    component: () => import("./pages/play/Index2.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("./pages/settings/Index.vue"),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
