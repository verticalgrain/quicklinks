import React, { Fragment, useContext, useState } from 'react'
import { Link, Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import CreateLinkPage from '../create-link-page/index'
import LinkPage from '../link-page/index'
import Sidebar from '../../components/sidebar/index'
import { CSSTransition } from 'react-transition-group'
import { AppContextPersisted, AppContextPersistedProvider } from '../../contextPersisted'

import '../../styles.css'

const Layout = () => {

    const [ sidebarOpen, setSidebarOpen ] = useState( false )

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const customHistory = createBrowserHistory();

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
            <Router history={customHistory}>
                <Fragment>
                    <nav className="header">
                        <Link to="/" >
                            <div className="logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.313 30.313" width="30.313pt" height="30.313pt"><defs><clipPath id="_clipPath_21kOAZvBZvzmfuPMV5YjWswrRrxACzNy"><rect x="0" y="0" width="30.313" height="30.313"/></clipPath></defs><g clipPath="url(#_clipPath_21kOAZvBZvzmfuPMV5YjWswrRrxACzNy)"><rect x="0" y="0" width="30.313" height="30.313" transform="matrix(1,0,0,1,0,0)" fill="rgba(255,255,255,0)"/><path d=" M 17.985 27.041 L 12.946 27.041 L 12.946 25.852 L 14.419 25.852 L 14.419 20.362 L 14.419 20.362 Q 13.088 21.194 11.329 21.194 L 11.329 21.194 L 11.329 21.194 Q 9.594 21.194 8.121 20.219 L 8.121 20.219 L 8.121 20.219 Q 7.289 19.672 6.778 18.496 L 6.778 18.496 L 6.778 18.496 Q 6.267 17.319 6.267 15.632 L 6.267 15.632 L 6.267 15.632 Q 6.267 12.518 7.859 10.878 L 7.859 10.878 L 7.859 10.878 Q 9.547 9.119 11.71 9.119 L 11.71 9.119 L 11.71 9.119 Q 13.041 9.119 14.419 9.808 L 14.419 9.808 L 14.419 9.333 L 15.964 9.214 L 15.964 25.852 L 17.985 25.852 L 17.985 27.041 Z  M 11.662 19.815 L 11.662 19.815 L 11.662 19.815 Q 13.088 19.815 14.419 19.173 L 14.419 19.173 L 14.419 10.83 L 14.419 10.83 Q 13.326 10.497 12.351 10.497 L 12.351 10.497 L 12.351 10.497 Q 10.307 10.497 9.059 11.84 L 9.059 11.84 L 9.059 11.84 Q 7.812 13.183 7.812 15.608 L 7.812 15.608 L 7.812 15.608 Q 7.812 16.891 8.18 17.783 L 8.18 17.783 L 8.18 17.783 Q 8.548 18.674 9.166 19.102 L 9.166 19.102 L 9.166 19.102 Q 10.236 19.815 11.662 19.815 Z  M 20.718 4.46 L 19.126 4.46 L 19.126 3.272 L 22.263 3.272 L 22.263 19.91 L 24.046 19.91 L 24.046 21.099 L 19.245 21.099 L 19.245 19.91 L 20.718 19.91 L 20.718 4.46 Z" fill="#f1f1f1"/></g></svg>
                            </div>
                        </Link>
                        <button className="button button--settings header__end" onClick={ () => setSidebarOpen( ! sidebarOpen ) }>
                            <div className="button__inner"></div>
                        </button>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={ CreateLinkPage } />
                        <Route exact path='/create' component={ CreateLinkPage } />
                        <Route path='/:groupslug' component={ LinkPage } />
                    </Switch>
                </Fragment>
            </Router>
        </div>
    )
}

export default Layout;