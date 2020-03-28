import React, { useEffect, useState } from 'react'

export const AppContextPersisted = React.createContext( {
    theme: 'dark',
    setAppStatePersisted: () => {},
} );

export const AppContextPersistedProvider = ( { children } ) => {
    
    const [ appStatePersisted, setAppStatePersisted ] = useState( 
        JSON.parse( localStorage.getItem( 'appLocalstoragePersisted' ) ) || {
            theme: 'dark',
            setAppStatePersisted: setAppStatePersisted,
        } 
    );

    useEffect( () => {
        localStorage.setItem( 'appLocalstoragePersisted', JSON.stringify( appStatePersisted ) );
    }, [ appStatePersisted ] )

    const appStateContext = { appStatePersisted, setAppStatePersisted };

    return (
        <AppContextPersisted.Provider value={ appStateContext }>
            { children }
        </AppContextPersisted.Provider>
    )
}