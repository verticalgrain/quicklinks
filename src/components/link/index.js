import React from 'react'

import './styles.css'

const Link = ( { href, title, authenticated, linkTargetBlank, deleteLink } ) => {

    return (
        <div className="card color--card">
            { authenticated && <div className="card__delete" onClick={ () => deleteLink( href ) }></div> }
            <a className="card__link" href={ href } title={ title } target={ linkTargetBlank ? "_blank" : "_self" } rel={ linkTargetBlank ? "noopener noreferrer" : "" }>
                <div className="card__inner">
                    <div className="card__favicon"><img src={ 'https://www.google.com/s2/favicons?sz=32&domain_url=' + href } width="32" height="32" /></div>
                    <div className="card__title">{ title }</div>
                    <div className="card__url">{ href }</div>
                </div>
            </a>
        </div>
    )
}

export default Link