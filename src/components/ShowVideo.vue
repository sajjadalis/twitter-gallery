<template>
	<transition name="popup" type="animation">
		<div class="vidshow">
			<div class="video">
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
			<button class="close" @click="$emit('close')">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-7 w-7 m-auto"
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
	props: ["video", "dipslay", "artplayer"],
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
};
</script>
