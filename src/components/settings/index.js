import React, { Fragment, useContext } from 'react'

import firebase from 'firebase';

import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import AuthLink from '../auth-link/index'

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
                <AuthLink />
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