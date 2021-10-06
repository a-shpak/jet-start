import { JetView } from "webix-jet";
import DataTableView from "./datatable.js";
import { countriesCollection } from "../models/countries.js";
import { statusesCollection } from "../models/statuses.js";
import { URLs } from "../other/urls.js";

export default class DataView extends JetView {

	config() {
		const _ = this.app.getService("locale")._;
		const countries = _("Countries");
		const statuses = _("Statuses");

		const tabs = {
			view:"tabbar",
			options:[
				{ id:"cell_countries", value:countries },
				{ id:"cell_statuses", value:statuses },
			],
			on:{
				onChange:function(nextId) {
					this.$scope.$$(nextId).show();
				}
			}
		};	

		const name = _("Value");
		const icon = _("Icon");

		const colsCountries = [
			{ id:"id", header:"" },
			{ id:"Name", header:name, fillspace:true },
			{ id:"delete", header:"", template:"{common.trashIcon()}" },
		];

		const rulesCountries = {
			"Name": webix.rules.isNotEmpty,
		};

		const colsStatuses = [
			{ id:"id", header:"" },
			{ id:"Value", header:name, fillspace:true },
			{ id:"Icon", header:icon },
			{ id:"delete", header:"", template:"{common.trashIcon()}" },
		];

		const rulesStatuses = {
			"Value": webix.rules.isNotEmpty,
			"Icon": webix.rules.isNotEmpty,
		};

		const ui = {
			localId:"cells_data",
			rows:[
				tabs,
				{ cells:[
					{ id:"cell_countries", rows:[new DataTableView(this.app, countriesCollection, colsCountries, rulesCountries, URLs.urlCountries)] },
					{ id:"cell_statuses", rows:[new DataTableView(this.app, statusesCollection, colsStatuses, rulesStatuses, URLs.urlStatuses)] },
				]},
			]
		};

		return ui;
	}
}