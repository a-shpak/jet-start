import { URLs } from "../other/urls.js";

export const contactsCollection = new webix.DataCollection({
	url:URLs.urlContacts,
});


// 	{"id":1,"Name":"Alex Wanny","Email":"alex@gmail.com","Status":1,"Country":2},
// 	{"id":2,"Name":"Doris Wan","Email":"doris@gmail.com","Status":1,"Country":3}