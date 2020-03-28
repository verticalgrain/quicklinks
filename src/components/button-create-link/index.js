import React from 'react';

const ButtonCreateLink = ( { buttonOnclick, toggleState } ) => {

    return (
        <div className="button__wrapper button__wrapper--create-link">
            <div className="button button--create-link" onClick={ () => buttonOnclick( !toggleState ) }>+</div>
        </div>
    )

}

export default ButtonCreateLink;