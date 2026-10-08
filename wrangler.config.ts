import { defineWranglerConfig } from "wrangler/experimental-config";

export default defineWranglerConfig({
	build: {
		command: "node build.js",
		watchDir: [
			"contributors",
			"public",
			"views",
		],
	},
	types: {
		generate: false,
	},
	assetsDirectory: "./dist",
});
