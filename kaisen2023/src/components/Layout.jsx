import React from 'react'
import Footer2 from './Footer2'
import NavBar2 from './NavBar2'

const Layout = ({ children }) => {
    return (
        <>
            <NavBar2 />
            {children}
            <Footer2 />
        </>
    )
}

export default Layout