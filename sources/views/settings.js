import { JetView } from "webix-jet";

export default class SettingsView extends JetView  {
	config() {

		const lang = this.app.getService("locale").getLang();
		const _ = this.app.getService("locale")._;
		const ru = _("Russian");
		const en = _("English");
		
		return {
			localId:"segmented_button",
			view:"segmented", 
			options:[
				{ id:"ru", value:ru, },
				{ id:"en", value:en, },
			],
			click:() => this.toggleLanguage(),
			value:lang,
		};
	}
	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("segmented_button").getValue();
		langs.setLang(value);
	}
}