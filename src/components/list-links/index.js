import React, { Fragment, useContext, useEffect, useState } from 'react'
import { db } from '../../firebase'

import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner } from '../../shared/utilities'
import ModalCreateLink from '../../components/modal-create-link/index'

import './styles.css'

const ListLinks = ( { linkGroupId, linkGroupUid, subCollectionId } ) => {

    const [ links, setLinks ] = useState( [] )

    const [ modalState, setModalState ] = useState( false );

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    useEffect( () => {
        const unsub = db.collection( 'linkgroups' ).doc( linkGroupId ).collection( subCollectionId ).onSnapshot( snapshot => {
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
        db.collection( 'linkgroups' ).doc( linkGroupId ).collection( subCollectionId )
        .doc(id)
        .delete();
    }

    // Show the modalCreateLink component if user is authenticated and the group owner
    const showModalCreateLink = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkGroupUid );

    return (
        <Fragment>

            { links.length ? links.map( link => (
                <div className="grid__item" key={ 'grid__item-' + link.id }>
                    <div className="card color--card">
                        { currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkGroupUid ) && <div className="card__delete" onClick={ () => deleteLink( link.id ) }></div> }
                        <a className="card__link" href={ link.href } title={ link.title } target={ appStatePersisted.linkTargetBlank ? "_blank" : "_self" } rel={ appStatePersisted.linkTargetBlank ? "noopener noreferrer" : "" }>
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
            <div className="grid__item grid__item--plus">
                <div className="card card--plus" onClick={ () => setModalState( ! modalState ) }>
                    <div className="card__plus"><span>+</span> Add New </div>
                </div>
            </div>
            { showModalCreateLink && modalState && <ModalCreateLink modalState={ modalState } setModalState={ setModalState } linkGroupUid={ linkGroupUid } linkGroupId={ linkGroupId } linkGroupSubCollection={ subCollectionId } /> }
        </Fragment>
    )
}

export default ListLinks;