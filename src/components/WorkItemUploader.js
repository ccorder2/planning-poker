import React from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';
import { startUploadWorkItems } from '../actions/work-items';

export class WorkItemUploader extends React.Component {
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
				let { ID, Title } = obj;
				let result = { number: ID, title: Title, showEffort: false };
				return result;
			});
			this.props.startUploadWorkItems(results);
		};
		reader.readAsBinaryString(f);
	};
	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="upload-container">
					<button className="upload-container__btn">
						<span className="upload-container-btn--message">{this.state.buttonText}</span>
					</button>
					<input
						type="file"
						className="upload-container__input"
						name="excelToJson"
						hidden={!this.state.showFileInput}
						onChange={this.onChange}
					/>
				</div>
				<div className="upload-message">
					The format of the excel file has to have two columns: ID, Title. The header row needs to
					be on the second row, not the first, and all data to be imported should be below it. The
					sheet name has to also be Sheet1. (
					<a className="link" href="/content/WorkItemsTemplate.xlsx" target="_blank">
						download template
					</a>)
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = (dispatch, props) => ({
	startUploadWorkItems: workItems => dispatch(startUploadWorkItems(props.gameId, workItems))
});

export default connect(undefined, mapDispatchToProps)(WorkItemUploader);
