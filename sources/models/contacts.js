import { URLs } from "../other/urls.js";

export const contactsCollection = new webix.DataCollection({
	url:URLs.urlContacts,
	save:`rest->${URLs.urlContacts}` 
});