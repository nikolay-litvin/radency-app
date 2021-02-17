import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

export default class CSVReader4 extends Component {
  constructor(props) {
		super(props);

		console.log(props);
	}
	
	handleOnDrop = (data) => {
    this.props.getData(data);
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = (data) => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  render() {
    return (
      <>
        <p />
        <CSVReader
          onDrop={this.handleOnDrop}
          onError={this.handleOnError}
          noDrag
          addRemoveButton
          onRemoveFile={this.handleOnRemoveFile}
        >
          <span>Click (No Drag) to upload CSV</span>
        </CSVReader>
      </>
    );
  }
}