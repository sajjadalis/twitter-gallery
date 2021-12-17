import axios from "axios";

let access_token =
	"AAAAAAAAAAAAAAAAAAAAALGYOAEAAAAA9tLIFSW%2FsMRGH1ggf2bHqGV8J3k%3DRE0YtlHOw2yrQ1A1bVcud7233JpsV3Mv1qQ22RoxainR0fA4st";

const api = axios.create({
	baseURL: "https://ctvf-cors.herokuapp.com/https://api.twitter.com/",
	headers: {
		Authorization: `Bearer ${access_token}`,
	},
});

export default api;
