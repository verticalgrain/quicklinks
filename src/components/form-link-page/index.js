import React, { Fragment, useEffect, useState } from 'react'

import { withRouter } from 'react-router-dom'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import { db } from '../../firebase'
import firebase from 'firebase';
import { convertSpinalCase, createSubCollection } from '../../shared/utilities'

const FormLinkPage = withRouter( ( { history, ...props } ) => {
    const [ linkgroup, setLinkgroup ] = useState( {
        name: '',
        slug: '',
        uid: '',
        linkGroupIds: [],
    } )

    const [ linkgroupCreationStatus, setLinkgroupCreationStatus ] = useState( {
        success: false,
        statusMessage: '',
        errorMessage: '',
    } )

    const [ isSignedIn, setIsSignedIn ] = useState( false )// TODO: replace this with nonPersisted context

    const [ authFormInitiated, setAuthFormInitiated ] = useState( false )

    // Query firebase to check if the slug already exists
    // If it does, tell the user to pick a new slug
    // If it doesn't, create the new collection
    const createLinkgroupCollection = ( linkPageCandidate ) => {
        db.collection( 'linkpages' ).where( 'slug', '==', linkPageCandidate.slug )
        .get()
        .then( function( querySnapshot ) {

            if ( querySnapshot.docs.length === 0 ) {
                db.collection( 'linkpages' ).add( linkPageCandidate )
                .then( function( response ) {
                    // Add the linkPageId to the linkPageCandidate object
                    linkPageCandidate.id = response.id
                    // Create the first subCollection for the new linkPage
                    createSubCollection( linkPageCandidate )
                } )
                .then( function( response ) {
                    setLinkgroupCreationStatus( {
                        success: true,
                        statusMessage: 'Success! Redirecting...',
                    } )

                    setTimeout( function() {
                        // Redirect user to the new linkGroup page
                        history.push( '/' + linkPageCandidate.slug );
                    }, 1000 )

                } )
                .catch( function( error ) {
                    console.error( 'Error writing document: ', error );
                } )
            } else {
                setLinkgroupCreationStatus( {
                    errorMessage: 'Sorry, that name is already taken',
                } )
            }
        } )
        .catch(function(err) {
            console.log( err );
        })
    }

    // When the component mounts, check if the user is authenticated, and if so, update the linkgroup uid and isSignedIn state.
    // This also runs when the user authenticates with firebase authentication
    // TODO: handle cases where user has authenticated with the login button but name and slug are empty
    // TODO: make the login button non clickable until the form validation has been met
    // TODO: handle anonymous user login
    // TODO: add other login services aside from Google
    // TODO: add "you are signed in as" messaging for authenticated users
    // TODO: add authentication failure state
    useEffect( () => {
        const unsub = firebase.auth().onAuthStateChanged( function( user ) {
            if ( user && !authFormInitiated ) {
                // User is authenticated on initial component mount
                setLinkgroup( {
                    name: '',
                    slug: '',
                    uid: user.uid,
                    linkGroupIds: [],
                } )
                setIsSignedIn( true )
            } else if ( user && authFormInitiated ) {
                // User is authenticated because of clicking login button
                setLinkgroup( {
                    name: linkgroup.name,
                    slug: linkgroup.slug,
                    uid: user.uid,
                    linkGroupIds: [],
                } )
                setIsSignedIn( true )
                createLinkgroupCollection( {
                    name: linkgroup.name,
                    slug: linkgroup.slug,
                    uid: user.uid,
                    linkGroupIds: [],
                } )
            } else if ( !user && authFormInitiated ) {
                // User is not authenticated yet but login button has been clicked
                setLinkgroup( {
                    name: linkgroup.name,
                    slug: linkgroup.slug,
                    uid: linkgroup.uid,
                    linkGroupIds: [],
                } )
                setIsSignedIn( false );
            } else {
                // User is not authenticated
                setLinkgroup( {
                    name: '',
                    slug: '',
                    uid: '',
                    linkGroupIds: [],
                } )
                setIsSignedIn( false );
            }
        } );
        return () => {
            unsub();
        }
    }, [ authFormInitiated ] )

    const firebaseAuthButtonListener = ( e ) => {
        if ( e.target.closest( 'button.firebaseui-idp-button' ) != null ) {
            setAuthFormInitiated( true );
        }
    }

    // When the user clicks the login button, set a state flag
    useEffect( () => {
        document.addEventListener( 'mouseup', firebaseAuthButtonListener );
        return () => {
            document.removeEventListener( 'mouseup', firebaseAuthButtonListener );
        }
    }, [] )

    // Configure FirebaseUI.
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: () => false
        },
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/create',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            },
        ]
    };

    const handleSubmit = e => {
        e.preventDefault();

        createLinkgroupCollection( linkgroup );
    }

    const handleChange = e => {
        if ( linkgroupCreationStatus.errorMessage !== '' ) {
            setLinkgroupCreationStatus( {
                errorMessage: '',
            } )
        }
        setLinkgroup( {
            name: e.target.value,
            slug: convertSpinalCase( e.target.value ),
            uid: linkgroup.uid,
            linkGroupIds: [],
        } )
    }

    return (
        <Fragment>
            <form className="form form--link-group" onSubmit={ handleSubmit } onChange={ handleChange }>
                <div className='input-field'>
                    <label htmlFor='name'>
                        Name for your quicklinks:
                    </label>
                    <input
                        type='text'
                        id='quicklinksname'
                        name='name'
                        value={ linkgroup.name }
                        onChange={ handleChange }
                        placeholder='My Linky Links'
                        className='validate'
                        required
                        pattern='[a-zA-Z][a-zA-Z0-9-_ .]{3,40}'// TODO: add tooltip with requirements
                    />
                </div>
                { linkgroupCreationStatus.errorMessage && <div>{ linkgroupCreationStatus.errorMessage }</div> }
                Quicklinks page slug: { linkgroup.slug }
                <br />
                <br />
                { isSignedIn && <div>
                        <button type='submit'>
                            Create new quicklinks
                        </button>
                    </div>
                }

                { ! isSignedIn && <StyledFirebaseAuth uiConfig={ uiConfig } firebaseAuth={ firebase.auth() } /> }

                <div>{ linkgroupCreationStatus.statusMessage }</div>
            </form>
        </Fragment>
    );

} )

export default FormLinkPage;