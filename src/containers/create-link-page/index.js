import React, { Fragment } from 'react'

import FormLinkPage from '../../components/form-link-page/index'

const CreateLinkPage = () => {
    return (
        <Fragment>
            <main className="main">
                <div className="container container--column container--maxwidth-600">
                    <div className="u-centered">
                        <h1>Create a Quicklinks page</h1>
                    </div>
                    <FormLinkPage />
                </div>
            </main>
            <footer></footer>
        </Fragment>
    )
}

export default CreateLinkPage;