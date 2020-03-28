import React, { Fragment, useContext } from 'react'

import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import firebase from 'firebase';

const Settings = () => {

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    console.log( appStateNonPersisted );
    
    const themeState = () => {

        const themeNew = appStatePersisted.theme === 'dark' ? 'light' : 'dark';

        const appStateVar = {
            theme: themeNew,
            setAppStatePersisted: setAppStatePersisted,
        }

        return appStateVar;
    }

    return (
        <Fragment>
            <div className="settings">
                { appStateNonPersisted && appStateNonPersisted.authenticated && <div onClick={ () => firebase.auth().signOut() }>Sign-out</div> }
                { appStateNonPersisted && ! appStateNonPersisted.authenticated && <div onClick={ () => firebase.auth().signIn() }>Sign-in</div> }
                <div className="toggle">
                    <span>Light Theme</span>
                    <input className="toggle__checkbox" type="checkbox" id="toggle--theme" name="toggle--theme" onClick={ () => setAppStatePersisted( themeState() ) } />
                    <label className="toggle__label" htmlFor="toggle--theme"></label>
                    <span>Dark Theme</span>
                </div>
            </div>
        </Fragment>
    )

}

export default Settings;