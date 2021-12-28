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
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<path
								d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
							></path>
							<polyline points="15 3 21 3 21 9"></polyline>
							<line x1="10" y1="14" x2="21" y2="3"></line></svg
					></a>
					<a
						href="#"
						@click.prevent="save(img)"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Save"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<path
								d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
							></path>
							<polyline points="17 21 17 13 7 13 7 21"></polyline>
							<polyline points="7 3 7 8 15 8"></polyline></svg
					></a>
					<a
						href="#"
						@click.prevent="zoom('in')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Zoom In"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							<line x1="11" y1="8" x2="11" y2="14"></line>
							<line x1="8" y1="11" x2="14" y2="11"></line></svg
					></a>
					<a
						href="#"
						@click.prevent="zoom('out')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Zoom Out"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<circle cx="11" cy="11" r="8"></circle>
							<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
							<line x1="8" y1="11" x2="14" y2="11"></line></svg
					></a>
					<a
						href="#"
						@click.prevent="rotate('left')"
						class="text-gray-400 hover:text-white inline-block mr-2"
						title="Rotate Anti-Clockwise"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<polyline points="1 4 1 10 7 10"></polyline>
							<path
								d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"
							></path></svg
					></a>
					<a
						href="#"
						@click.prevent="rotate('right')"
						class="text-gray-400 hover:text-white inline-block"
						title="Rotate Clockwise"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="h-5 w-5"
						>
							<polyline points="23 4 23 10 17 10"></polyline>
							<path
								d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
							></path></svg
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
