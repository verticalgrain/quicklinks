import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Layout from './containers/layout/index'
import { AppContextPersisted, AppContextPersistedProvider } from './contextPersisted'
import { AppContextNonPersisted, AppContextNonPersistedProvider } from './contextNonPersisted'

import './styles.css'

if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.register( './service-worker.js' );
}
// Check that service workers are supported
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('./service-worker.js');
//     });
// }

const App = () => {

    return (
        <AppContextNonPersistedProvider>
            <AppContextPersistedProvider>
                <Layout />
            </AppContextPersistedProvider>
        </AppContextNonPersistedProvider>
    )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);