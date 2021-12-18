module.exports = {
	content: ["./src/**/*.{html,js, vue}"],
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
