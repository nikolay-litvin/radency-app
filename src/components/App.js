import React, { useState, useEffect } from 'react';
import ShowTable from './ShowTable';
import Load from './Load';

const App = () => {
	const [ isLoad, setIsLoad ] = useState(false);	 
	useEffect(() => {
		setTimeout(() => {
			setIsLoad(true);
		}, 2000)
	}, []);

	return (
		<>
			{ isLoad ? <ShowTable/> : <Load /> }
			
		</>
	);
	
}

export default App;