import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import Layout from './containers/layout/index'
import { AppContextPersisted, AppContextPersistedProvider } from './contextPersisted'
import { AppContextNonPersisted, AppContextNonPersistedProvider } from './contextNonPersisted'

import './styles.css'

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