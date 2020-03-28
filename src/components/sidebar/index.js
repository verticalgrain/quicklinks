import React, { Fragment, useContext } from 'react'
import Settings from '../settings/index'

import './styles.css'

const Sidebar = () => {

    return (
        <Fragment>
            <div className="sidebar">
                <Settings />
            </div>
        </Fragment>
    )
}

export default Sidebar;