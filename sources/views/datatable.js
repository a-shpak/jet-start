import { JetView } from "webix-jet";

export default class DataTableView extends JetView {
	constructor(app, data, columns, rules) {
		super(app);
		if (!data) {
			webix.message("Data collection is undefined");
		}
		this._dataItems = data;
		this._tableCols = columns;
		this._tableRules = rules;
	}
	config() {
		return this._dataItems.waitData.then(() => {
			const data = this._dataItems;
			const obj = data.getItem(data.getFirstId());
			const fields = Object.keys(obj).filter(key => key != "id" && !key.includes("$"));
			
			const table = {
				localId:"table",
				view:"datatable",
				columns:this._tableCols,
				select:true,
				onClick: {
					"wxi-trash":function(e, id) {
						data.remove(id);
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
			
			const thisClass = this; 
			const form = {
				localId:"form",
				view:"autoform",
				fields:fields,
				actionSave:function(values) {
					const form = thisClass.$$("form");
					if (form.validate()) {
						if (data.exists(values.id)) {
							data.updateItem(values.id, values);
						} else {
							data.add(values);
						}
						form.clear();
						thisClass.$$("table").clearSelection();
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