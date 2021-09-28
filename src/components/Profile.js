import React from 'react';

import DrawerMUI from './DrawerMUI';

export default function Profile() {


    function handleHomeClick(e) {
        e.preventDefault();
        window.location = '/home';
    }



    return (
        <div style={{ width: window.innerWidth }}>
            <button onClick={handleHomeClick} className="btn btn-dark btn-lg">Back to home page</button>
            <h1 style={{ textAlign: "center", marginTop: "10px" }}>This is the profile page</h1>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <DrawerMUI style={{ position: "sticky", top: '0' }} text="Add new admin" title="Admin registration" component={<h1>Hi</h1>} theme="btn btn-success" />
            </div>
        </div>
    )
}
