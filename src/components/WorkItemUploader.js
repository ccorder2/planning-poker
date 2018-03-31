import React from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';
import _ from 'lodash';
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
		let ext = e.target.files[0].name.split('.').pop();
		if (ext !== 'xlsx') {
			document.getElementById('formUpload').reset();
			this.setState(() => ({
				showFileInput: true,
				buttonText: 'Choose File'
			}));
			alert('The only acceptable file extension is XLSX. Please select a new file and try again');
		} else {
			this.setState(() => ({
				showFileInput: false,
				buttonText: `Upload: ${name}`
			}));
		}
	};
	onSubmit = e => {
		e.preventDefault();
		let msg = '';
		let f = e.target.elements.excelToJson.files[0];
		let name = f.name;

		let reader = new FileReader();
		reader.onload = e => {
			let data = e.target.result;
			let wb = XLSX.read(data, { type: 'binary' });
			if (!wb.SheetNames.includes('Sheet1')) {
				document.getElementById('formUpload').reset();
				this.setState(() => ({
					showFileInput: true,
					buttonText: 'Choose File'
				}));
				alert("Please name the sheet you wish to use to upload work items 'Sheet1'");
			} else {
				let json = XLSX.utils.sheet_to_json(wb.Sheets['Sheet1'], { range: 1 });
				let results = json.map(obj => {
					obj = _.mapKeys(obj, (v, k) => k.toLowerCase());
					let { id, title } = obj;
					let result = { number: id || 0, title: title || 'none', showEffort: false };
					return result;
				});
				if (json.length === 0 || results.length === 0) {
					document.getElementById('formUpload').reset();
					this.setState(() => ({
						showFileInput: true,
						buttonText: 'Choose File'
					}));
					alert('Could not find any data in the selected file');
				} else {
					this.props.startUploadWorkItems(results);
				}
			}
		};
		reader.readAsBinaryString(f);
	};
	render() {
		return (
			<form id="formUpload" onSubmit={this.onSubmit}>
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
