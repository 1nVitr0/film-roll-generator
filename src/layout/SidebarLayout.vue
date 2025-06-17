<script setup lang="ts">
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onClickOutside } from "@vueuse/core";
import { NavigationMenuIndicator, NavigationMenuList, NavigationMenuRoot, NavigationMenuViewport } from "reka-ui";
import { computed, useTemplateRef } from "vue";
import { useRouter } from "vue-router";
import RouterNavItem from "../components/RouterNavItem.vue";
import { useNavigationMenu } from "../composables/useNavigationMenu";
import { useAuth } from "../stores/auth";

const { showMenu } = useNavigationMenu();
const { afterEach, options } = useRouter();

const menuRef = useTemplateRef("element");

const routes = computed(() => {
  return options.routes[0]?.children?.filter((route) => route.meta && !route.meta.hide) || [];
});
const topSection = computed(() => {
  return routes.value.filter((route) => !route.meta?.section || route.meta?.section === "top");
});
const bottomSection = computed(() => {
  return routes.value.filter((route) => route.meta?.section === "bottom");
});

onClickOutside(menuRef, () => void (showMenu.value = false));
afterEach(() => void (showMenu.value = false));
</script>

<template>
  <div
    class="fixed top-0 left-0 flex flex-col h-full p-2 mr-5 transition-transform shadow-lg bg-base-300 min-w-64 max-w-100"
    :class="[showMenu ? 'translate-x-0' : '-translate-x-full']" ref="element">
    <button class="block ml-auto btn btn-square btn-ghost" @click="showMenu = false">
      <FontAwesomeIcon :icon="faXmark" class="text-xl" />
    </button>
    <NavigationMenuRoot orientation="vertical" class="grid w-full grow">
      <NavigationMenuList class="flex flex-col h-full overflow-y-auto">
        <RouterNavItem v-for="route in topSection" prefix="/" :key="route.path" :route="route" :isActive="showMenu" />
        <li class="mt-auto" v-if="topSection.length > 0 && bottomSection.length > 0" />
        <RouterNavItem v-for="route in bottomSection" prefix="/" :key="route.path" :route="route"
          :isActive="showMenu" />
        <NavigationMenuIndicator
          class="absolute left-full top-0 h-[var(--reka-navigation-menu-indicator-size)] translate-x-4 translate-y-[var(--reka-navigation-menu-indicator-position)] z-[100] flex flex-col w-[10px] items-end justify-center overflow-hidden">
          <div class="relative left-[70%] h-[12px] w-[12px] rotate-[45deg] bg-neutral border border-neutral" />
        </NavigationMenuIndicator>
      </NavigationMenuList>
      <div class="absolute top-0 right-0 h-full pl-4 translate-x-full">
        <NavigationMenuViewport align="start"
          class="bg-neutral text-neutral-content h-[var(--reka-navigation-menu-viewport-height)] relative top-[var(--reka-navigation-menu-viewport-top)] mt-10 rounded shadow" />
      </div>
    </NavigationMenuRoot>
  </div>
</template>
