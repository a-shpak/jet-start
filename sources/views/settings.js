import { JetView } from "webix-jet";

export default class SettingsView extends JetView  {
	config() {
		return {
			localId:"segmented_button",
			view:"segmented", 
			options:[
				{ id:"ru", value:"Russian" },
				{ id:"en", value:"English" },
			],
		};
	}
}