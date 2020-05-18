import React, { Fragment, useContext, useEffect, useState } from 'react'
import { db } from '../../firebase'

import EditableText from '../editable-text/index'
import Link from '../link/index'
import ModalCreateLink from '../modal-create-link/index'
import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner } from '../../shared/utilities'

const LinkGroup = ( { linkPage, subCollectionId } ) => {

    const [ groupData, setGroupData ] = useState( {} )

    const [ modalState, setModalState ] = useState( false );

    const [ groupVisibility, setGroupVisibility ] = useState( true )

    const { appStatePersisted, setAppStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const authenticated = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage.uid );

    const groupVisibilityClass = groupVisibility ? '' : 'grid--collapsed';

    useEffect( () => {
        const unsub = db.collection( 'linkgroups' ).doc( linkPage.id ).collection( subCollectionId ).onSnapshot( snapshot => {
            const subCollection = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) )
            setGroupData( subCollection[ 0 ] );
        });
        return () => {
            console.log( 'cleanup' );
            unsub();
        }
    }, [] );

    // const deleteLink = id => {
    //     db.collection( 'linkgroups' ).doc( linkPage.id ).collection( subCollectionId )
    //     .doc(id)
    //     .delete();
    // }

    // Show the modalCreateLink component if user is authenticated and the group owner
    const showModalCreateLink = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage.uid );

    return (
        <div className={ 'grid ' + groupVisibilityClass }>
            <EditableText className="grid__title" text={ groupData.title } linkPage={ linkPage } linkGroup={ groupData } editableTextContext='linkGroupTitle' />
            <Fragment>
                { Object.keys( groupData ).length && groupData.links.length ? groupData.links.map( link => {
                    return (
                    <div className="grid__item" key={ 'grid__item-' + link.title }>
                        <Link href={ link.href } id={ link.id } title={ link.title } authenticated={ authenticated } linkTargetBlank={ appStatePersisted.linkTargetBlank } />
                    </div>
                ) } )
                : <div className="grid__item grid__item--full u-centered">Please click the `Add New` button to add some links to this group.</div>
                }
                <div className="grid__item grid__item--plus">
                    <div className="card card--plus" onClick={ () => setModalState( ! modalState ) }>
                        <div className="card__plus"><span>+</span> Add New </div>
                    </div>
                </div>
                { showModalCreateLink && modalState && <ModalCreateLink modalState={ modalState } setModalState={ setModalState } linkGroupUid={ linkPage.uid } linkPageId={ linkPage.id } linkGroupSubCollectionId={ subCollectionId } groupData={ groupData } /> }
            </Fragment>

            <div className="grid__collapse-expand" onClick={ () => setGroupVisibility( ! groupVisibility ) }>
                <svg height="32" id="chevron-up" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path fill="#DC493A" d="M1 20 L16 6 L31 20 L27 24 L16 14 L5 24 z"/></svg>
            </div>
        </div>
    )
}

export default LinkGroup