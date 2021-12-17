<template>
	<div class="container mx-auto">
		<form class="flex" @submit.prevent="getVideos">
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
			<div class="w-60">
				<t-button type="submit" class="uppercase font-bold"
					>Get Videos</t-button
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
			{{ found }} <span v-if="found == 1">video</span
			><span v-else>videos</span> found in {{ result_count }} tweets
		</t-alert>

		<div v-if="videos.length > 0">
			<masonry :cols="4" :gutter="10">
				<div v-for="(video, i) in videos" :key="i">
					<a href="#" @click.prevent="videoShow"
						><img class="item" :src="video.image"
					/></a>
					<!-- <Artplayer
						:option="{
							url: video.url,
							poster: video.image,
							// autoSize: true,
							hotkey: true,
							loop: true,
							mutex: true,
							fullscreen: true,
							fullscreenWeb: true,
							miniProgressBar: true,
							flip: true,
							playbackRate: true,
							setting: true,
						}"
						:style="style"
					/> -->

					<transition name="ctvf-popup" type="animation">
						<div
							v-if="vidShow"
							class="ctvf-vidshow"
							v-on:click="videoShow"
						>
							<Artplayer
								:option="{
									url: video.url,
									poster: video.image,
									// autoSize: true,
									hotkey: true,
									loop: true,
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
						</div>
					</transition>
				</div>
			</masonry>
		</div>

		<div v-if="loading" class="spinner my-10"></div>

		<t-button
			v-if="next_token"
			@click.prevent="nextVideos(next_token)"
			class="uppercase font-bold my-5"
		>
			Load More Videos
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
// Method.3 Local registration
import VueEasyLightbox from "vue-easy-lightbox";
import axios from "axios";
import api from "@/api";
import Artplayer from "artplayer/examples/vue/Artplayer";

let history = JSON.parse(localStorage.getItem("recent_searches"));

export default {
	components: {
		VueEasyLightbox,
		Artplayer,
		FsLightbox,
	},
	data() {
		return {
			user: "BBCEarth",
			userId: "",
			search_params: "",
			results: 10,
			found: 0,
			imgs: [], // Img Url , string or Array of string
			visible: false,
			index: 0, // default: 0,
			msg: "",
			loading: false,
			result_count: 0,
			next_token: "",
			recent_searches: history ? history : [],
			videos: [],
			style: {
				width: "100%",
				height: "300px",
				margin: "0 auto 10px",
			},
			vidShow: false,
		};
	},
	methods: {
		getVideos() {
			this.videos = [];
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

					this.userId = res.data.data.id;

					this.search_params = `max_results=${this.results}&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=media_key,type,url,preview_image_url`;

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

							// console.log(res.data);
							let tweets = res.data.data;
							let media = res.data.includes.media;
							let props = ["id"];
							let result = tweets
								.filter(function (o1) {
									// filter out (!) items in media
									return media.some(function (o2) {
										if (
											o1.hasOwnProperty("attachments") &&
											o1.attachments.hasOwnProperty(
												"media_keys"
											)
										) {
											if (o2.type == "video") {
												return o1.attachments.media_keys.includes(
													o2.media_key
												);
											}
										}
									});
								})
								.map(function (o) {
									// use reduce to make objects with only the required properties
									return props.reduce(function (newo, id) {
										newo[id] = o[id];
										return newo;
									}, {});
								});
							console.log(result);
							result.forEach((tweet) => {
								api.get(
									`1.1/statuses/show/${tweet.id}.json`
								).then((res) => {
									// check if extended objects exists containing video urls
									if (res.data.extended_entities) {
										// get array of all video variants
										let videoArr =
											res.data.extended_entities.media[0]
												.video_info.variants;
										// let find only mp4 files and push them to new videos array
										let videos = [];
										videoArr.forEach((v) => {
											if (v.content_type == "video/mp4") {
												videos.push(v);
											}
										});
										// time to get video with higher bitrate
										let video_with_higher_bitrate =
											videos.reduce(function (
												prev,
												current
											) {
												return prev.bitrate >
													current.bitrate
													? prev
													: current;
											});
										// console.log(video_with_higher_bitrate);
										// get video sizes
										let sizes =
											res.data.extended_entities.media[0]
												.sizes;
										// create image url object
										let image = {
											image: res.data.extended_entities
												.media[0].media_url_https,
										};
										// create new object with each vide, sizes & image url
										let newObj = {
											...video_with_higher_bitrate,
											...sizes,
											...image,
										};
										// push newly created object to videos array
										this.videos.push(newObj);

										this.found = this.videos.length;
									}
								});
							});
							// console.log(this.videos);

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
		nextVideos(token) {
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

				let tweets = res.data.data;
				let media = res.data.includes.media;
				let props = ["id"];
				let result = tweets
					.filter(function (o1) {
						// filter out (!) items in media
						return media.some(function (o2) {
							if (
								o1.hasOwnProperty("attachments") &&
								o1.attachments.hasOwnProperty("media_keys")
							) {
								if (o2.type == "video") {
									return o1.attachments.media_keys.includes(
										o2.media_key
									);
								}
							}
						});
					})
					.map(function (o) {
						// use reduce to make objects with only the required properties
						return props.reduce(function (newo, id) {
							newo[id] = o[id];
							return newo;
						}, {});
					});
				console.log(result);
				result.forEach((tweet) => {
					api.get(`1.1/statuses/show/${tweet.id}.json`).then(
						(res) => {
							// check if extended objects exists containing video urls
							if (res.data.extended_entities) {
								// get array of all video variants
								let videoArr =
									res.data.extended_entities.media[0]
										.video_info.variants;
								// let find only mp4 files and push them to new videos array
								let videos = [];
								videoArr.forEach((v) => {
									if (v.content_type == "video/mp4") {
										videos.push(v);
									}
								});
								// time to get video with higher bitrate
								let video_with_higher_bitrate = videos.reduce(
									function (prev, current) {
										return prev.bitrate > current.bitrate
											? prev
											: current;
									}
								);
								// console.log(video_with_higher_bitrate);
								// get video sizes
								let sizes =
									res.data.extended_entities.media[0].sizes;
								// create image url object
								let image = {
									image: res.data.extended_entities.media[0]
										.media_url_https,
								};
								// create new object with each vide, sizes & image url
								let newObj = {
									...video_with_higher_bitrate,
									...sizes,
									...image,
								};
								// push newly created object to videos array
								this.videos.push(newObj);

								this.found = this.videos.length;
							}
						}
					);
				});

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
		videoShow() {
			this.vidShow = !this.vidShow;
		},
	},
};
</script>
