import React, { useState } from 'react'

export const AppContextPersisted = React.createContext( {
    theme: 'dark',
    setAppStatePersisted: () => {},
} );

export const AppContextPersistedProvider = ( { children } ) => {
    
    const [ appStatePersisted, setAppStatePersisted ] = useState( {
        theme: 'dark',
        setAppStatePersisted: setAppStatePersisted,
    } );

    const appStateContext = { appStatePersisted, setAppStatePersisted };

    return (
        <AppContextPersisted.Provider value={ appStateContext }>
            { children }
        </AppContextPersisted.Provider>
    )
}