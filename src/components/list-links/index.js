import React, { Fragment, useState, useEffect } from 'react'
import { db } from '../../firebase'

import Link from '../link/index'

import './styles.css'

const ListLinks = ( { linkGroupId } ) => {
    const [ links, setLinks ] = useState( [] )

    useEffect( () => {
        const unsub = db.collection( 'linkgroups' ).doc( linkGroupId ).collection( 'links' ).onSnapshot( snapshot => {
            const allLinks = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) )
            setLinks( allLinks );
        });
        return () => {
            console.log( 'cleanup' );
            unsub();
        }
    }, [] );

    const deleteLink = id => {
        db.collection('links')
        .doc(id)
        .delete();
    }
    return (
        <Fragment>
            { links.map( link => (
                <Link href={link.href} title={link.title} key={link.id} />
            ))}
        </Fragment>
    )
}

export default ListLinks;