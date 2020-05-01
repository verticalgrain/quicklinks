import React, { useContext, useState } from 'react'

import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner, updateLinkGroup } from '../../shared/utilities'

// Display text
// Check if user has privileges to edit
// Hover over text and an edit pencil appears in the top right
// Click the text and it turns into an input field to edit
// Click out of the input field and it saves and updates firebase

const EditableText = ( { className, text, linkPage } ) => {

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const [ textState, setTextState ] = useState( text )

    const isEditable = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage.uid );

    const updateEditableText = ( e ) => {
        console.log( blur )
        // updateLinkGroup( linkPage.id, linkGroup.id,  );
    }

    return (
        <div className={ className }>
            <div className="editable-text" contentEditable={ isEditable } onBlur={ () => updateEditableText() } suppressContentEditableWarning={ true }>
                { textState }
            </div>
        </div>
    )
}

EditableText.defaultProps = {
}

export default EditableText