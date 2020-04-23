import React, { useEffect, useState } from 'react'

export const AppContextPersisted = React.createContext( {
    theme: 'dark',
    linkTargetBlank: true,
} );

export const AppContextPersistedProvider = ( { children } ) => {

    const [ appStatePersisted, setAppStatePersisted ] = useState(
        JSON.parse( localStorage.getItem( 'appLocalstoragePersisted' ) ) || {
            theme: 'dark',
            linkTargetBlank: true,
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