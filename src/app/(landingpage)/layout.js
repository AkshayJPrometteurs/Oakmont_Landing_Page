import React, { Fragment } from 'react'
import Header from '@/components/Header'

const MainPageLayout = ({children}) => {
    return (
        <Fragment>
            <Header/>
            {children}
        </Fragment>
    )
}

export default MainPageLayout