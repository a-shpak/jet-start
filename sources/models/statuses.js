export const statusesCollection = new webix.DataCollection({
	url() {
		const promisedData = webix.promise.defer();
		promisedData.resolve([
			{"id":1,"Name":"Busy","Icon":"cogs", },
			{"id":2,"Name":"Open","Icon":"user"}
		]);
		return promisedData;
	}
});