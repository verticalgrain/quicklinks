import React, { Fragment } from 'react'

import FormLinkGroup from '../../components/form-link-group/index'

const CreateLinkGroup = () => {
    return (
        <Fragment>
            <main className="main">
                <div className="container container--column container--maxwidth-600">
                    <div className="u-centered">
                        <h1>Create a Quicklinks page</h1>
                    </div>
                    <FormLinkGroup />
                </div>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default CreateLinkGroup;