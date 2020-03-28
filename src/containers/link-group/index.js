import React, { Fragment, useContext, useEffect, useState } from 'react'

import ListLinks from '../../components/list-links/index'
import ModalCreateLink from '../../components/modal-create-link/index'
import { AppContextNonPersisted } from '../../contextNonPersisted'

import { currentUserIsOwner, fireBaseQuery } from '../../shared/utilities'

const LinkGroup = ( { match } ) => {

    const [ linkGroup, setLinkGroup ] = useState( [] )

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )
    
    useEffect( () => {
        fireBaseQuery( 'linkgroups', 'slug', match.params.groupslug, setLinkGroup );

        return () => {
            console.log( 'cleanup' );
        }
    }, [] );

    // Show the modalCreateLink component if user is authenticated and the group owner
    const showModalCreateLink = linkGroup.length && currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkGroup[ 0 ].uid );

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
                            <div className="grid">
                                { linkGroup.length ?
                                    <Fragment>
                                        <ListLinks linkGroupId={ linkGroup[ 0 ].id } linkGroupUid={ linkGroup[ 0 ].uid } />
                                    </Fragment>
                                :
                                    <div>Ooops, the group does not seem to exist.</div>
                                }
                            </div>
                        </div>
                    </div>{/* .linkgroup__col2 */}
                </div>{/* .linkgroup */}
                { showModalCreateLink && <ModalCreateLink linkGroupUid={ linkGroup[ 0 ].uid } linkGroupId={ linkGroup[ 0 ].id } /> }
            </div>
        </main>
    )
}

export default LinkGroup;