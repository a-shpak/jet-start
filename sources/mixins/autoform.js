import { isFieldValid } from "../other/helpers.js";
import { isHandlerValid } from "../other/helpers.js";

webix.protoUI({
	name:"autoform",
	$init:function(config) {
		autoFormDefaultValues(config);
		config.elements = [];
		config.fields.forEach(value => {
			// const n = value.toLowerCase().replace(" ", "");
			if (value != "id"){
				config.elements.push({ view:"text", label:value, name:value });
			}
		});
		config.elements.push({view:"toolbar", css:"borderless", cols: [
			{ view:"button", value:"Cancel", inputWidth:150, click:config.actionCancel },
			{ view:"button", value:"Save", css:"webix_primary", align:"right", inputWidth:150, click:() => config.actionSave(this.getValues()) },
		]});
	},
}, webix.ui.form);

function autoFormDefaultValues(config) {
	if (!isFieldValid(config.fields)) {
		config.fields = ["Field 1", "Field 2"];
	}
	if (!isHandlerValid(config.actionSave)) {
		config.actionSave = formSaveClick;
	}
	if (!isHandlerValid(config.actionCancel)) {
		config.actionCancel = formCancelClick;
	}
}

function formSaveClick(value) {
	webix.message(value);
}
function formCancelClick() {
	const form = this.queryView("autoform", "parent");
	webix.confirm({
		title:"Cancel?",
		ok:"Yes", cancel:"No",
	})
		.then(function(){
			form.clear();
		});
}