<template>
	<div class="container">
		<div class="gallery-row">
			<div class="gallery-container">
				<lightbox
					css="h-200 h-lg-250"
					:items="media"
					:cells="5"
				></lightbox>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Home",
	data: () => ({
		media: [],
		images: [
			"https://i.wifegeek.com/200426/f9459c52.jpg",
			"https://i.wifegeek.com/200426/5ce1e1c7.jpg",
			"https://i.wifegeek.com/200426/5fa51df3.jpg",
			"https://i.wifegeek.com/200426/663181fe.jpg",
			"https://i.wifegeek.com/200426/2d110780.jpg",
			"https://i.wifegeek.com/200426/e73cd3fa.jpg",
			"https://i.wifegeek.com/200426/15160d6e.jpg",
			"https://i.wifegeek.com/200426/d0c881ae.jpg",
			"https://i.wifegeek.com/200426/a154fc3d.jpg",
			"https://i.wifegeek.com/200426/71d3aa60.jpg",
			"https://i.wifegeek.com/200426/d17ce9a0.jpg",
			"https://i.wifegeek.com/200426/7c4deca9.jpg",
			"https://i.wifegeek.com/200426/64672676.jpg",
			"https://i.wifegeek.com/200426/de6ab9c6.jpg",
			"https://i.wifegeek.com/200426/d8bcb6a7.jpg",
			"https://i.wifegeek.com/200426/4085d03b.jpg",
			"https://i.wifegeek.com/200426/177ef44c.jpg",
			"https://i.wifegeek.com/200426/d74d9040.jpg",
			"https://i.wifegeek.com/200426/81e24a47.jpg",
			"https://i.wifegeek.com/200426/43e2e8bb.jpg",
		],
	}),
	mounted() {
		// axios.get("https://picsum.photos/v2/list").then( res => {
		//     console.log(res.data)
		//     this.media = res.data
		// })

		const api = axios.create({
			baseURL:
				"https://ctvf-cors.herokuapp.com/https://api.twitter.com/2/users/",
		});

		let access_token =
			"AAAAAAAAAAAAAAAAAAAAALGYOAEAAAAA9tLIFSW%2FsMRGH1ggf2bHqGV8J3k%3DRE0YtlHOw2yrQ1A1bVcud7233JpsV3Mv1qQ22RoxainR0fA4st";

		api.get("by/username/baddiesportt", {
			headers: { Authorization: `Bearer ${access_token}` },
		}).then((res) => {
			console.log(res.data.data.id);

			let userId = res.data.data.id;

			api.get(
				`${userId}/tweets?max_results=100&tweet.fields=attachments&expansions=attachments.media_keys&media.fields=media_key,type,url,preview_image_url`,
				{ headers: { Authorization: `Bearer ${access_token}` } }
			).then((res) => {
				// console.log(res.data.includes.media);

				let data = res.data.includes.media;

				data.forEach((img) => {
					if (img.type == "photo") {
						this.media.push(img.url);
					}
				});

				console.log(this.media);
			});
		});
	},
};
</script>
<style>
.lb-grid {
	position: relative;
	display: block;
}
.lb-item {
	position: absolute;
	background-position: 50%;
	background-repeat: no-repeat;
	background-size: cover;
	border-top: 2px solid #fff;
	border-right: 2px solid #fff;
	cursor: pointer;
}
.lb-grid-1 .lb-item {
	width: 100%;
	height: 100%;
}
.lb-grid-2 .lb-item,
.lb-grid-3 .lb-item,
.lb-grid-4 .lb-item,
.lb-grid-5 .lb-item {
	width: 50%;
}
.lb-grid-2 .lb-item,
.lb-grid-3 .lb-item:first-child,
.lb-grid-4 .lb-item:first-child {
	height: 100%;
}
.lb-grid-3 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:first-child,
.lb-grid-5 .lb-item:nth-child(2) {
	height: 50%;
}
.lb-grid-2 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(2),
.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(2),
.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(5),
.lb-item:last-child {
	left: auto;
	right: 0;
	border-right: 0;
}
.lb-grid-3 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(2),
.lb-grid-5 .lb-item:nth-child(5) {
	bottom: 0;
	top: auto;
}
.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4) {
	top: 33.333333333333336%;
}
.lb-grid-4 .lb-item:nth-child(2),
.lb-grid-4 .lb-item:nth-child(3),
.lb-grid-4 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(3),
.lb-grid-5 .lb-item:nth-child(4),
.lb-grid-5 .lb-item:nth-child(5) {
	height: 33.333333333333336%;
}
.lb-more {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	text-align: center;
	color: #fff;
	font-size: 3rem;
	background-color: rgba(0, 0, 0, 0.4);
}
.lb-more:before {
	display: inline-block;
	content: "";
	vertical-align: middle;
	height: 100%;
}
.lb-modal {
	transition: opacity 0.2s ease;
	position: fixed;
	z-index: 99999;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	min-height: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.8);
	display: block;
	-webkit-user-select: none;
	-moz-user-select: -moz-none;
	-o-user-select: none;
	-ms-user-select: none;
	user-select: none;
}
.lb-modal-close {
	position: absolute;
	right: 20px;
	top: 20px;
	color: #fff;
}
.lb-modal-next,
.lb-modal-prev {
	position: absolute;
	top: 50%;
	left: 20px;
	margin-top: -25px;
	z-index: 999;
	cursor: pointer;
	color: #fff;
	background-color: transparent;
	border: none;
}
.lb-modal-next {
	left: auto;
	right: 20px;
}
.lb-modal-img {
	position: absolute;
	top: 10px;
	left: 70px;
	right: 70px;
	bottom: 10px;
	text-align: center;
}
.lb-modal-img:before {
	display: inline-block;
	content: "";
	vertical-align: middle;
	height: 100%;
}
.lb-modal-img img {
	max-width: 100%;
	max-height: 100%;
	vertical-align: middle;
	-o-object-fit: contain;
	object-fit: contain;
}
.lb-modal-img .spinner {
	width: 150px;
	position: absolute;
	margin-left: -75px;
	top: 50%;
	left: 50%;
	z-index: 1;
}
.container {
	width: 50%;
	margin: auto;
}
</style>
