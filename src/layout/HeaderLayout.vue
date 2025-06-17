<template>
  <div class="relative flex items-center gap-4 p-2 bg-base-200">
    <button class="btn btn-square btn-ghost" @click="toggleMenu">
      <FontAwesomeIcon :icon="faBars" class="text-2xl" />
    </button>
    <div class="hidden md:block whitespace-nowrap" v-if="$t(`routes.${route.name}.title`)">
      {{ $t(`routes.${route.name}.title`) }}
    </div>
    <RouterView class="grow" name="header" />
    <progress v-show="loading"
      class="absolute left-0 w-full h-2 rounded-none -bottom-2 progress progress-primary"></progress>
  </div>
</template>

<script setup>
import { useNavigationMenu } from "@/composables/useNavigationMenu";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { useRoute } from "vue-router";
import { useLoading } from "../stores/loading";

const { toggleMenu } = useNavigationMenu();
const { loading } = useLoading();
const route = useRoute();
</script>
