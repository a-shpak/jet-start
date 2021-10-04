import { JetView } from "webix-jet";
import ContactsListView from "./contacts/list.js";
import ContactsFormView from "./contacts/form.js";

export default class ContactsView extends JetView {
	config() {
		const list = new ContactsListView(this.app);
		const form = new ContactsFormView(this.app);

		const ui = {
			cols:[ list, form ],
		};

		return ui;
	}
}