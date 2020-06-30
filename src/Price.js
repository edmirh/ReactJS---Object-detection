import React from 'react';
import AppDetails from './appDetails';
import DetectClass from './detect';
import Results from './results';
import { BrowserView, MobileView, isMobile, osName, browserVersion, mobileVendor, mobileModel, browserName, osVersion } from 'react-device-detect';

export class Price extends React.Component {
	state = {
		step: 1,
		detected:[],
		mobileM: mobileModel,
		mobileOS: osVersion,
		browserN: browserName,
		manufacture: mobileVendor,
		nameOS: osName,
		versionBrowser: browserVersion
	};
	
	//Next step
	nextStep = () => {
		const {step} = this.state;
		this.setState({
			step: step + 1
		});
	}
	
	//Previous step
	prevStep = () => {
		const {step} = this.state;
		this.setState({
			step: step - 1
		});
	}
	
	//Handle all changes
	handleChange = input => e => {
		console.log('Handle change: ', e.target.value)
		this.setState({
			[input]: e.target.value
		});
	}
	
	
	handlePrice = input => e => {
		const data = this.state.price
		const pack = this.state.pack
		const detec = this.state.detected
		console.log("Price:", data)
		console.log("Package:", pack)
		console.log("Detected:", detec)
	}
	
	handleInputPrice = input => e => {
		console.log(e)
		console.log(e.target.name)
		console.log(e.target.value)
		this.setState({
			[input]: e.target.value
		})
	}
	
	render() {
		//if(isMobile) {
			const { step } = this.state;
			const { imei, price, pack, detected, mobileM, mobileOS, browserN, manufacture, nameOS, versionBrowser } = this.state;
			const values = { imei, price, pack, detected, mobileM, mobileOS, browserN, manufacture, nameOS, versionBrowser }
			
			switch(step) {
				case 1:
					return (
						<AppDetails
							nextStep={this.nextStep}
							handleChange={this.handleChange}
							values={values}
						/>
					)
				case 2:
					return (
						<DetectClass
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					)
				case 3:
					return (
						<Results
							nextStep={this.nextStep}
							prevStep={this.prevStep}
							handleChange={this.handleChange}
							values={values}
						/>
					)
			}
		//}
		//return <h1>This application is only available on mobile devices!</h1>
	}
}

export default Price
