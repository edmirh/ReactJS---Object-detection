import React, { Component } from 'react';
import styles from './styles.module.css'

export class AppDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}
	
	render() {
		const { values, handleChange } = this.props;
		for(let i of values.detected.entries()) {		
			console.log("Detected: ", values.detected[i]);
		}
		return (
			<div>
				<li>Teststst</li>
			</div>
		);
	}
}


export default AppDetails

