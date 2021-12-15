import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import VueEasyLightbox from "vue-easy-lightbox";
Vue.use(VueEasyLightbox);

import VueMasonry from "vue-masonry-css";
Vue.use(VueMasonry);

import "./main.css";
import VueTailwind from "vue-tailwind";
import settings from "./vue-tailwind-settings.js";
Vue.use(VueTailwind, settings);

Vue.config.productionTip = false;

new Vue({
	router,
	render: function (h) {
		return h(App);
	},
}).$mount("#app");
