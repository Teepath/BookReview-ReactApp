import React from 'react';
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';

function Layout(props) {
    return (
        <div>
        <Header />
            { props.children }
       
        </div>
    )
}

export default Layout
