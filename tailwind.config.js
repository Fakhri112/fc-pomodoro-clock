/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Titillium Web", "sans-serif"],
				comfortaa: ["Comfortaa", "sans-serif"],
			},
		},
	},
	plugins: [],
};
