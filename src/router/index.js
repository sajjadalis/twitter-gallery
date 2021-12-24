import Vue from "vue";
import VueRouter from "vue-router";
import Photos from "../views/Photos.vue";
import Videos from "../views/Videos.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Photos",
		component: Photos,
	},
	{
		path: "/videos",
		name: "Videos",
		component: Videos,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
