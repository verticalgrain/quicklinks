import React, { useEffect, useState } from 'react'
import firebase from 'firebase';

export const AppContextNonPersisted = React.createContext( {
    authenticated: false,
    uid: null,
} );

export const AppContextNonPersistedProvider = ( { children } ) => {
    
    const [ appStateNonPersisted, setAppStateNonPersisted ] = useState( {
        authenticated: false,
        uid: null,
    } );

    // Update appState context with Auth data
    useEffect( () => {
        const unsub = firebase.auth().onAuthStateChanged( function( user ) {
            if ( user ) {
                // User is authenticated on initial component mount
                setAppStateNonPersisted( {
                    authenticated: true,
                    uid: user.uid,
                } )
            } else {
                setAppStateNonPersisted( {
                    authenticated: false,
                    uid: null,
                } )
            }
        } );
        return () => {
            unsub();
        }
    }, [] )

    const appStateNonPersistedContext = { appStateNonPersisted, setAppStateNonPersisted };

    return (
        <AppContextNonPersisted.Provider value={ appStateNonPersistedContext }>
            { children }
        </AppContextNonPersisted.Provider>
    )
}