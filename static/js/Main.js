queue()
	.defer(d3.csv, error_data_url)
	.await(ready);

function ready(error, error_data) {

	d3Functions(error_data)
}