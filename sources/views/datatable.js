import { JetView } from "webix-jet";

export default class DataTableView extends JetView {
	constructor(app, name, data, columns) {
		super(app, name);
		this._dataItems = data;
		this._tableCols = columns;
	}
	config() {
		const obj = this._dataItems.data.pull[1];
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
				this.$scope.getRoot().queryView({ localId:"form" }).save();
				this.$scope.getRoot().queryView({ localId:"form" }).clear();
				this.$scope.getRoot().queryView({ localId:"table" }).clearSelection();
			},
			actionCancel:function() {
				this.$scope.getRoot().queryView({ localId:"form" }).clear();
				this.$scope.getRoot().queryView({ localId:"table" }).clearSelection();
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
		view.queryView({ localId:"table" }).parse(this._dataItems);
		view.queryView({ localId:"form" }).bind(view.queryView({localId:"table"}));
	}
}