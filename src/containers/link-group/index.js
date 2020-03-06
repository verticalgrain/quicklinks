import React, { Fragment, useState, useEffect } from 'react'

import FormLink from '../../components/form-link/index'
import ListLinks from '../../components/list-links/index'

import { fireBaseQuery } from '../../shared/utilities'

const LinkGroup = ( { match } ) => {

    const [ linkGroup, setLinkGroup ] = useState( [] )

    console.log( linkGroup );

    useEffect( () => {
        fireBaseQuery( 'linkgroups', 'slug', match.params.groupslug, setLinkGroup );

        return () => {
            console.log( 'cleanup' );
        }
    }, [] );

    return (
        <Fragment>
            { linkGroup.length ?
                <Fragment>
                    { match.params.groupslug }
                    { linkGroup.map( link => (
                        <div key={ 'linkgroupid-' + link.id }>
                            { link.id }
                            { link.slug }
                            { link.name }
                            { link.user }
                        </div>
                    ))}
                    <FormLink linkGroupId={ linkGroup[ 0 ].id } />
                    <ListLinks linkGroupId={ linkGroup[ 0 ].id } />
                </Fragment>
            :
                <div>Ooops, the group does not seem to exist.</div>
            }
        </Fragment>
    )
}

export default LinkGroup;