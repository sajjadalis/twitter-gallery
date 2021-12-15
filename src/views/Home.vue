<template>
	<div class="container mx-auto">
		<form class="flex p-3" @submit.prevent="getImages">
			<div class="flex-1 w-64 p-2">
				<t-input name="twt_usr" v-model="user" />
			</div>
			<div class="flex-1 w-64 p-2">
				<t-input type="number" v-model="results" />
			</div>
			<t-button type="submit" class="flex-1 w-32 bg-gray-300"
				>Get Images</t-button
			>
		</form>

		<div v-if="imgs.length > 0" style="margin-bottom: 20px">
			<h3>
				{{ found }} <span v-if="found == 1">photo</span
				><span v-else>photos</span> found in {{ result_count }} tweets
			</h3>
		</div>

		<!-- all props & events -->
		<vue-easy-lightbox
			escDisabled
			moveDisabled
			:visible="visible"
			:imgs="imgs"
			:index="index"
			@hide="handleHide"
		></vue-easy-lightbox>
		<masonry :cols="5" :gutter="10">
			<div
				v-for="(src, index) in imgs"
				:key="index"
				class="pic"
				@click="() => showImg(index)"
			>
				<img class="item" :src="src" />
			</div>
		</masonry>

		<button
			v-if="next_token"
			@click.prevent="next(next_token)"
			style="margin-top: 20px"
		>
			Next
		</button>

		<div v-if="loading" class="spinner"></div>

		<div v-if="msg">
			<h3>{{ msg }}</h3>
		</div>
	</div>
</template>

<script>
// Method.3 Local registration
import VueEasyLightbox from "vue-easy-lightbox";
import axios from "axios";
import api from "@/api";

export default {
	components: {
		VueEasyLightbox,
	},
	data() {
		return {
			user: "BBCEarth",
			userId: "",
			search_params: "",
			results: 50,
			found: 0,
			imgs: [], // Img Url , string or Array of string
			visible: false,
			index: 0, // default: 0,
			msg: "",
			loading: false,
			result_count: 0,
			next_token: "",
		};
	},
	methods: {
		getImages() {
			this.imgs = [];
			this.msg = "";
			this.loading = true;

			if (this.results < 5) {
				this.msg = "Minimum results for tweets can not be less than 5";
				this.loading = false;
				return;
			}

			if (this.user) {
				api.get(`by/username/${this.user}`)
					.then((res) => {
						// console.log(res.data);

						if (!res.data.hasOwnProperty("data")) {
							this.msg = "User not found";
							this.loading = false;
							return;
						}

						this.userId = res.data.data.id;

						this.search_params = `max_results=${this.results}&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=media_key,type,url,preview_image_url`;

						api.get(
							`${this.userId}/tweets?${this.search_params}`
						).then((res) => {
							console.log(res.data);

							if (!res.data.hasOwnProperty("includes")) {
								this.msg = `No photo found in ${this.searched} tweets `;
								this.loading = false;
								return;
							}

							if (res.data.hasOwnProperty("meta")) {
								this.result_count = res.data.meta.result_count;
								this.next_token = res.data.meta.next_token;
							} else {
								this.result_count = this.results;
							}

							let data = res.data.includes.media;

							data.forEach((img) => {
								if (img.type == "photo") {
									this.imgs.push(img.url);
								}
							});

							this.found = this.imgs.length;

							this.loading = false;
						});
					})
					.catch((err) => {
						console.log(err);
					});
			}
		},
		showImg(index) {
			this.index = index;
			this.visible = true;
		},
		handleHide() {
			this.visible = false;
		},
		next(token) {
			api.get(
				`${this.userId}/tweets?${this.search_params}&pagination_token=${token}`
			).then((res) => {
				console.log(res.data);

				if (!res.data.hasOwnProperty("includes")) {
					this.msg = `No more photo found`;
					this.loading = false;
					return;
				}

				if (res.data.hasOwnProperty("meta")) {
					this.result_count += res.data.meta.result_count;
					this.next_token = res.data.meta.next_token;
				} else {
					this.result_count = this.results;
				}

				let data = res.data.includes.media;

				data.forEach((img) => {
					if (img.type == "photo") {
						this.imgs.push(img.url);
					}
				});

				this.found = this.imgs.length;

				this.loading = false;
			});
		},
	},
};
</script>
<style>
.container {
	width: 79%;
	margin: auto;
}
.form {
	margin-bottom: 30px;
}

.item {
	width: 280px;
	height: auto;
	margin-bottom: 8px;
	cursor: pointer;
}
.spinner {
	position: absolute;
	left: 50%;
	top: 50%;
	height: 60px;
	width: 60px;
	margin: 0px auto;
	-webkit-animation: rotation 0.6s infinite linear;
	-moz-animation: rotation 0.6s infinite linear;
	-o-animation: rotation 0.6s infinite linear;
	animation: rotation 0.6s infinite linear;
	border-left: 6px solid rgba(0, 174, 239, 0.15);
	border-right: 6px solid rgba(0, 174, 239, 0.15);
	border-bottom: 6px solid rgba(0, 174, 239, 0.15);
	border-top: 6px solid rgba(0, 174, 239, 0.8);
	border-radius: 100%;
}

@-webkit-keyframes rotation {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(359deg);
	}
}
@-moz-keyframes rotation {
	from {
		-moz-transform: rotate(0deg);
	}
	to {
		-moz-transform: rotate(359deg);
	}
}
@-o-keyframes rotation {
	from {
		-o-transform: rotate(0deg);
	}
	to {
		-o-transform: rotate(359deg);
	}
}
@keyframes rotation {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(359deg);
	}
}
</style>
