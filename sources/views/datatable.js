import { JetView } from "webix-jet";

export default class DataTableView extends JetView {
	constructor(app, name, data, columns) {
		super(app, name);
		if (!data) {
			webix.message("Data collection is undefined");
		}
		this._dataItems = data;
		this._tableCols = columns;
	}
	config() {
		const i = this._dataItems.data.order[0];
		const obj = this._dataItems.data.pull[i];
		const fields = Object.keys(obj);
	
		const table = {
			localId:"table",
			view:"datatable",
			columns:this._tableCols,
			select:true,
			onClick: {
				"wxi-trash":function(e, id) {
					this.remove(id);
					return false;
				}
			}
		};

		const form = {
			localId:"form",
			view:"autoform",
			fields:fields,
			actionSave:function() {
				const form = this.$scope.$$("form"); 
				form.save();
				form.clear();
				this.$scope.$$("table").clearSelection();
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
	}
	init(view) {
		view.$scope.$$("table").parse(this._dataItems);
		view.$scope.$$("form").bind(view.queryView({localId:"table"}));
	}
}