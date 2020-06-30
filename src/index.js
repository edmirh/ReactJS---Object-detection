import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Switch, Route } from "react-router-dom"


import Price from './Price'
import {Home}  from './Home'
import Results from './results'
const App = () => {
  return (	
	<>
		<Router>
				<Route exact path={"/"} component={Price} />
				<Route path={"/results"} component={Results} />
		</Router>
    </>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
