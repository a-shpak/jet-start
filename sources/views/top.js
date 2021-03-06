import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config() {
		const _ = this.app.getService("locale")._;
		const app = _("App");
		var header = {
			type:"header", template:app, css:"webix_header app_header"
		};
		var menu = {
			view:"menu", id:"top:menu", 
			css:"app_menu",
			width:180, layout:"y", select:true,
			template:function(obj) {
				return _(obj.value);
			},
			data:[
				{ value:"Data",		id:"data", },
				{ value:"Contacts", id:"contact", },
				{ value:"Settings", id:"settings", },
			]
		};

		var ui = {
			type:"clean", paddingX:5, css:"app_layout", cols:[
				{  paddingX:5, paddingY:10, rows: [ {css:"webix_shadow_medium", rows:[header, menu]} ]},
				{ type:"wide", paddingY:10, paddingX:5, rows:[
					{ $subview:true } 
				]}
			]
		};

		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu");
	}
}