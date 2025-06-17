<template>
  <NavigationMenuItem>
    <template v-if="children.length > 0">
      <NavigationMenuTrigger
        class="flex items-center w-full p-2 text-left rounded cursor-pointer hover:bg-base-200 focus:bg-base-200">
        <div>
          <FontAwesomeIcon v-if="route.meta?.icon" :icon="route.meta?.icon" class="mr-2" />
          {{ route.name ? $t(`routes.${route.name.toString()}.title`) : "" }}
        </div>
        <FontAwesomeIcon v-if="children.length > 0" :icon="faChevronRight" class="ml-auto" />
      </NavigationMenuTrigger>
      <NavigationMenuContent class="w-full p-2">
        <ul>
          <li v-for="child in children" :key="child.path">
            <RouterNavItem :route="child" :prefix="path" :isActive="isActive" />
          </li>
        </ul>
      </NavigationMenuContent>
    </template>
    <NavigationMenuLink v-else :as="RouterLink" :to="path"
      class="block w-full p-2 text-left rounded cursor-pointer hover:bg-base-200 focus:bg-base-200 hover:text-base-content focus:text-base-content">
      <FontAwesomeIcon v-if="route.meta?.icon" :icon="route.meta?.icon" class="mr-2" />
      {{ route.name ? $t(`routes.${route.name.toString()}.title`) : "" }}
    </NavigationMenuLink>
  </NavigationMenuItem>
</template>

<script setup lang="ts">
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "reka-ui";
import { computed } from "vue";
import { RouterLink, type RouteRecordRaw } from "vue-router";

const props = defineProps<{
  prefix: string;
  route: RouteRecordRaw;
  isActive: boolean;
}>();

const children = computed(() => {
  return (
    props.route.children?.filter(
      (child) => child.meta && !child.meta.hide
    ) || []
  );
});

const path = computed(() => {
  const {
    prefix,
    route: { path },
  } = props;

  return prefix ? `${prefix.replace(/\/$/, "")}/${path}` : path;
});
</script>
