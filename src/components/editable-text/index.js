import React, { useContext, useState } from 'react'

import { AppContextNonPersisted } from '../../contextNonPersisted'
import { currentUserIsOwner, updateLinkGroup, updateLinkPage } from '../../shared/utilities'

// Display text
// Check if user has privileges to edit
// Hover over text and an edit pencil appears in the top right
// Click the text and it turns into an input field to edit
// Click out of the input field and it saves and updates firebase

const EditableText = ( { className, text, linkPage, linkGroup, editableTextContext } ) => {

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    const isEditable = currentUserIsOwner( appStateNonPersisted.authenticated, appStateNonPersisted.uid, linkPage.uid );

    const updateLinkGroupTitle = ( e ) => {
        // Get the linkGroup data object
        let linkGroupNew = linkGroup;
        // Change it to update the text
        linkGroupNew.title = e.currentTarget.textContent;
        // use it with the updateLinkGroup function
        updateLinkGroup( linkPage.id, linkGroup.parentLinkGroupId, linkGroup.id, linkGroupNew );
    }

    const updateLinkPageTitle = ( e ) => {
        // Get the linkGroup data object
        let linkPageNew = linkPage;
        // Change it to update the text
        linkPageNew.name = e.currentTarget.textContent;
        // use it with the updateLinkGroup function
        updateLinkPage( linkPage.id, linkPageNew );
    }

    const onBlur = ( e ) => {
        if ( editableTextContext === 'linkGroupTitle' ) {
            updateLinkGroupTitle( e );
        } else if ( editableTextContext === 'linkPageTitle' ) {
            updateLinkPageTitle( e );
        }
    }

    return (
        <div className={ className }>
            <div className="editable-text" spellCheck="false" contentEditable={ isEditable } onBlur={ e => onBlur( e ) } suppressContentEditableWarning={ true }>
                { text }
            </div>
        </div>
    )
}

EditableText.defaultProps = {
}

export default EditableText