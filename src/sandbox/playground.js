import React from 'react';
import ReactDOM from 'react-dom';
import XLSX from 'xlsx';
import 'normalize.css/normalize.css';
import '../styles/styles.scss';

class Exporter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showFileInput: true,
			buttonText: 'Choose File',
			results: ''
		};
	}
	onChange = e => {
		let name = e.target.files[0].name.split('.')[0];
		this.setState(() => ({
			showFileInput: false,
			buttonText: `Upload: ${name}`
		}));
	};
	onSubmit = e => {
		e.preventDefault();
		let f = e.target.elements.excelToJson.files[0];
		let reader = new FileReader();
		let name = f.name;
		reader.onload = e => {
			let data = e.target.result;
			let wb = XLSX.read(data, { type: 'binary' });
			let json = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { range: 1 });
			let results = json.map(obj => {
				let { ID, ...result } = obj;
				delete result['Work Item Type'];
				delete result['State'];
				result.number = ID;
				result.showEffort = false;
				return result;
			});
			console.log(results);
		};
		reader.readAsBinaryString(f);
	};
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="upload-container">
					<button className="upload-container__btn">
						<span className="upload-container-btn--message">
							{this.state.buttonText}
						</span>
					</button>
					<input
						type="file"
						className="upload-container__input"
						hidden={!this.state.showFileInput}
						onChange={this.onChange}
					/>
				</div>
			</form>
		);
	}
}

const jsx = (
	<div>
		<div>Hello World!</div>
		<Exporter />
	</div>
);

ReactDOM.render(jsx, document.getElementById('app'));
