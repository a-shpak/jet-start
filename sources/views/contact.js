import { JetView } from "webix-jet";
import { contactsCollection } from "../models/contacts.js";

export default class ContactsView extends JetView {
	config() {
		const list = {
			view:"list",
			localId:"list_contacts",
			template:"<div style=\"font-weight:bold;\">#id#. #Name# (#Country#)</div><div>#Email#</div>",
			type:{
				height:60,
			},
			select:true,
		};

		const form = {
			view:"form",
			localId:"form_contacts",
			elements:[
				{ view:"template", type:"section", template:"edit contact" },
				{ view:"text", label:"Name", name:"name" },
				{ view:"text", label:"Email", name:"email" },
				{ view:"text", label:"Status", name:"status" },
				{ view:"text", label:"Country", name:"country" },
				{ cols:[ 
					{ view:"button", label:"Save", css:"webix_primary" },
					{ view:"button", label:"Clear", },
				] },
				{}
			],
		};

		const ui = {
			cols:[ list, form ],
		};

		return ui;
	}
	init(view) {
		view.queryView({ localId:"list_contacts" }).parse(contactsCollection);
	}
}