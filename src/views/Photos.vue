<template>
	<div class="container mx-auto">
		<form class="flex" @submit.prevent="getPhotos">
			<div class="relative flex-1 w-64 mr-2">
				<t-input
					type="text"
					name="twt_usr"
					data-lpignore="true"
					v-model="user"
				/>
				<button
					class="absolute top-0 right-0 mt-3 mr-3 text-gray-400 hover:text-gray-600"
					v-if="user"
					@click.prevent="user = ''"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
			<div class="w-32 mr-2">
				<t-input type="number" v-model="results" />
			</div>
			<div class="relative w-12 mr-2">
				<label class="absolute top-0 -mt-5 text-2xs">Retweets</label>
				<t-checkbox v-model="include.retweets" />
			</div>
			<div class="relative w-12 mr-2">
				<label class="absolute top-0 -mt-5 text-2xs">Replies</label>
				<t-checkbox v-model="include.replies" />
			</div>
			<div class="w-60">
				<t-button type="submit" class="uppercase font-bold"
					>Get Photos</t-button
				>
			</div>
		</form>

		<div v-if="recent_searches.length > 0" class="block my-5">
			<span class="mr-2 font-bold">Recent Search History:</span>
			<span
				class="relative"
				v-for="(keyword, i) in recent_searches"
				:key="i"
			>
				<span
					class="border bg-gray-100 hover:bg-gray-200 py-1 px-2 mr-2 rounded cursor-pointer"
					@click.prevent="(user = keyword), getPhotos()"
					>{{ keyword }}
				</span>
				<button
					class="absolute top-0 right-0"
					@click.prevent="removeItem(i)"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1 -mt-2 text-gray-600 hover:text-red-600"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</span>
			<button
				class="border bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
				@click.prevent="clearHistory()"
			>
				<div class="flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4 mr-1"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clip-rule="evenodd"
						/>
					</svg>
					Clear All
				</div>
			</button>
		</div>

		<t-alert
			v-if="found > 0"
			class="mb-5"
			variant="success"
			:dismissible="false"
			show
		>
			{{ found }} <span v-if="found == 1">photo</span
			><span v-else>photos</span> found in {{ result_count }} tweets
		</t-alert>

		<!-- all props & events -->
		<div>
			<vue-easy-lightbox
				escDisabled
				moveDisabled
				:visible="visible"
				:imgs="imgs"
				:index="index"
				@hide="handleHide"
			></vue-easy-lightbox>
			<masonry :cols="4" :gutter="10">
				<div
					v-for="(src, index) in imgs"
					:key="index"
					class="pic"
					@click="() => showImg(index)"
				>
					<img class="item" :src="src" />
				</div>
			</masonry>
		</div>

		<div v-if="loading" class="spinner my-10"></div>

		<t-button
			v-if="next_token"
			@click.prevent="nextPhotos(next_token)"
			class="uppercase font-bold my-5"
		>
			Load More Photos
		</t-button>

		<t-alert class="my-5" v-if="found > 0 && !next_token" show>
			All Done. No more tweets found...
		</t-alert>

		<t-alert class="my-5" v-if="msg" variant="danger" show>
			{{ msg }}
		</t-alert>
	</div>
</template>

<script>
import ShowImage from "@/components/ShowImage.vue";
import VueEasyLightbox from "vue-easy-lightbox";
import api from "@/api";

export default {
	components: {
		ShowImage,
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
			recent_searches: [],
			videos: [],
			include: {},
		};
	},
	created() {
		this.recent_searches = JSON.parse(
			localStorage.getItem("recent_searches")
		);
	},
	methods: {
		getPhotos() {
			this.imgs = [];
			this.msg = "";
			this.loading = true;

			if (!this.recent_searches.includes(this.user)) {
				this.recent_searches.push(this.user);
				localStorage.setItem(
					"recent_searches",
					JSON.stringify(this.recent_searches)
				);
			}

			// console.log(JSON.parse(localStorage.getItem("recent_searches")));

			if (this.results < 5) {
				this.msg = "Minimum results for tweets can not be less than 5";
				this.loading = false;
				return;
			}

			if (this.user) {
				api.get(`2/users/by/username/${this.user}`).then((res) => {
					// console.log(res.data);

					if (!res.data.hasOwnProperty("data")) {
						this.msg = "User not found";
						this.loading = false;
						return;
					}

					let exclude = "exclude=retweets,replies&";
					if (this.include.retweets && this.include.replies) {
						exclude = "";
					} else if (this.include.retweets) {
						exclude = "exclude=replies&";
					} else if (this.include.replies) {
						exclude = "exclude=retweets&";
					}

					this.userId = res.data.data.id;

					this.search_params = `${exclude}max_results=${this.results}&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=media_key,type,url,preview_image_url`;

					console.log(this.search_params);

					api.get(
						`2/users/${this.userId}/tweets?${this.search_params}`
					)
						.then((res) => {
							console.log(res.data);

							if (res.data.errors) {
								this.msg = res.data.errors[0].detail;
								this.loading = false;
								return;
							}

							if (!res.data.hasOwnProperty("includes")) {
								this.next_token = res.data.meta.next_token;
								this.result_count = res.data.meta.result_count;
								this.msg = `No photo found in ${this.result_count} tweets. Try to increase number of tweets`;
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
						})
						.catch((err) => {
							console.log(err);
						});
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
		nextPhotos(token) {
			this.loading = true;

			api.get(
				`2/users/${this.userId}/tweets?${this.search_params}&pagination_token=${token}`
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
		clearHistory() {
			localStorage.removeItem("recent_searches");
			this.recent_searches = [];
		},
		removeItem(i) {
			// console.log(i, "remove");
			this.recent_searches.splice(i, 1);
			localStorage.setItem(
				"recent_searches",
				JSON.stringify(this.recent_searches)
			);
		},
	},
};
</script>
