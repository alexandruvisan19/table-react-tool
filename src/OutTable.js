import { useState } from "react";

const OutTable = (props) => {
	const [format, setFormat] = useState(false);

	const formatTableHandler = () => {
		setFormat(!format);
		document.querySelectorAll("tr:not(table > tbody > tr:nth-child(1))").forEach((e) => {
			console.log(e.firstChild.innerHTML === "");
			if (e.children.length > 3 && e.firstChild.innerHTML !== " ") {
				e.insertAdjacentHTML(
					"beforebegin",
					`<tr class='eventDay'><td colspan=${e.children.length - 1}>${
						e.children[0].innerHTML
					}</td><td class='arrow'></td></tr>`
				);
				e.children[0].remove();
			} else if (e.firstChild.innerHTML !== "") {
				e.children[0].remove();
			}
		});

		document.querySelector("table > tbody > tr:nth-child(1) > td:nth-child(1)").remove();

		document.querySelectorAll("tr:not(table > tbody > tr:nth-child(1))").forEach((e) => {
			if (e.children.length > 2) {
				e.style.display = "none";
			}
		});

		document.querySelector("table").setAttribute("id", "schedule-table");

		let mainTable = document.querySelector("table").outerHTML;
		let regexString = /<tr class="eventDay">/g;
		let newString = '</tbody><tbody><tr class="eventDay">';
		let content = mainTable.replace(regexString, newString);
		document.querySelector("table").outerHTML = content;

		document.querySelectorAll(".arrow").forEach((arrow) =>
			arrow.addEventListener("click", (event) => {
				event.target.classList.toggle("arrowOn");
				let elementParent = event.target.parentNode.parentNode;
				let elementChildren = elementParent.children;
				for (let elem of elementChildren) {
					if (elem.children.length > 2) {
						elem.style.display = "none";
					}
				}
				if (event.target.classList.value === "arrow arrowOn") {
					for (let elem of elementChildren) {
						elem.style.display = "table-row";
					}
				}
			})
		);
	};

	const copyTableHandler = () => {
		const copyText = document.querySelector("#schedule-table");
		navigator.clipboard.writeText(copyText.outerHTML);
		document.querySelector(".btn").innerHTML = "Copied HTML Table";
	};

	const tooptipHandler = () => {
		document.querySelector(".btn").innerHTML = "Copy Table to Clipboard";
	};

	return (
		<>
			{props.data.length > 0 && !format && (
				<div className="format-table-btn">
					<button onClick={formatTableHandler}>Format Table</button>
				</div>
			)}
			{format && (
				<div className="copy-table-btn">
					<button
						onMouseOut={tooptipHandler}
						onClick={copyTableHandler}
						className="btn"
						data-clipboard-target="#schedule-table"
					>
						Copy Table to Clipboard
					</button>
				</div>
			)}
			<div className="table-responsive">
				<table>
					<tbody>
						{props.data.map((r, i) => (
							<tr key={i}>
								{props.cols.map((c) => (
									<td className="td" key={c.key}>
										{r[c.key]}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default OutTable;
