import React, { Component } from 'react';
import DetectClass from './detect'

import styles from './styles.module.css'

export class Detection extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}
	
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	}
	
	render() {
		const { values, handleChange } = this.props;
		return (
			<>
				<DetectClass />
			</>	
		);
	}
}


export default Detection

