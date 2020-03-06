import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateLinkGroup from './containers/create-link-group/index'
import LinkGroup from './containers/link-group/index'

import './styles.css'

const App = () => {
    return (
        <div className='app'>
            <header></header>
            <main>
                <Router>
                    <Switch>
                        <Route path='/' exact component={ CreateLinkGroup } />
                        <Route path='/create' exact component={ CreateLinkGroup } />
                        <Route path='/:groupslug' component={ LinkGroup } />
                    </Switch>
                </Router>
            </main>
            <footer></footer>
        </div>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);