import type { App } from "vue";
import type router from "@/router";
import type { Pinia } from "pinia";

export interface IChatMessage {
	"display-name": string;
	message: string;
	color: string;
}

export interface PluginContext {
	app: App;
	router: typeof router;
	pinia: Pinia;
}
