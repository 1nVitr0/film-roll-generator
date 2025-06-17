import { createApp } from "vue";
import App from "./App.vue";
import "./assets/main.css";
import { i18n } from "./i18n";
import { pinia } from "./pinia";
import router from "./router";

const { VITE_SENTRY_DSN } = import.meta.env;

const app = createApp(App);

app.use(router);
app.use(i18n, { inject: true });
app.use(pinia);

app.mount("#app");
