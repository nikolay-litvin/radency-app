import React, { useState } from 'react';
import s from './ShowTable.module.css';

import Header from '../Header';
import Row from '../Row';
import CSVReader  from '../CSVReader';
import ErrorCSV from '../ErrorCSV';

const ShowTable = () => {
	const [data, setData] = useState([]); 
	const [isError, setIsError] = useState(false);
		
	const getData = (_data) => {
		console.log(_data);
		let check = true;
		for(let i = 0; i < _data.length; i++) {
			for(let j = 0; j < 3; j++) {
				if(!_data[i].data[j]) {
					check = false;
					break;
				}
			}
		}

		if(check) {
			setData(_data);
			setIsError(false);
		} else {
			setIsError(true);
		}
		
		
	
	}

	const addRow = () => {
		
		return data.map((item, index) => {
			const indexArr = [];
			const arr = data.filter((obj, index1) => {
				if(obj.data[2] === item.data[2]) {
					obj.index = index1;
					return obj;
				}
				
			});
			//console.log(arr);
			if(arr.length > 1) {
				indexArr.push(arr[0].index, arr[1].index);
			}
			
			return <Row key={index} data={item} id={index} duplicate={indexArr} />
	
		});
	}
	
	return (
		<div className={s.wrapper}>
			
				<Header />
				{!isError && addRow()} 
				{isError && <ErrorCSV />}
				<span>
					<CSVReader getData={getData} />
				</span>

		</div>
	);

}

export default ShowTable;