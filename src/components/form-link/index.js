import React, { useEffect, useRef, useState } from 'react'
import { db } from '../../firebase'

const FormLink = ( { linkGroupId, linkGroupSubCollection, callBack } ) => {
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

    // TODO:
    // If no collection exists, add to default collection
    // If collection exists, add to that collection (via prop passed from list-links)
    const handleSubmit = e => {
        e.preventDefault();
        db.collection( 'linkgroups' ).doc( linkGroupId ).collection( linkGroupSubCollection ).add( link );
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