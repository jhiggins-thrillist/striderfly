import { defineConfig } from "cf/config";

export default defineConfig({
	// The personal account that owns j0wy.com
	accountId: "25537cbfe9f8ee550e77f1e0a61aea5d",
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
