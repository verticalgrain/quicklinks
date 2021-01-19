import React, { Fragment, useContext } from 'react'

import firebase from 'firebase';

import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import AuthLink from '../auth-link/index'

const Settings = () => {

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const { theme, linkTargetBlank, linkCardSize } = appStatePersisted;

    const themeState = () => {

        const themeNew = theme === 'dark' ? 'light' : 'dark';

        return {
            theme: themeNew,
            linkTargetBlank: linkTargetBlank,
            linkCardSize: linkCardSize,
        }

    }

    const linkCardState = ( linkCardSizeTemp ) => {
        return {
            theme: theme,
            linkTargetBlank: linkTargetBlank,
            linkCardSize: linkCardSizeTemp,
        }
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
                <span>Link size</span><br/>
                <div className="l-flex l-flex--col l-flex--space-between u-m-top-10">
                    <div className="radio radio--link-size">
                        <input className="radio__input" type="radio" name="radio--link-size" id="radio--link-size-small" defaultChecked={ linkCardSize === 'small' ? true : false } onClick={ () => setAppStatePersisted( linkCardState( 'small' ) ) } />
                        <label className="radio__label" htmlFor="radio--link-size-small">Small</label>
                    </div>
                    <div className="radio radio--link-size radio--link-size-medium">
                        <input className="radio__input" type="radio" name="radio--link-size" id="radio--link-size-medium" defaultChecked={ linkCardSize === 'medium' ? true : false } onClick={ () => setAppStatePersisted( linkCardState( 'medium' ) ) } />
                        <label className="radio__label" htmlFor="radio--link-size-medium">Medium</label>
                    </div>
                    <div className="radio radio--link-size radio--link-size-large">
                        <input className="radio__input" type="radio" name="radio--link-size" id="radio--link-size-large" defaultChecked={ linkCardSize === 'large' ? true : false } onClick={ () => setAppStatePersisted( linkCardState( 'large' ) ) } />
                        <label className="radio__label" htmlFor="radio--link-size-large">Large</label>
                    </div>
                </div>
                <hr />
                <a href="/">Create new quicklinks page</a>
            </div>
        </Fragment>
    )

}

export default Settings;