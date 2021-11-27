import React from 'react';
import FreelancersGridView from './FreelancersGridView';

export default function Freelancers() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 style={{ textAlign: 'center' }}>Freelancers</h1>
                </div>


                <div className="col-md-12">
                    <FreelancersGridView />

                </div>

            </div>
        </div>
    )
}
