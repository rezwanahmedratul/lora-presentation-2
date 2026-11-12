import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-1eyODkHT.js
var $$splitComponentImporter = () => import("./routes-C1YNohJw.mjs");
var Route = createFileRoute("/")({
	validateSearch: (s) => s["slide"] ? { slide: Number(s["slide"]) } : {},
	head: () => ({ meta: [
		{ title: "LoRa — Long Range Wireless Communication" },
		{
			name: "description",
			content: "A keynote-style introduction to LoRa: how it works, hardware, communication and real-world uses."
		},
		{
			property: "og:title",
			content: "LoRa — Long Range Wireless Communication"
		},
		{
			property: "og:description",
			content: "A keynote-style introduction to LoRa and long-range IoT communication."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
