import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { db } from '../../firebase'

import EditableText from '../editable-text/index'
import Link from '../link/index'
import ModalCreateLink from '../modal-create-link/index'
import { AppContextPersisted } from '../../contextPersisted'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner, deleteLink, generateUniqueId } from '../../shared/utilities'
import { useStickyState } from '../../hooks/useStickyState'

import Modal from 'react-modal'

const LinkGroup = ( { linkPage, subCollectionId, index, deleteLinkGroup } ) => {

    const [ groupData, setGroupData ] = useStickyState( {}, 'lg-' + subCollectionId )

    const [ modalState, setModalState ] = useState( false );

    const [ groupVisibility, setGroupVisibility ] = useState( true )

    const { appStatePersisted } = useContext( AppContextPersisted )

    const { appStateNonPersisted } = useContext( AppContextNonPersisted )

    const isAuthOwner = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage.uid );

    const groupVisibilityClass = groupVisibility ? '' : 'grid--collapsed';

    const linkCardSizeClass = ' grid--item-size-' + appStatePersisted.linkCardSize;

    useEffect( () => {
        const unsub = db.collection( 'linkpages' ).doc( linkPage.id ).collection( subCollectionId ).onSnapshot( snapshot => {
            const subCollection = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) )
            subCollection.length ? setGroupData( subCollection[ 0 ] ) : console.log( 'toast' )
        });
        return () => {
            console.log( 'cleanup linkGroup' );
            unsub();
        }
    }, [] );

    const deleteLinkLocal = href => {
        deleteLink( groupData, href );
    }

    const [ modalIsOpen, setIsOpen ] = React.useState( false );

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
    }

    function closeModal(){
        setIsOpen(false);
    }

    const ModalComponent = () => {
        return (
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Delete Group Modal"
                className="modal-react"
                overlayClassName="modal-react__background"
            >
                <div className="modal-react__inner">
                    <div className="modal-react__title">Are you sure you want to delete this group?</div>
                    <button className="button button--default button--cancel" onClick={ closeModal } role="button">Cancel</button>
                    <button className="button button--default button--confirm" onClick={ () => deleteLinkGroup( linkPage, groupData.parentLinkGroupId, groupData.id ) } role="button">Yes, delete it</button>
                </div>
            </Modal>
        )
    }

    return (
        <Fragment>
            <Draggable draggableId={ subCollectionId } index={ index }>
                { provided => (
                    <div
                        className="grid__wrapper"
                        ref={ provided.innerRef }
                        { ...provided.draggableProps }
                    >
                        { isAuthOwner && <div className="grid__handle" { ...provided.dragHandleProps }></div> }
                        { isAuthOwner && <div className="grid__delete-group" onClick={ () => openModal() }></div> }
                        { groupData && <EditableText className="grid__title" text={ groupData.title } linkPage={ linkPage } linkGroup={ groupData } editableTextContext='linkGroupTitle' /> }
                        <div className={ 'grid ' + groupVisibilityClass + linkCardSizeClass }>
                            <Fragment>
                                { !!Object.keys( groupData ).length && !!groupData.links.length ? groupData.links.map( link => {
                                    return (
                                    <div className="grid__item" key={ 'grid__item-' + generateUniqueId( 6 ) }>
                                        <Link href={ link.href } title={ link.title } authenticated={ isAuthOwner } linkTargetBlank={ appStatePersisted.linkTargetBlank } deleteLink={ deleteLinkLocal } />
                                    </div>
                                ) } )
                                : <div className="grid__item grid__item--full u-centered">&nbsp;</div>
                                }
                                { isAuthOwner &&
                                    <div className="grid__item grid__item--plus">
                                        <div className="card card--plus" onClick={ () => setModalState( ! modalState ) }>
                                            <div className="card__plus"><span>+</span> Add New </div>
                                        </div>
                                    </div>
                                }
                                { isAuthOwner && modalState && <ModalCreateLink modalState={ modalState } setModalState={ setModalState } linkGroupUid={ linkPage.uid } linkPageId={ linkPage.id } linkGroupSubCollectionId={ subCollectionId } groupData={ groupData } /> }
                            </Fragment>
                        </div>
                        <div className="grid__collapse-expand" onClick={ () => setGroupVisibility( ! groupVisibility ) }>
                            <svg height="32" id="chevron-up" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path fill="#999999" d="M1 20 L16 6 L31 20 L27 24 L16 14 L5 24 z"/></svg>
                        </div>
                        <ModalComponent />
                    </div>
                ) }
            </Draggable>
        </Fragment>
    )
}

export default LinkGroup