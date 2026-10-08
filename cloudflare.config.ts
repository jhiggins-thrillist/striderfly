import { defineConfig } from "cf/config";

export default defineConfig({
	worker: {
		name: "striderfly",
		compatibilityDate: "2026-10-06",
		workersDev: false,
		previewUrls: false,
		domains: [
			"striderfly.j0wy.com",
		],
		assets: {
			// Serves contributors/<handle>/index.html at /<handle>/, so the
			// relative paths inside each contributor's folder resolve.
			htmlHandling: "auto-trailing-slash",
			notFoundHandling: "404-page",
		},
	},
});
