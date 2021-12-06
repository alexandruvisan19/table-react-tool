import React, { useState } from "react";
import DragDropFile from "./DragDropFile";
import DataInput from "./DataInput";
import OutTable from "./OutTable";
import XLSX from "xlsx";

const SheetJSApp = () => {
	const [state, setState] = useState({ data: [], cols: [] });

	console.log(state);

	/* generate an array of column objects */
	const make_cols = (refstr) => {
		let o = [],
			C = XLSX.utils.decode_range(refstr).e.c + 1;
		for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i };
		return o;
	};

	const handleFile = (file /*:File*/) => {
		/* Boilerplate to set up FileReader */
		const reader = new FileReader();
		const rABS = !!reader.readAsBinaryString;
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {
				type: rABS ? "binary" : "array",
				// cellDates: true,
			});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			const data = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });
			console.log(wb);
			/* Update state */
			setState({ data: data, cols: make_cols(ws["!ref"]) });
		};
		if (rABS) reader.readAsBinaryString(file);
		else reader.readAsArrayBuffer(file);
	};

	return (
		<DragDropFile handleFile={handleFile}>
      {state.data <= 0 ? <div className="row1">
				<div className="col-xs-12">
					<DataInput handleFile={handleFile} />
				</div>
			</div> : ""}
			<div className="row2">
				<div className="col-xs-12">
					<OutTable data={state.data} cols={state.cols} />
				</div>
			</div>
		</DragDropFile>
	);
};

export default SheetJSApp;
