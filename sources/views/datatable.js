import { JetView } from "webix-jet";
import { showError } from "../other/helpers.js";

const exeptValues = ["code", "id", "delete"];

export default class DataTableView extends JetView {
	constructor(app, data, columns, rules, url) {
		super(app);
		if (!data) {
			webix.message("Data collection is undefined");
		}
		this._dataItems = data;
		this._tableCols = columns;
		this._tableRules = rules;
		this._url = url;
	}
	config() {
		return this._dataItems.waitData.then(() => {
			const data = this._dataItems;
			const fields = this._tableCols.map(obj => obj.id).filter(key => !key.includes("$") && !exeptValues.some(val => val == key.toLowerCase()));
			
			const table = {
				localId:"table",
				view:"datatable",
				columns:this._tableCols,
				select:true,
				onClick: {
					"wxi-trash":function(e, obj) {
						data.waitSave(() => {
							data.remove(obj); 
						});
						return false;
					}
				},
				on:{
					onAfterSelect:function(item) {
						const form = this.$scope.$$("form"); 
						form.setValues(data.getItem(item.id));
					}
				}
			};
			
			const self = this; 
			const form = {
				localId:"form",
				view:"autoform",
				fields:fields,
				actionSave:function(values, form) {
					if (form.validate()) {
						if (data.exists(values.id)) {
							data.waitSave(() => {
								data.updateItem(values.id, values);
							});
						} else {
							data.waitSave(() => {
								data.add(values);
							}).then(result => {
								values.id = result.id;
							});
						}
						form.clear();
						self.$$("table").clearSelection();
					}
				},
				actionCancel:function() {
					this.$scope.$$("form").clear();
					this.$scope.$$("table").clearSelection();
				},
				rules:this._tableRules,
			};
	
			const ui = {
				cols:[
					table, 
					form,
				]
			};
			return ui;
		}).fail(showError("Datatabe is not loaded"));
	}
	init(view) {
		view.$scope.$$("table").sync(this._dataItems);
	}
}