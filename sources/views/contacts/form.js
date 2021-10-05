import { JetView } from "webix-jet";
import { contactsCollection } from "../../models/contacts.js";
import { statusesCollection } from "../../models/statuses.js";
import { countriesCollection } from "../../models/countries.js";
import { URLs } from "../../other/urls.js";
import { showError } from "../../other/helpers.js";

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
				{ view:"text", label:name, name:"FirstName" },
				{ view:"text", label:email, name:"Email" },
				{ view:"combo", label:status, name:"StatusID", options:{ body:{ data:statusesCollection, template:"#Value#" }} },
				{ view:"combo", label:country, name:"Address", options:{ body:{ data:countriesCollection, template:"#Name#" }} },
				{ cols:[ 
					{ view:"button", label:save, css:"webix_primary", click:saveClick },
					{ view:"button", label:cancel, click:cancelClick },
				] },
				{}
			],
			rules:{
				FirstName:val => !!val,
				Email:val => !!val,
			}
		};
	}
	init() {
		const form = this.$$("form");
		this.on(this.app, "onContactItemSelected", function(item) {
			form.clearValidation();
			if (contactsCollection.exists(item.id)) {
				form.setValues(item);
			} else {
				this.$scope.app.show("top/contact");
			}
		});
		this.on(this.app, "onAfterContactDeleted", () => form.clear());
	}
}

function saveClick() {
	const form = this.$scope.$$("form");
	if (!form.validate()) {
		return;
	}
	const values = form.getValues();
	if (!contactsCollection.exists(values.id)) {
		// webix.ajax().post(URLs.urlContacts, values, (result) => {
		// 	values.id = JSON.parse(result).id;
		// 	contactsCollection.add(values);
		// 	this.$scope.app.callEvent("onAfterContactAdded", []);
		// }).fail(showError());
		contactsCollection.waitSave(() => {
			contactsCollection.add(values);
		}).then((result) => {
			values.id = result.id;
			this.$scope.app.callEvent("onAfterContactAdded", []);
		});
	} else {
		contactsCollection.waitSave(() => {
			contactsCollection.updateItem(values.id, values);
		});
		// webix.ajax().put(URLs.urlContacts + values.id, values, () => {
		// 	contactsCollection.updateItem(values.id, values);
		// }).fail(showError());
	}
}

function cancelClick() {
	this.$scope.$$("form").clear();
	this.$scope.app.callEvent("onClearContactsForm", []); 
}