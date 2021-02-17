import React from 'react';
import { Fields } from '../../utils/constants';
import s from './Header.module.css'

const Header = () => {
	const getContentHeader = () => {
		return (
			Fields.map((item, index) => (
				<div className={s.itemHeader} key={index}><span className={s.cell}>{item}</span></div>
			))
		);
	}
	
	return(
		<div className={s.wrapper}>
				{getContentHeader()}
		</div>
	);
}

export default Header;