import React, { useState } from 'react'

import EditableText from '../editable-text/index';
import ListLinks from '../list-links/index'

const LinkGroup = ( { linkGroup, subCollectionId } ) => {

    const [ groupVisibility, setGroupVisibility ] = useState( true )

    const groupVisibilityClass = groupVisibility ? '' : 'grid--collapsed';

    return (
        <div className={ 'grid ' + groupVisibilityClass }>
            <EditableText className="grid__title" text="Untitled group" linkGroupUid={ linkGroup.uid } />
            <ListLinks linkGroupId={ linkGroup.id } linkGroupUid={ linkGroup.uid } subCollectionId={ subCollectionId } />
            <div className="grid__collapse-expand" onClick={ () => setGroupVisibility( ! groupVisibility ) }>
                <svg height="32" id="chevron-up" viewBox="0 0 32 32" width="32" xmlns="http://www.w3.org/2000/svg"><path fill="red" d="M1 20 L16 6 L31 20 L27 24 L16 14 L5 24 z"/></svg>
            </div>
        </div>
    )
}

export default LinkGroup