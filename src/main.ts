import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue-slider-component/theme/default.css";
import "vue3-colorpicker/style.css";
import VueCodemirror from "vue-codemirror";

createApp(App).use(Vue3ColorPicker).mount("#app");
