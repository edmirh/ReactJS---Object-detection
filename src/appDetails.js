import React, { Component } from 'react';

import styles from './styles.module.css'

export class AppDetails extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}
	
	render() {
		const { values, handleChange } = this.props;
		return (
			<div>
				<div className={styles.mobileInfo}>
					<p>Your mobile informations:</p>
					<table id={styles.info}>
					<tbody>
						<tr key={values.manufacture}>
							<th key={values.manufacture}>Mobile device</th>
							<th>Mobile OS</th>
							<th>Browser</th>
						</tr>
						<tr key={values.manufacture}>
						       <td>{values.manufacture} {values.mobileM}</td>
						       <td>{values.nameOS} {values.mobileOS}</td>
						       <td>{values.browserN} {values.versionBrowser}</td>
						</tr>
					</tbody>
					</table>
				</div>
				<div className={styles.intro}>
					<img className={styles.gif} src="video.gif" alt="Example" />
					<h3 className={styles.h3} style={{textAlign: 'center', fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>Instructions:</h3>
					<ul>
						<li style={{fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>After click "Start detection" wait one or two minute depending of your internet connection, for model downloading about 21MB.</li>
						<li style={{fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>Hold your mobile phone or web camera above the board, detection will start when you see stroke or 'frame' around board.</li>
					</ul>
					<button className={styles.LinkToBtn} onClick={this.continue} style={{textAlign: 'center', fontFamily: "'Trebuchet MS',Arial,Helvetica,sans-serif"}}>Start detection</button>			
				</div>			
			</div>
		);
	}
}


export default AppDetails

