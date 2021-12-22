module.exports = {
	purge: ["./**/*.{js,vue}"],
	// purge: ["./src/views/**/*.vue", "./src/components/**/*.vue"],
	variants: {
		extend: {
			opacity: ["disabled"],
			cursor: ["disabled"],
		},
	},
	theme: {
		extend: {
			fontSize: {
				"2xs": ".7rem",
			},
			width: {
				85: "85%",
			},
			height: {
				128: "32rem",
				95: "95%",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
