import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'
import { updateLinkGroup } from '../../shared/utilities'

const FormLink = ( { linkPageId, linkGroupSubCollectionId, groupData, callBack } ) => {

    const [ link, setLink ] = useState( {
        title: '',
        href: '',
    } )

    const textInput = useRef( null );

    useEffect( () => {

        textInput.current.focus();

        return () => {

        }
    }, [] )

    // Get the first (only) document in the subcollection
    // If it doesn't exist yet, add a dummy
    // When form is submitted,
    // Add the link and title to the end of the array of links
    const handleSubmit = e => {
        e.preventDefault();
        const groupDataNew = groupData;
        groupDataNew.links.push( link )
        updateLinkGroup( linkPageId, linkGroupSubCollectionId, groupData.id, groupDataNew )
        callBack && callBack( false )
        setLink( {
            title: '',
            href: '',
        })
    }

    const handleChange = e => {
        setLink( { ...link, [ e.target.name ]: e.target.value } )
    }

    return (
        <form className="form form--link" onSubmit={ handleSubmit }>
            <div className='input-field'>
                <input
                    type='text'
                    id='title'
                    name='title'
                    value={ link.title }
                    onChange={ handleChange }
                    placeholder='Title'
                    className='validate'
                    required
                    ref={ textInput }
                />
                <label htmlFor='title'>
                    Title
                </label>
            </div>
            <div>
                <input
                    type='text'
                    id='href'
                    name='href'
                    value={ link.href ? link.href : 'https://' }
                    onChange={ handleChange }
                    placeholder='Link href'
                    className='validate'
                    required
                />
                <label htmlFor='href'>
                    Href
                </label>
            </div>
            <div>
                <button type='submit'>
                    Add Link
                </button>
            </div>
        </form>
    );

}

export default FormLink;