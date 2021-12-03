import React from 'react';
import DrawerMUI from './DrawerMUI';
import "../styles/Layout.css";
import ServicesGridView from "./ServicesGridView";
import NewCategoryForm from "./NewCategoryForm";
import NewServiceForm from './NewServiceForm';

export default function Services() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{ textAlign: 'center' }}>Services</h1>
                </div>
                <div className="col-md-6">
                    <DrawerMUI style={{
                        display: "block",
                        marginLeft: "1em",

                    }} anchor="right" className="child-canvas" text="Add Main Category" title="New Main Category" component={<NewCategoryForm />} theme="btn btn-success" />

                </div>
                <div className="col-md-6">
                    <DrawerMUI style={{
                        display: "block",
                        marginLeft: "1em",

                    }} anchor="right" className="child-canvas lowerBtn" text="Add Service" title="New Service" component={<NewServiceForm />} theme="btn btn-success" />
                </div>
                <div className="col-md-12">
                    <ServicesGridView />

                </div>

            </div>
        </div>

    )
}
