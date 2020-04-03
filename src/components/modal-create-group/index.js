import React, { Fragment, useContext, useState } from 'react';

import { AppContextNonPersisted } from '../../contextNonPersisted'

const ModalCreateGroup = ( { modalState, setModalState } ) => {

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    return (
        <Fragment>
            { modalState && <div className="modal">
                <div className="modal__background" onClick={ () => setModalState( ! modalState ) }></div>
                <div className="modal__inner">
                    <div className="modal__title">Add a Group</div>
                    <div className="modal__content">
                        Create a group here 
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )

}

export default ModalCreateGroup;