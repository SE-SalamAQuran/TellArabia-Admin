import React from 'react';
import OrdersGridView from "./OrdersGridView";

export default function Orders() {
    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 style={{ textAlign: 'center' }}>Orders</h1>
                    </div>

                    <OrdersGridView />
                </div>
            </div>
        </div>
    )
}
