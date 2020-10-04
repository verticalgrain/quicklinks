import React, { useContext, useEffect } from 'react';

import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { AppContextNonPersisted } from '../../contextNonPersisted';

const AuthLink = () => {

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    // Configure FirebaseUI.
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // signInSuccessUrl: '/create',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            },
        ]
    };

    useEffect( () => {
        const unsub = firebase.auth().onAuthStateChanged( function( user ) {
            if ( user ) {
                console.log( 'authenticated' )
            } else if ( !user ) {
                console.log( 'not authenticated' )
            }
        } );
        return () => {
            unsub();
        }
    }, [] )

    return (
        <div className="auth-link">
            { appStateNonPersisted && appStateNonPersisted.authenticated &&
                <div className="auth-link__link" onClick={ () => firebase.auth().signOut() }>Sign-out</div>
            }
            { appStateNonPersisted && ! appStateNonPersisted.authenticated &&
                <StyledFirebaseAuth uiConfig={ uiConfig } firebaseAuth={ firebase.auth() } />
            }
        </div>
    )
}

export default AuthLink;