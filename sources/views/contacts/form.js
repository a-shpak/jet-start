import { JetView } from "webix-jet";
import { contactsCollection } from "../../models/contacts.js";
import { statusesCollection } from "../../models/statuses.js";
import { countriesCollection } from "../../models/countries.js";

export default class ContactsFormView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;
		const name = _("Name");
		const email = _("Email");
		const status = _("Status");
		const country = _("Country");
		const save = _("Save");
		const cancel = _("Cancel");
		const edit = _("edit contact");

		return {
			view:"form",
			localId:"form",
			elements:[
				{ view:"template", type:"section", template:edit },
				{ view:"text", label:name, name:"Name" },
				{ view:"text", label:email, name:"Email" },
				{ view:"combo", label:status, name:"Status", options:{ body:{ data:statusesCollection, template:"#Name#" }} },
				{ view:"combo", label:country, name:"Country", options:{ body:{ data:countriesCollection, template:"#Name#" }} },
				{ cols:[ 
					{ view:"button", label:save, css:"webix_primary", click:saveClick },
					{ view:"button", label:cancel, click:cancelClick },
				] },
				{}
			],
		};
	}
	init() {
		const form = this.$$("form");
		this.on(this.app, "onContactItemSelected", (item) => form.setValues(item));
	}
}

function saveClick() {
	const values = this.$scope.$$("form").getValues();
	if (!contactsCollection.exists(values.id)) {
		contactsCollection.add(values);
	} else {
		contactsCollection.updateItem(values.id, values);
	}
}

function cancelClick() {
	this.$scope.$$("form").clear();
	this.$scope.app.callEvent("onClearContactsForm", []); 
}