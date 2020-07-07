import React, { Fragment } from 'react';

import FormLink from '../form-link/index'

const ModalCreateLink = ( { modalState, setModalState, linkPageId, linkGroupUid, linkGroupSubCollectionId, groupData } ) => {

    return (
        <Fragment>
            { modalState && <div className="modal">
                <div className="modal__background" onClick={ () => setModalState( ! modalState ) }></div>
                <div className="modal__inner">
                    <div className="modal__title">Add a quicklink</div>
                    <div className="modal__content">
                        <FormLink linkPageId={ linkPageId } linkGroupSubCollectionId={ linkGroupSubCollectionId } groupData={ groupData } callBack={ setModalState }  />
                    </div>
                </div>
            </div>
            }
        </Fragment>
    )

}

export default ModalCreateLink;