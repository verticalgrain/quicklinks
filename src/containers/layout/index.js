import React, { Fragment, useContext, useState } from 'react'
import { Link, BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateLinkPage from '../create-link-page/index'
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
            <BrowserRouter>
                <Fragment>
                    <nav className="header">
                        <Link to="/" >
                            <div className="logo">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 59 68" width="59" height="68">
                                    <g id="logo-black">
                                        {/* <path id="eyelid-top" className="shp0" d="M55 34L13 34C13 34 12.43 12.96 34 13C55.57 13.04 55 34 55 34Z" />
                                        <path id="eyelid-bottom" className="shp0" d="M13 34L55 34C55 34 55.57 55.04 34 55C12.43 54.96 13 34 13 34Z" /> */}
                                        <path id="o " fillRule="evenodd" className="shp1" fill="#000000" d="M10.35 34.28C10.35 31.06 10.96 27.99 12.16 25.09C13.45 22.19 15.14 19.7 17.24 17.6C19.41 15.43 21.91 13.73 24.73 12.53C27.63 11.24 30.73 10.59 34.04 10.59C37.34 10.59 40.44 11.24 43.34 12.53C46.24 13.73 48.78 15.43 50.96 17.6C53.13 19.7 54.83 22.19 56.03 25.09C57.32 27.99 57.97 31.06 57.97 34.28C57.97 37.58 57.32 40.68 56.03 43.59C54.83 46.41 53.13 48.86 50.96 50.96C48.78 53.05 46.24 54.74 43.34 56.03C40.44 57.24 37.34 57.85 34.04 57.85C30.73 57.85 27.63 57.24 24.73 56.03C21.91 54.74 19.41 53.05 17.24 50.96C15.14 48.86 13.45 46.41 12.16 43.59C10.96 40.68 10.35 37.58 10.35 34.28ZM15.31 34.28C15.31 36.86 15.79 39.27 16.76 41.53C17.72 43.79 19.05 45.76 20.74 47.45C22.44 49.14 24.41 50.47 26.67 51.44C28.92 52.41 31.34 52.89 33.92 52.89C36.5 52.89 38.91 52.41 41.17 51.44C43.51 50.47 45.52 49.14 47.21 47.45C48.9 45.76 50.23 43.79 51.2 41.53C52.17 39.27 52.65 36.86 52.65 34.28C52.65 31.7 52.17 29.28 51.2 27.03C50.23 24.77 48.9 22.8 47.21 21.11C45.52 19.41 43.51 18.08 41.17 17.12C38.91 16.07 36.5 15.55 33.92 15.55C31.34 15.55 28.92 16.07 26.67 17.12C24.41 18.08 22.44 19.41 20.74 21.11C19.05 22.8 17.72 24.77 16.76 27.03C15.79 29.28 15.31 31.7 15.31 34.28Z" />
                                        <path id="c " className="shp1" fill="#000000" d="M6.5 34.34C6.5 17.78 19.55 6.66 33.69 6.66C42.03 6.66 49.04 10.04 53.88 15.24L58.23 10.89C52.31 4.73 43.85 0.62 33.57 0.62C16.41 0.62 0.46 14.15 0.46 34.46C0.46 51.62 14 67.57 34.3 67.57C43.24 67.57 52.06 63.82 58.23 57.3L53.88 53.07C48.8 58.39 41.67 61.53 34.18 61.53C17.62 61.53 6.5 48.48 6.5 34.34Z" />
                                    </g>
                                </svg>
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
            </BrowserRouter>
        </div>
    )
}

export default Layout;