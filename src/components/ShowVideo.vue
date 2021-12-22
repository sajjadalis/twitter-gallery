<template>
	<transition name="popup" type="animation">
		<div
			class="overlay fixed top-0 left-0 bottom-0 right-0 z-10 bg-gray-900 w-full h-screen bg-opacity-80"
		>
			<div class="relative z-50 w-85 h-95 m-auto mt-4">
				<Artplayer
					v-if="artplayer"
					:option="{
						url: video.url,
						poster: video.image,
						// autoSize: true,
						hotkey: true,
						loop: true,
						autoplay: true,
						mutex: true,
						fullscreen: true,
						fullscreenWeb: true,
						miniProgressBar: true,
						flip: true,
						playbackRate: true,
						setting: true,
					}"
					:style="style"
				/>
				<div v-else>
					<video
						controls
						playsinline
						loop
						autoplay
						class="native-player"
					>
						<!-- Video files -->
						<source :src="video.url" type="video/mp4" />
					</video>
				</div>
			</div>
			<button
				class="text-gray-400 hover:text-white absolute top-0 right-0 mt-4 mr-4"
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

			<button
				class="text-gray-400 hover:text-white absolute top-2/4 right-0 -mt-8 mr-5"
				@click="$emit('next')"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M14 5l7 7m0 0l-7 7m7-7H3"
					/>
				</svg>
			</button>

			<button
				class="text-gray-400 hover:text-white absolute top-2/4 left-0 -mt-8 ml-5"
				@click="$emit('prev')"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-8 w-8"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</button>
		</div>
	</transition>
</template>
<script>
import Artplayer from "artplayer/examples/vue/Artplayer";
export default {
	props: ["video", "artplayer"],
	components: {
		Artplayer,
	},
	data() {
		return {
			style: {
				width: "auto",
				height: "100%",
				margin: "0 auto 10px",
			},
		};
	},
	// methods: {
	// 	close(e) {
	// 		let classes = e.path[0].className;
	// 		console.log(classes);
	// 		let close = classes.includes("overlay");
	// 		if (close) {
	// 			this.$emit("close");
	// 			console.log("close video");
	// 		}
	// 	},
	// },
};
</script>
