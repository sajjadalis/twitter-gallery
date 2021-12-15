module.exports = {
	content: ["./src/**/*.{html,js, vue}"],
	variants: {
		extend: {
			opacity: ["disabled"],
			cursor: ["disabled"],
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
