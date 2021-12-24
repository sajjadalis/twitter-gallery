<template>
	<transition name="popup" type="animation">
		<div
			class="overlay fixed top-0 left-0 bottom-0 right-0 z-10 bg-gray-900 w-full h-screen bg-opacity-80"
			@click="close"
		>
			<div class="absolute bottom-0 left-1/2 z-50 mb-2">
				<div
					class="relative bg-gray-900 py-2 px-3 rounded bg-opacity-60 leading-none mb-2"
					style="left: -50%"
				>
					<a
						:href="img"
						target="_blank"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Open in New Tab"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/></svg
					></a>
					<a
						href="#"
						@click.prevent="save(img)"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Save"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
							/></svg
					></a>
					<a
						href="#"
						@click.prevent="zoom('in')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Zoom In"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
							/></svg
					></a>
					<a
						href="#"
						@click.prevent="zoom('out')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Zoom Out"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
							/></svg
					></a>
					<a
						href="#"
						@click.prevent="rotate('left')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Rotate Anti-Clockwise"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
							/></svg
					></a>
					<a
						href="#"
						@click.prevent="rotate('right')"
						class="text-gray-400 hover:text-white inline-block"
						title="Rotate Clockwise"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
					></a>
				</div>
			</div>

			<img :src="img" class="w-auto h-full m-auto" :style="style" />

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
import axios from "axios";
export default {
	props: ["img", "user"],
	data() {
		return {
			url: "",
			style: {},
			rot: 0,
		};
	},
	mounted() {
		window.addEventListener("keydown", (e) => {
			if (e.key == "ArrowLeft") {
				this.$emit("prev");
			}
			if (e.key == "ArrowRight") {
				this.$emit("next");
			}
		});
	},
	methods: {
		close(e) {
			let classes = e.path[0].className;
			if (typeof classes == "string" && classes.includes("overlay")) {
				this.$emit("close");
				// console.log("close image");
			}
		},
		save(url) {
			this.url = url;
			return axios
				.get(this.url, {
					responseType: "blob", // important
				})
				.then((response) => {
					var index = this.url.lastIndexOf("/") + 1;
					var filename = this.user + "-" + this.url.substr(index);

					const url = window.URL.createObjectURL(
						new Blob([response.data])
					);

					const link = document.createElement("a");
					link.href = url;

					link.setAttribute("download", filename); //or any other extension
					document.body.appendChild(link);
					link.click();
				});
		},
		zoom(val) {
			if (val == "in") {
				this.style = {
					transform: "scale(1.5)",
					transition: "transform 0.25s ease",
				};
			}
			if (val == "out") {
				this.style = {
					transform: "scale(1)",
					transition: "transform 0.25s ease",
				};
			}
		},
		rotate(val) {
			if (val == "right") {
				this.rot += 90;
			} else if (val == "left") {
				this.rot += -90;
			}

			this.style = {
				transform: "rotate(" + this.rot + "deg)",
				transition: "transform 0.25s ease",
			};
		},
	},
};
</script>
<style>
.scroll::-webkit-scrollbar {
	display: none;
}
</style>
