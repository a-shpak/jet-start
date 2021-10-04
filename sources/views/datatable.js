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
			// const obj = data.getItem(data.getFirstId()); 
			// const fields = obj ? Object.keys(obj).filter(key => !key.includes("$") && key != "id" && key.toLowerCase() != "code") : extra;
			const fields = this._tableCols.map(obj => obj.id).filter(key => !key.includes("$") && !exeptValues.some(val => val == key.toLowerCase()));
			
			const table = {
				localId:"table",
				view:"datatable",
				columns:this._tableCols,
				select:true,
				onClick: {
					"wxi-trash":function(e, obj) {
						return webix.ajax().del(this.$scope._url + obj.row, { id : obj.row }).then(() => {
							data.remove(obj);
							this.$scope.$$("form").clear();
							return false;
						}).fail(showError());
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
							webix.ajax().put(self._url + values.id, values, () => {
								data.updateItem(values.id, values);
							}).fail(showError());
						} else {
							webix.ajax().post(self._url, values, (result) => {
								values.id = JSON.parse(result).id;
								data.add(values);
							}).fail(showError());
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
		});
	}
	init(view) {
		view.$scope.$$("table").sync(this._dataItems);
	}
}

