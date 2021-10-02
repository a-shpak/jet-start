import { JetView } from "webix-jet";

export default class DataTableView extends JetView {
	constructor(app, data, columns) {
		super(app);
		if (!data) {
			webix.message("Data collection is undefined");
		}
		this._dataItems = data;
		this._tableCols = columns;
	}
	config() {
		return this._dataItems.waitData.then(() => {
			const data = this._dataItems;
			const obj = data.getItem(data.getFirstId());
			const fields = Object.keys(obj);

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
				}
			};
			
			const thisClass = this; 
			const form = {
				localId:"form",
				view:"autoform",
				fields:fields,
				actionSave:function(values) {
					if (!values) return;
					const form = thisClass.$$("form");
					if (data.exists(values.id)) {
						data.updateItem(values.id, values);
					} else {
						data.add(values);
					}
					form.clear();
					thisClass.$$("table").clearSelection();
				},
				actionCancel:function() {
					this.$scope.$$("form").clear();
					this.$scope.$$("table").clearSelection();
				}
			};
	
			const ui = {
				rows:[
					table, 
					form,
				]
			};
			return ui;
		});
	}
	init(view) {
		view.$scope.$$("table").sync(this._dataItems);
		view.$scope.$$("form").bind(view.queryView({localId:"table"}));
	}
}