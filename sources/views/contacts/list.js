import { JetView } from "webix-jet";
import { contactsCollection } from "../../models/contacts";
import { countriesCollection } from "../../models/countries.js";
import { statusesCollection } from "../../models/statuses";

export default class ContactsListView extends JetView {
	config() {
		return contactsCollection.waitData.then(() => ({
			view:"list",
			localId:"list",
			template:function(obj) {
				let country = countriesCollection.getItem(obj.Country);
				let status = statusesCollection.getItem(obj.Status);
				let dCountry = !country ? "" : `from ${country.Name}`;
				let dStatus = !status ? "" : `[${status.Name}]`;
				if (!status) status = {Name:""};
				return 	`<div style="font-weight:bold;">${obj.Name}. (${obj.Email})</div>` + 
						`<div> ${dCountry} ${dStatus} <span class='webix_icon wxi-trash' style='float:right;'></span></div>`;
			},
			onClick:{
				"wxi-trash":function(e, id) {
					contactsCollection.remove(id);
					this.$scope.$$("list").unselectAll();
					this.$scope.app.show("top/contact");
					this.$scope.app.callEvent("onAfterContactDeleted", []);
					return false;
				}
			},
			type:{
				height:60,
			},
			select:true,
			on:{
				onAfterSelect:function(id) {
					this.$scope.setParam("id", id, true);
					this.$scope.app.callEvent("onContactItemSelected", [contactsCollection.getItem(id)]);
				}
			}
		})); 
	}
	init(view) {
		const list = view.$scope.$$("list");
		list.sync(contactsCollection);
		const id = view.$scope.getParam("id");
		if (!id || !contactsCollection.exists(id)) {
			view.select(view.data.getFirstId(), false);
		} 
		else {
			view.select(id, false);
		}
		this.on(this.app, "onClearContactsForm", function() {
			list.unselectAll();
		});
		this.on(this.app, "onAfterContactAdded", function() {
			const lastId = contactsCollection.getLastId();
			view.$scope.app.show("top/contact?id=" + lastId);
			list.select(lastId);
		});
	}
}