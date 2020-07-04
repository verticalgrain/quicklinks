import React, { Fragment, useContext } from 'react'

import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import firebase from 'firebase';

const Settings = () => {

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const { theme, linkTargetBlank } = appStatePersisted;

    const themeState = () => {

        const themeNew = theme === 'dark' ? 'light' : 'dark';

        const appStateVar = {
            theme: themeNew,
            linkTargetBlank: true,
        }

        return appStateVar;
    }

    return (
        <Fragment>
            <div className="settings">
                { appStateNonPersisted && appStateNonPersisted.authenticated && <div onClick={ () => firebase.auth().signOut() }>Sign-out</div> }
                { appStateNonPersisted && ! appStateNonPersisted.authenticated && <div onClick={ () => firebase.auth().signIn() }>Sign-in</div> }
                <hr />
                <div className="toggle">
                    <span>Light Theme</span>
                    <input className="toggle__checkbox" type="checkbox" id="toggle--theme" name="toggle--theme" defaultChecked={ theme === 'dark' ? true : false } onClick={ () => setAppStatePersisted( themeState() ) } />
                    <label className="toggle__label" htmlFor="toggle--theme"></label>
                    <span>Dark Theme</span>
                </div>
                <hr />
                <div className="toggle">
                    <span>Open links in new tabs</span>
                    <input className="toggle__checkbox" type="checkbox" id="toggle--target" name="toggle--target" defaultChecked={ linkTargetBlank } onClick={ () => setAppStatePersisted( { theme: theme, linkTargetBlank: ! linkTargetBlank, } ) } />
                    <label className="toggle__label" htmlFor="toggle--target"></label>
                </div>
                <hr />
                <a href="/">Create new quicklinks page</a>
            </div>
        </Fragment>
    )

}

export default Settings;