import React from 'react'

import './styles.css'

const Link = ( { href, id, title, authenticated, linkTargetBlank, deleteLink } ) => {
    console.log( id );
    return (
        <div className="card color--card">
            { authenticated && <div className="card__delete" onClick={ () => deleteLink( id ) }></div> }
            <a className="card__link" href={ href } title={ title } target={ linkTargetBlank ? "_blank" : "_self" } rel={ linkTargetBlank ? "noopener noreferrer" : "" }>
                <div className="card__inner">
                    <div className="card__favicon"><img src={ 'https://s2.googleusercontent.com/s2/favicons?domain=' + href } width="16" height="16" /></div>
                    <div className="card__title">{ title }</div>
                    <div className="card__url">{ href }</div>
                </div>
            </a>
        </div>
    )
}

export default Link