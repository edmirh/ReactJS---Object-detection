import React from 'react'
import {Link, Switch, Route, Router} from "react-router-dom"
import Results from './results'
import styles from './styles.module.css'

export class Home extends React.Component {
  
  
  render() {
	  return (
		<Router>
		  <div className={styles.homePage}>
			<h2>Home page</h2>
			<Link to="/" className={styles.LinkToBtn}>Start detection</Link>
			<Link to="/results">Results</Link>
		  	<Switch>	
			  <Route path="/results" component={Results} />
			</Switch>
		  </div>
		</Router>
	  );
	}
}
