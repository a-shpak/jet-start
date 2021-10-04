import { isFieldValid } from "../other/helpers.js";
import { isHandlerValid } from "../other/helpers.js";

webix.protoUI({
	name:"autoform",
	$init:function(config) {
		autoFormDefaultValues(config);
		const _ = this.$scope.app.getService("locale")._;
		config.elements = [];
		config.fields.forEach(value => {
			config.elements.push({ view:"text", label:_(value), name:value });
		});
		const save = _("Save");
		const cancel = _("Cancel");
		config.elements.push({view:"toolbar", css:"borderless", cols: [
			{ view:"button", value:cancel, inputWidth:150, click:config.actionCancel },
			{ view:"button", value:save, css:"webix_primary", align:"right", inputWidth:150, click:() => config.actionSave(this.getValues(), this) },
		]});
		config.elements.push({});
		config.maxWidth = 400;	
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