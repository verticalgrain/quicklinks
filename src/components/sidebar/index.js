import React, { Fragment, useContext } from 'react'
import Settings from '../settings/index'

import './styles.css'

const Sidebar = ( { sidebarOpen, setSidebarOpen } ) => {
    return (
        <Fragment>
            <div className="sidebar">
                <div className="sidebar__overlay" onClick={ () => setSidebarOpen( ! sidebarOpen ) }></div>
                <Settings />
            </div>
        </Fragment>
    )
}

export default Sidebar;