import React, { Fragment, useContext, useState } from 'react';

import ButtonCreateLink from '../button-create-link/index'
import { AppContextNonPersisted } from '../../contextNonPersisted'
import FormLink from '../form-link/index'

const ModalCreateLink = ( { modalState, setModalState, linkGroupId, linkGroupUid, linkGroupSubCollection } ) => {

    const { appStateNonPersisted, setAppStateNonPersisted } = useContext( AppContextNonPersisted )

    return (
        <Fragment>
            { modalState && <div className="modal">
                <div className="modal__background" onClick={ () => setModalState( ! modalState ) }></div>
                <div className="modal__inner">
                    <div className="modal__title">Add a quicklink</div>
                    <div className="modal__content">
                        <FormLink linkGroupId={ linkGroupId } linkGroupSubCollection={ linkGroupSubCollection } callBack={ setModalState }  />
                    </div>
                </div>
            </div>
            }
            { appStateNonPersisted.authenticated && <ButtonCreateLink buttonOnclick={ setModalState } toggleState={ modalState } /> }
        </Fragment>
    )

}

export default ModalCreateLink;