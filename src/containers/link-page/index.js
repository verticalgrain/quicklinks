import React, { Fragment, useContext, useEffect, useState, useReducer } from 'react'

import { AppContextNonPersisted } from '../../contextNonPersisted'
import EditableText from '../../components/editable-text/index'
import LinkGroup from '../../components/link-group/index'

import { currentUserIsOwner, fireBaseQuery, listSubCollections, createSubCollection } from '../../shared/utilities'

const LinkPage = ( { match } ) => {

    const [ linkPage, setLinkPage ] = useState( [] )

    const [ linkPageSubCollections, setLinkPageSubCollections ] = useState ( [] )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const [ _count, forceUpdate ] = useReducer(x => x + 1, 0);

    // Get the details of the current quicklinks page
    useEffect( () => {
        fireBaseQuery( 'linkgroups', 'slug', match.params.groupslug, setLinkPage )

        return () => {
            console.log( 'cleanup' )
        }
    }, [] );

    // Get the subcollections of links for the current quicklinks page
    useEffect( () => {
        linkPage.length ? listSubCollections( 'linkgroups', linkPage[0].id, setLinkPageSubCollections ) : [];
        return () => {
            console.log( 'cleanup' )
        }
    }, [ linkPage, _count ] )

    // Show the modalCreateLink component if user is authenticated and the group owner

    const isAuthOwner = linkPage.length && currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage[ 0 ].uid );

    const createNewSubCollection = ( linkPageId ) => {
        createSubCollection( linkPageId, forceUpdate );
    }

    return (
        <main className="main">
            <div className="container">
                <div className="linkpage">
                    <div className="linkpage__col1 color--col1">
                        <div className="linkpage__header">
                            <div className="linkpage__name">
                                { linkPage[0] && <EditableText text={ linkPage[0].name } linkPage={ linkPage[ 0 ] }  /> }
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
                            { linkPage.length ?
                                linkPageSubCollections && linkPageSubCollections.map( ( subCollection, index ) => (
                                    <LinkGroup key={ index + subCollection  } linkPage={ linkPage[ 0 ] } subCollectionId={ subCollection } />
                                ))
                            :
                                <div>Ooops, the group does not seem to exist.</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            { isAuthOwner && <button onClick={ () => createNewSubCollection( linkPage[ 0 ].id ) }>Button Button Button Button Button</button> }
        </main>
    )
}

export default LinkPage;