const DataInput = (props) => {
	/* list of supported file types */
	const SheetJSFT = [
		"xlsx",
		"xlsb",
		"xlsm",
		"xls",
		"xml",
		"csv",
		"txt",
		"ods",
		"fods",
		"uos",
		"sylk",
		"dif",
		"dbf",
		"prn",
		"qpw",
		"123",
		"wb*",
		"wq*",
		"html",
		"htm",
	]
		.map(function (x) {
			return "." + x;
		})
		.join(",");

	const handleChange = (e) => {
		const files = e.target.files;
		if (files && files[0]) props.handleFile(files[0]);
	};

	return (
		<form className="form-inline">
			<div className="form-group">
				<h2 htmlFor="file">Add Excel Table</h2>
				<input type="file" className="form-control" id="file" accept={SheetJSFT} onChange={handleChange} />
			</div>
		</form>
	);
};

export default DataInput;
