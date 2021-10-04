import "./styles/app.css";
import {JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

export default class MyApp extends JetApp{
	constructor(config) {
		const defaults = {
			id 		: APPNAME,
			version : VERSION,
			router 	: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug 	: true,
			start 	: "/top/contact"
		};
		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE){
	webix.ready(() => {
		var app = new MyApp();
		app.attachEvent("app:error:resolve", function() {
			webix.delay(() => app.show("/top/data"));
		});
		app.use(plugins.Locale, { storage:webix.storage.local });
		app.render();
	});
}