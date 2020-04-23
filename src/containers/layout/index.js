import React, { useContext, useState } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateLinkGroup from '../create-link-group/index'
import firebase from 'firebase';
import LinkPage from '../link-page/index'
import Sidebar from '../../components/sidebar/index'
import { CSSTransition } from 'react-transition-group'
import { AppContextPersisted, AppContextPersistedProvider } from '../../contextPersisted'

import '../../styles.css'

const Layout = () => {

    const [ sidebarOpen, setSidebarOpen ] = useState( false )

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    return (
        <div className={ 'app theme theme--' + appStatePersisted.theme }>
            <CSSTransition
            in={ sidebarOpen }
            timeout={ 300 }
            classNames="sidebar"
            unmountOnExit
            onExited={ () => setSidebarOpen( false ) }
            >
                <Sidebar sidebarOpen={ sidebarOpen } setSidebarOpen={ setSidebarOpen } />
            </CSSTransition>
            <nav className="header">
                <div className="logo">
                    <img src="assets/logo2.svg" />
                </div>
                <button className="button button--settings header__end" onClick={ () => setSidebarOpen( ! sidebarOpen ) }>
                    <div className="button__inner"></div>
                </button>
            </nav>

            <Router>
                <Switch>
                    <Route path='/' exact component={ CreateLinkGroup } />
                    <Route path='/create' exact component={ CreateLinkGroup } />
                    <Route path='/:groupslug' component={ LinkPage } />
                </Switch>
            </Router>
        </div>
    )
}

export default Layout;