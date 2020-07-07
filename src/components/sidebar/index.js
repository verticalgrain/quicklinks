import React, { Fragment, useEffect, useState, useRef } from 'react'
import Settings from '../settings/index'

import './styles.css'

const Sidebar = ( { sidebarOpen, setSidebarOpen } ) => {

    const node = useRef();

    const handleClick = e => {
		if ( node.current.contains( e.target ) ) {
			// inside click
			return;
		}
		// outside click
		setSidebarOpen( false );
	};

	useEffect( () => {
		// add when mounted
		document.addEventListener( 'mousedown', handleClick );
		// return function to be called when unmounted
		return () => {
			document.removeEventListener( 'mousedown', handleClick );
		};
    }, [] );

    return (
        <Fragment>
            <div className="sidebar" ref={ node }>
                <div className="sidebar__overlay" onClick={ () => setSidebarOpen( ! sidebarOpen ) }></div>
                <Settings />
            </div>
        </Fragment>
    )
}

export default Sidebar;