import React, { Fragment, useContext, useEffect, useState, useReducer } from 'react'

import { AppContextNonPersisted } from '../../contextNonPersisted'
import EditableText from '../../components/editable-text/index'
import LinkGroup from '../../components/link-group/index'

import { useStickyState } from '../../hooks/useStickyState'
import { currentUserIsOwner, fireBaseQuery, listSubCollections, createSubCollection } from '../../shared/utilities'

const LinkPage = ( { match } ) => {

    // const [ linkPage, setLinkPage ] = useState( [] )
    const [ linkPage, setLinkPage ] = useStickyState( [], 'lp-' + match.params.groupslug )

    // const [ linkPageSubCollections, setLinkPageSubCollections ] = useState ( [] )
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
        linkPage.length ? listSubCollections( 'linkgroups', linkPage[0].id, setLinkPageSubCollections ) : [];
        return () => {
            console.log( 'cleanup linkPage' )
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