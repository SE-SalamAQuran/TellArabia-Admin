import React from 'react';
import DrawerMUI from './DrawerMUI';
import "../styles/Layout.css";
import ServicesGridView from "./ServicesGridView";

export default function Services() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{ textAlign: 'center' }}>Services</h1>
                </div>
                <div className="col-md-12">
                    <DrawerMUI style={{
                        display: "block",
                        marginLeft: "1em",

                    }} anchor="right" className="child-canvas" text="Add Service" title="New Service" component={<p>New Service Form Goes Here</p>} theme="btn btn-success" />
                </div>
                <div className="col-md-12">
                    <ServicesGridView />

                </div>

            </div>
        </div>

    )
}
