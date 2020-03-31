import React, { useContext, useState } from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CreateLinkGroup from '../create-link-group/index'
import firebase from 'firebase';
import LinkGroup from '../link-group/index'
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
            <button className="button button--settings" onClick={ () => setSidebarOpen( ! sidebarOpen ) }>
                <div className="button__inner"></div>
            </button>
            <Router>
                <Switch>
                    <Route path='/' exact component={ CreateLinkGroup } />
                    <Route path='/create' exact component={ CreateLinkGroup } />
                    <Route path='/:groupslug' component={ LinkGroup } />
                </Switch>
            </Router>
        </div>
    )
}

export default Layout;