import React from 'react'

import './styles.css'

const Link = ( { href, id, title } ) => {
    return (
        <a href={ href }>{ title }</a>
    )
}

export default Link