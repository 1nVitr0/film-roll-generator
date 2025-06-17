import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layout/DefaultLayout.vue";

declare module "vue-router" {
  interface RouteMeta {
    icon?: IconDefinition;
    hide?: boolean;
    section?: "top" | "bottom";
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: DefaultLayout,
      children: [
        {
          name: "home",
          path: "",
          meta: { icon: faHome },
          components: {
            default: () => import("../views/HomeView.vue"),
            header: () => import("../views/header/DefaultHeader.vue"),
          },
        },
      ],
    },
  ],
});

export default router;
