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
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
