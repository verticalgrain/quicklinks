import React, { Fragment, useState } from 'react'

import { withRouter } from 'react-router-dom'

import { db } from '../../firebase'
import { convertSpinalCase, fireBaseQuery, generateNewUserId } from '../../shared/utilities'

const FormLink = withRouter( ( { history, ...props } ) => {
    const [ linkgroup, setLinkgroup ] = useState( {
        name: '',
        slug: '',
        user: '',/* TODO: Check if user is signed in and use their actual user id */
    } )

    const [ linkgroupCreationStatus, setLinkgroupCreationStatus ] = useState( {
        success: false,
        statusMessage: '',
        errorMessage: '',
    } )

    const newUserId = generateNewUserId();

    const handleSubmit = e => {
        e.preventDefault();
        // Query firebase to check if the slug already exists
        // If it does, tell the user
        // If it doesn't, create the new collection

        db.collection( 'linkgroups' ).where( 'slug', '==', linkgroup.slug )
        .get()
        .then( function( querySnapshot ) {

            if ( querySnapshot.docs.length === 0 ) {

                db.collection( 'linkgroups' ).add( linkgroup )
                .then( function( response ) {

                    setLinkgroupCreationStatus( {
                        success: true,
                        statusMessage: 'Success! Redirecting...',
                    } )

                    setTimeout( function() {
                        // Redirect user to the new linkGroup page
                        history.push( '/' + linkgroup.slug );
                    }, 1000 )

                } )
                .catch( function( error ) {
                    console.error( 'Error writing document: ', error );
                } )
            } else {
                console.log( 'slug already exists' );
                setLinkgroupCreationStatus( {
                    errorMessage: 'Sorry, that name is already taken',
                } )
            }
        } )
        .catch(function(err) {
            console.log( err );
        })

    }

    const handleChange = e => {

        if ( linkgroupCreationStatus.errorMessage !== '' ) {
            setLinkgroupCreationStatus( {
                errorMessage: '',
            })
        }
        setLinkgroup( {
            name: e.target.value,
            slug: convertSpinalCase( e.target.value ),/* TODO: Check if slug is already taken */
            user: newUserId,
        } )
    }

    return (
        <Fragment>
            <form onSubmit={ handleSubmit }>
                <div className='input-field'>
                    <input
                        type='text'
                        id='quicklinksname'
                        name='name'
                        value={ linkgroup.name }
                        onChange={ handleChange }
                        placeholder='Sarahs Links'
                        className='validate'
                        required
                    />
                    <label htmlFor='name'>
                        Name for your group of quicklinks
                    </label>
                </div>
                <div>{ linkgroup.slug }</div>
                <div>{ linkgroupCreationStatus.errorMessage }</div>
                <div>
                    <button type='submit'>
                        Create new group of quicklinks
                    </button>
                </div>
                <div>{ linkgroupCreationStatus.statusMessage }</div>
            </form>
        </Fragment>
    );

} )

export default FormLink;