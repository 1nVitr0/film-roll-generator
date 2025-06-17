import { ref } from "vue";

const showMenu = ref(false);

export const useNavigationMenu = () => {
  const toggleMenu = () => {
    showMenu.value = !showMenu.value;
  };

  return {
    showMenu,
    toggleMenu,
  };
};
