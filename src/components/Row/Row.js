/**
 	TODO:
 	[x] implement value.trim() for trimming whitespace
 	- validate `fullName`, `phone` and `email` as is; else produce new message `CSV not valid` 
	- validate csv file and if not csv produce message is `File format is not correct` 
	 */




import React from 'react';
import s from './Row.module.css';

const Row = ({data, id, duplicate,...props}) => {
		//console.log(id, duplicate);

		const _MapAbbrFullName = {"AZ":"Arizona","AL":"Alabama","AK":"Alaska","AR":"Arkansas","CA":"California","CO":"Colorado","CT":"Connecticut","DC":"District of Columbia","DE":"Delaware","FL":"Florida","GA":"Georgia","HI":"Hawaii","ID":"Idaho","IL":"Illinois","IN":"Indiana","IA":"Iowa","KS":"Kansas","KY":"Kentucky","LA":"Louisiana","ME":"Maine","MD":"Maryland","MA":"Massachusetts","MI":"Michigan","MN":"Minnesota","MS":"Mississippi","MO":"Missouri","MT":"Montana","NE":"Nebraska","NV":"Nevada","NH":"New Hampshire","NJ":"New Jersey","NM":"New Mexico","NY":"New York","NC":"North Carolina","ND":"North Dakota","OH":"Ohio","OK":"Oklahoma","OR":"Oregon","PA":"Pennsylvania","RI":"Rhode Island","SC":"South Carolina","SD":"South Dakota","TN":"Tennessee","TX":"Texas","UT":"Utah","VT":"Vermont","VA":"Virginia","WA":"Washington","WV":"West Virginia","WI":"Wisconsin","WY":"Wyoming","AB":"Alberta","BC":"British Columbia","MB":"Manitoba","NB":"New Brunswick","NF":"Newfoundland","NT":"Northwest Territory","NS":"Nova Scotia","NU":"Nunavut","ON":"Ontario","PE":"Prince Edward Island","QC":"Quebec","SK":"Saskatchewan","YT":"Yukon"};
		const _MapFullNameAbbr = {"arizona":"AZ","alabama":"AL","alaska":"AK","arkansas":"AR","california":"CA","colorado":"CO","connecticut":"CT","districtofcolumbia":"DC","delaware":"DE","florida":"FL","georgia":"GA","hawaii":"HI","idaho":"ID","illinois":"IL","indiana":"IN","iowa":"IA","kansas":"KS","kentucky":"KY","louisiana":"LA","maine":"ME","maryland":"MD","massachusetts":"MA","michigan":"MI","minnesota":"MN","mississippi":"MS","missouri":"MO","montana":"MT","nebraska":"NE","nevada":"NV","newhampshire":"NH","newjersey":"NJ","newmexico":"NM","newyork":"NY","northcarolina":"NC","northdakota":"ND","ohio":"OH","oklahoma":"OK","oregon":"OR","pennsylvania":"PA","rhodeisland":"RI","southcarolina":"SC","southdakota":"SD","tennessee":"TN","texas":"TX","utah":"UT","vermont":"VT","virginia":"VA","washington":"WA","westvirginia":"WV","wisconsin":"WI","wyoming":"WY","alberta":"AB","britishcolumbia":"BC","manitoba":"MB","newbrunswick":"NB","newfoundland":"NF","northwestterritory":"NT","novascotia":"NS","nunavut":"NU","ontario":"ON","princeedwardisland":"PE","quebec":"QC","saskatchewan":"SK","yukon":"YT"}

		const convertStateToAbbr = (input) => {
			if(input === undefined) return input;
			var strInput = input.trim();
			if(strInput.length === 2) {
				// already abbr, check if it's valid
				var upStrInput = strInput.toUpperCase();
				return _MapAbbrFullName[upStrInput] ? upStrInput.toUpperCase() : strInput;
			}
			var strStateToFind = strInput.toLowerCase().replace(/\ /g, '');
			var foundAbbr = _MapFullNameAbbr[strStateToFind] ? _MapFullNameAbbr[strStateToFind] : strInput;
			return foundAbbr;
		}
	
	const validation = (number, _value) => {
		let value = '';
		if(_value) { 
			value = _value.trim();
		}
		
		switch(number) {
			case 0: 
				return value !== ''; // name
			
				case 1:
					return /^[+]?\d{11}$/.test(value); // phone
				
				case 2:
					return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value); // email
						
				case 3:
					return value >= 21 && Number.isInteger(Number(value)); // age

				case 4:
					return (value >= 0 && value < 21) && Number.isInteger(Number(value)); // experience

				case 5:
					return /^\d{1,7}\.\d{2}$/.test(value) && value <= 1.00e6; // yearly income

				case 6:
					return value.toUpperCase() === 'TRUE' || value.toUpperCase() === 'FALSE'; // has children

				case 7:
					return convertStateToAbbr(value) !== value; // states

				case 8:
					return /^(0?[1-9]|1[0-2])\/(0?[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(value) 
									||	/^(19|20)\d{2}\-(0?[1-9]|1[0-2])\-(0?[1-9]|1\d|2\d|3[01])$/.test(value); // expiration date
				
				case 9:
					return /^\S{6}$/.test(value); // license number
				
			default:
				return true;
		}
	}
	
	const getContentColumn = () => {
		const item = [];
		for (let i = 0; i < 12; i++) {
			if(i === 0) {
				item.push(<div className={s.itemHeader} key={i}><span>{id}</span></div>);
			} else if(i === 11) {
					let str = '';
					if(duplicate.length > 1) {
						str = duplicate[0] === id ? duplicate[1] : duplicate[0];
					}
					console.log(str);
				item.push(<div className={s.itemHeader} key={i}>
					<span>
						{str}
					</span>
				</div>);
			} else if(i === 8) {
				item.push(
					<div className={validation(i - 1, data.data[i - 1]) ? s.itemHeader : s.itemHeaderError} key={i}>
						<span>
							{ convertStateToAbbr(data.data[7]) }
						</span>
					</div>
				);
			} else {
				item.push(
					<div className={validation(i - 1, data.data[i - 1]) ? s.itemHeader : s.itemHeaderError} key={i}>
						<span className={s.cell}>
							{ data.data[i - 1] }
						</span>
					</div>
				);
			}
			
		}		
		
		return item; 
	}
	
	return(
		<div className={s.wrapper} {...props}>{getContentColumn()}</div>
	);
}

export default Row;