export const countriesCollection = new webix.DataCollection({
	url() {
		const promisedData = webix.promise.defer();
		promisedData.resolve([
			{"id":1,"Name":"USA"},
			{"id":2,"Name":"Canada"},
			{"id":3,"Name":"Italy"}
		]);
		return promisedData;
	}
});