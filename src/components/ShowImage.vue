<template>
	<transition name="popup" type="animation">
		<div
			class="overlay fixed top-0 left-0 bottom-0 right-0 z-10 bg-gray-900 w-full h-screen bg-opacity-80 text-center"
			@click.prevent="close"
		>
			<div
				:class="[
					'inline-block scroll w-auto h-screen',
					enlarge ? 'overflow-y-scroll' : '',
				]"
				style="-webkit-scrollbar: none"
			>
				<img
					ref="imge"
					:src="img"
					class="w-auto h-full m-auto"
					:style="style"
					@click.prevent="enlargeImg"
				/>
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
				@keyup.right="$emit('next')"
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
						d="M9 5l7 7-7 7"
					/>
				</svg>
			</button>

			<button
				class="text-gray-400 hover:text-white absolute top-2/4 left-0 -mt-8 ml-5"
				@click="$emit('prev')"
				@keyup.left="$emit('prev')"
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
						d="M15 19l-7-7 7-7"
					/>
				</svg>
			</button>
		</div>
	</transition>
</template>
<script>
export default {
	props: ["img"],
	created() {
		window.addEventListener("keydown", (e) => {
			if (e.key == "ArrowLeft") {
				this.$emit("prev");
			}
			if (e.key == "ArrowRight") {
				this.$emit("next");
			}
		});
	},
	data() {
		return {
			style: {
				cursor: "zoom-in",
			},
			enlarge: false,
		};
	},
	methods: {
		close(e) {
			let classes = e.path[0].className;
			if (typeof classes == "string" && classes.includes("overlay")) {
				this.$emit("close");
				// console.log("close image");
			}
		},
		enlargeImg() {
			this.enlarge = !this.enlarge;
			if (this.enlarge) {
				this.style = {
					cursor: "zoom-out",
					transform: "scale(1.5)",
					transition: "transform 0.25s ease",
				};
			} else {
				this.style = {
					cursor: "zoom-in",
					transform: "scale(1)",
					transition: "transform 0.25s ease",
				};
			}
		},
	},
};
</script>
<style>
.scroll::-webkit-scrollbar {
	display: none;
}
</style>
