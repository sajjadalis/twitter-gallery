<template>
	<transition name="popup" type="animation">
		<div
			class="overlay absolute top-0 left-0 bottom-0 right-0 z-10 bg-gray-900 w-full h-screen bg-opacity-80"
			@click="close"
		>
			<div class="relative z-50 w-90 h-6/7 m-auto mt-4">
				<img :src="img" class="h-screen w-auto" alt="" />
			</div>
			<button
				class="text-gray-400 hover:text-white absolute top-0 right-0 mt-2 mr-2"
				@click="$emit('close')"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8 m-auto"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	</transition>
</template>
<script>
import Artplayer from "artplayer/examples/vue/Artplayer";
export default {
	props: ["img"],
	components: {
		Artplayer,
	},
	data() {
		return {};
	},
	methods: {
		close(e) {
			let classes = e.path[0].className;
			let close = classes.includes("overlay");
			if (close) {
				this.$emit("close");
				console.log("close video");
			}
		},
	},
};
</script>
