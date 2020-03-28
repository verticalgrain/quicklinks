import React, { Fragment } from 'react'

import FormLinkGroup from '../../components/form-link-group/index'

const CreateLinkGroup = () => {
    return (
        <Fragment>
            <main className="main">
                <div className="container container--column container--maxwidth-600">
                    <div className="u-centered">
                        <h1>Start using quicklinks in 2 seconds</h1>
                        <h2>It's free forever so why not?</h2>
                    </div>
                    <FormLinkGroup />
                </div>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default CreateLinkGroup;