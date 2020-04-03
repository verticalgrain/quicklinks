import React, { Fragment, useContext, useEffect, useState } from 'react'

import ListLinks from '../../components/list-links/index'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import ButtonCreateLink from '../../components/button-create-link/index'
import ModalCreateGroup from '../../components/modal-create-group/index'

import { currentUserIsOwner, fireBaseQuery, listSubCollections } from '../../shared/utilities'

const LinkGroup = ( { match } ) => {

    const [ linkGroup, setLinkGroup ] = useState( [] )
    
    const [ linkGroupSubCollections, setLinkGroupSubCollections ] = useState ( [] )

    const [ modalState, setModalState ] = useState( false )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    // Get the details of the current quicklinks page
    useEffect( () => {
        fireBaseQuery( 'linkgroups', 'slug', match.params.groupslug, setLinkGroup )

        return () => {
            console.log( 'cleanup' )
        }
    }, [] );
    
    // Get the subcollections of links for the current quicklinks page
    useEffect( () => {
        linkGroup.length ? listSubCollections( 'linkgroups', linkGroup[0].id, setLinkGroupSubCollections ) : [];

        return () => {
            console.log( 'cleanup' )
        }
    }, [ linkGroup ] )

    // Show the modalCreateLink component if user is authenticated and the group owner


    const isAuthOwner = linkGroup.length && currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkGroup[ 0 ].uid );
    console.log( isAuthOwner )
    return (
        <main className="main">
            <div className="container">
                <div className="linkgroup">
                    <div className="linkgroup__col1 color--col1">
                        <div className="linkgroup__name">
                            { linkGroup[0] && linkGroup[0].name }
                        </div>
                    </div>
                    <div className="linkgroup__col2 color--col2">
                        <div className="linkgroup__links">
                            { linkGroup.length ?
                                linkGroupSubCollections && linkGroupSubCollections.map( ( subCollection, index ) => (
                                    <Fragment key={ subCollection + index}>
                                        <div className="grid">
                                            <ListLinks linkGroupId={ linkGroup[ 0 ].id } linkGroupUid={ linkGroup[ 0 ].uid } subCollectionId={ subCollection } />
                                        </div>
                                    </Fragment>  
                                ))
                            :
                                <div>Ooops, the group does not seem to exist.</div>
                            }
                        </div>
                    </div>{/* .linkgroup__col2 */}
                </div>{/* .linkgroup */}
            </div>
            { isAuthOwner && <ButtonCreateLink buttonOnclick={ setModalState } toggleState={ modalState } /> }
            { isAuthOwner && modalState && <ModalCreateGroup modalState={ modalState } setModalState={ setModalState } linkGroupUid={ linkGroup[ 0 ].uid } /> }
        </main>
    )
}

export default LinkGroup;