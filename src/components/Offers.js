import React from 'react';
import DrawerMUI from "./DrawerMUI";
import NewOfferForm from './NewOfferForm';
import OffersView from './OffersView';

export default function Offers() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{ textAlign: 'center' }}>Offers</h1>
                </div>
                <div className="col-md-12">
                    <DrawerMUI style={{
                        display: "block",
                        marginLeft: "1em",

                    }} anchor="right" className="child-canvas" text="Add New Offer" title="New Offer" component={<NewOfferForm />} theme="btn btn-success" />

                </div>

                <div className="col-md-12">
                    <OffersView />

                </div>

            </div>
        </div>
    )
}
