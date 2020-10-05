import React, { useContext, useEffect, useReducer } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { AppContextNonPersisted } from '../../contextNonPersisted'
import EditableText from '../../components/editable-text/index'
import LinkGroup from '../../components/link-group/index'

import { useStickyState } from '../../hooks/useStickyState'
import { createSubCollection, currentUserIsOwner, fireBaseQuery, updateLinkPage, reorder, deleteLinkGroup } from '../../shared/utilities'

const LinkPage = ( { match } ) => {

    const [ linkPage, setLinkPage ] = useStickyState( [], 'lp-' + match.params.groupslug )

    const [ linkPageSubCollections, setLinkPageSubCollections ] = useStickyState( [], 'lp-sc-' + match.params.groupslug )
    console.log( linkPageSubCollections );
    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const [ _count, forceUpdate ] = useReducer(x => x + 1, 0);

    // Get the details of the current quicklinks page
    useEffect( () => {
        fireBaseQuery( 'linkpages', 'slug', match.params.groupslug, setLinkPage )

        return () => {
            console.log( 'cleanup linkPage' )
        }
    }, [] );

    // Get the subcollections of links for the current quicklinks page
    useEffect( () => {
        // get the array of subcollection IDs
        if ( linkPage.length ) {
            // ORIGINAL WAY:
            // Call the firebase function to get sub collections and set linkPageSubCollections
            // listSubCollections( 'linkpages', linkPage[0].id, setLinkPageSubCollections );
            // NEW WAY:
            setLinkPageSubCollections( linkPage[ 0 ].linkGroupIds )
        }
        // Get the page field array of ids for ordering
        // re-order the array of subcollection IDs based on the array of ids for ordering
        // set the linkpagesubcollections with the new array of subcollection ids with this:
        ////array1: array of elements to be sorted
        //array2: array with the indexes
        // array1 = array2.map((object, i) => array1[object]);

        return () => {
            console.log( 'cleanup linkPage' )
        }
    }, [ linkPage, _count ] )

    // Show the modalCreateLink component if user is authenticated and the group owner

    const isAuthOwner = linkPage.length && currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage[ 0 ].uid );

    const createNewSubCollection = ( linkPageId ) => {
        createSubCollection( linkPageId, forceUpdate );
    }

    const deleteLinkGroupFunction = ( linkPageData, linkGroupId, linkGroupDocId ) => {
        deleteLinkGroup( linkPageData, linkGroupId, linkGroupDocId, setLinkPageSubCollections, forceUpdate );
    }

    function onDragEnd( result ) {
        if ( !isAuthOwner ) {
            return;
        }

        if ( !result.destination ) {
            return;
        }

        if ( result.destination.index === result.source.index ) {
            return;
        }

        const linkGroupIdsNewOrder = reorder(
            linkPageSubCollections,
            result.source.index,
            result.destination.index
        );

        // Update the local state with the new linkGroupIds order
        setLinkPageSubCollections( linkGroupIdsNewOrder );

        // Update fireStore with the new linkGroupIds order
        const linkPageNew = linkPage[ 0 ]
        linkPageNew.linkGroupIds = linkGroupIdsNewOrder
        updateLinkPage( linkPage[ 0 ].id, linkPageNew )
    }

    return (
        <main className="main">
            <div className="container">
                <div className="linkpage">
                    <div className="linkpage__col1 color--col1">
                        <div className="linkpage__header">
                            <div className="linkpage__name">
                                { linkPage[0] && <EditableText text={ linkPage[0].name } linkPage={ linkPage[ 0 ] } editableTextContext='linkPageTitle' /> }
                            </div>
                            { linkPage[0] && linkPage[0].description &&
                                <div className="linkpage__description">
                                    This is an optional description for the links page
                                </div>
                            }
                        </div>
                    </div>
                    <div className="linkpage__col2 color--col2">
                        <div className="linkpage__links">
                            <DragDropContext onDragEnd={ onDragEnd }>
                                <Droppable droppableId="droppableLinkPage">
                                    { provided => (
                                        <div ref={ provided.innerRef } { ...provided.droppableProps }>
                                            { linkPage.length ?
                                                linkPageSubCollections && linkPageSubCollections.map( ( subCollection, index ) => (
                                                    <LinkGroup key={ index + subCollection  } linkPage={ linkPage[ 0 ] } subCollectionId={ subCollection } index={ index } deleteLinkGroup={ deleteLinkGroupFunction } />
                                                ))
                                            :
                                                <div>Ooops, the group does not seem to exist.</div>
                                            }
                                            { provided.placeholder }
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </div>
                    </div>
                </div>
                { isAuthOwner &&
                    <div className="button__wrapper button__wrapper--bigred">
                        <div className="button button--bigred" onClick={ () => createNewSubCollection( linkPage[ 0 ] ) }>+</div>
                    </div>
                }
            </div>
        </main>
    )
}

export default LinkPage;