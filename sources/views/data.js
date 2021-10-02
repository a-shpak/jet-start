import { JetView } from "webix-jet";
import DataTableView from "./datatable.js";
import { countriesCollection } from "../models/countries.js";
import { statusesCollection } from "../models/statuses.js";

export default class DataView extends JetView {

	config() {
		const tabs = {
			view:"tabbar",
			options:[
				{ id:"cell_countries", value:"Countries" },
				{ id:"cell_statuses", value:"Statuses" },
			],
			on:{
				onChange:function(nextId) {
					this.$scope.$$(nextId).show();
				}
			}
		};	

		const colsCountries = [
			{ id:"id", title:"Title" },
			{ id:"Name", title:"Name", editor:"text" },
			{ id:"delete", title:"", template:"{common.trashIcon()}" },
		];

		const colsStatuses = [
			{ id:"id", title:"Title" },
			{ id:"Name", title:"Name", editor:"text" },
			{ id:"Icon", title:"Icon", editor:"text" },
			{ id:"delete", title:"", template:"{common.trashIcon()}" },
		];

		const ui = {
			localId:"cells_data",
			rows:[
				tabs,
				{ cells:[
					{ id:"cell_countries", rows:[new DataTableView(this.app, countriesCollection, colsCountries)] },
					{ id:"cell_statuses", rows:[new DataTableView(this.app, statusesCollection, colsStatuses)] },
				]},
			]
		};

		return ui;
	}
}