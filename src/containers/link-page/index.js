import React, { Fragment, useContext, useEffect, useState, useReducer } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { AppContextNonPersisted } from '../../contextNonPersisted'
import EditableText from '../../components/editable-text/index'
import LinkGroup from '../../components/link-group/index'

import { useStickyState } from '../../hooks/useStickyState'
import { currentUserIsOwner, fireBaseQuery, listSubCollections, createSubCollection, reorder } from '../../shared/utilities'

const LinkPage = ( { match } ) => {

    const [ linkPage, setLinkPage ] = useStickyState( [], 'lp-' + match.params.groupslug )

    const [ linkPageSubCollections, setLinkPageSubCollections ] = useStickyState( [], 'lp-sc-' + match.params.groupslug )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const [ _count, forceUpdate ] = useReducer(x => x + 1, 0);

    // Get the details of the current quicklinks page
    useEffect( () => {
        fireBaseQuery( 'linkgroups', 'slug', match.params.groupslug, setLinkPage )

        return () => {
            console.log( 'cleanup linkPage' )
        }
    }, [] );

    // Get the subcollections of links for the current quicklinks page
    useEffect( () => {
        // wtf are we trying to do here
        // get the array of subcollection IDs
        if ( linkPage.length ) {
            // Call the firebase function to get sub collections and set linkPageSubCollections 
            listSubCollections( 'linkgroups', linkPage[0].id, setLinkPageSubCollections );
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

    function onDragEnd( result ) {
        if ( !result.destination ) {
            return;
        }

        if ( result.destination.index === result.source.index ) {
            return;
        }

        const items = reorder(
            linkPageSubCollections,
            result.source.index,
            result.destination.index
        );

        console.log( items )

        setLinkPageSubCollections( items );
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
                                                    <LinkGroup key={ index + subCollection  } linkPage={ linkPage[ 0 ] } subCollectionId={ subCollection } index={ index } />
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
                        <div className="button button--bigred" onClick={ () => createNewSubCollection( linkPage[ 0 ].id ) }>+</div>
                    </div>
                }
            </div>
        </main>
    )
}

export default LinkPage;