import Vue from "vue";
import VueRouter from "vue-router";
import Photos from "../views/Photos.vue";
import Videos from "../views/Videos.vue";
import New from "../views/New.vue";

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
	{
		path: "/new",
		name: "New",
		component: New,
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

export default router;
