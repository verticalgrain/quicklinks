import React, { useState } from 'react'
import { db } from '../../firebase'

const FormLink = ( { linkGroupId, linkGroupSlug } ) => {
    const [ link, setLink ] = useState( {
        title: '',
        href: '',
    } )

    const handleSubmit = e => {
        e.preventDefault();
        db.collection( 'linkgroups' ).doc( linkGroupId ).collection( 'links' ).add( link );
        setLink( {
            title: '',
            href: '',
        })
    }

    const handleChange = e => {
        setLink( { ...link, [ e.target.name ]: e.target.value } )
    }

    // When the form-link is submitted
    // Get the id of the current document, by the current slug
    // Add the link to the sub-collection of the document

    return (
        <form onSubmit={ handleSubmit }>
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
                    value={ link.href }
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