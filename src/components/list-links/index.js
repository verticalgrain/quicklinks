import React, { Fragment, useContext, useEffect, useState } from 'react'
import { db } from '../../firebase'

import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner } from '../../shared/utilities'
import Link from '../link/index'

import './styles.css'

const ListLinks = ( { linkGroupId, linkGroupUid } ) => {
    
    const [ links, setLinks ] = useState( [] )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )
    
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
        db.collection( 'linkgroups' ).doc( linkGroupId ).collection( 'links' )
        .doc(id)
        .delete();
    }

    return (
        <Fragment>
            { links.length ? links.map( link => (
                <div className="grid__item" key={ 'grid__item-' + link.id }>
                    <div className="card color--card">
                        { currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkGroupUid ) && <div className="card__delete" onClick={ () => deleteLink( link.id ) }></div> }
                        <a className="card__link" href={ link.href } title={ link.title } target="_blank" rel="noopener noreferrer">
                            <div className="card__inner">
                                <div className="card__favicon"><img src={ 'https://s2.googleusercontent.com/s2/favicons?domain=' + link.href } width="16" height="16" /></div>
                                <div className="card__title">{ link.title }</div>
                                <div className="card__url">{ link.href }</div>
                            </div>
                        </a>
                    </div>
                </div>
            ) )
            : <div className="u-centered">You don't seem to have any links yet. Please click the plus button to create some.</div>
            }
        </Fragment>
    )
}

export default ListLinks;