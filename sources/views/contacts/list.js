import { JetView } from "webix-jet";
import { contactsCollection } from "../../models/contacts";

export default class ContactsListView extends JetView {
	config() {
		return contactsCollection.waitData.then(() => ({
			view:"list",
			localId:"list",
			template:"<div style=\"font-weight:bold;\">#id#. #Name# (#Country#)</div><div>#Email# {common.trashIcon()} </div>",
			onClick:{
				// "wxi-trash":function(id) {
					
				// }
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
	}
}