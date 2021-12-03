import { React, useState, useEffect } from 'react';
import axios from "axios";
import DrawerMUI from './DrawerMUI';
import ComplaintStatusForm from "./ComplaintStatusForm";

export default function Complaints() {

    const [complaints, setComplaints] = useState([]);
    useEffect(() => {

        axios.get("https://tellarabia.herokuapp.com/admin/complaints", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.complaints);
                setComplaints(response.data.complaints);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [complaints]);




    function changeBadgeColor(status) {
        if (status === "Pending") {
            return "badge badge-secondary";
        } else if (status === "In Progress") {
            return "badge badge-info";
        } else if (status === "Closed") {
            return "badge badge-danger";
        } else if (status === "Resolved") {
            return "badge badge-success"
        }
    }




    return (
        <div>
            <h1 style={{ marginBottom: "2em" }}>Complaints</h1>
            {complaints.map((complaint, character) => {
                return (
                    <div key={character} className="jumbotron jumbotron-fluid">
                        <div className="container">
                            <div className="row">
                                <div className="col">
                                    <h3>Complaint Details
                                    </h3>
                                    <p>Date: {complaint.date}</p>

                                    <p className="lead">"{complaint.details}"</p>

                                    <p>Customer name: {complaint.complainant.name}</p>
                                    <p> Phone: {complaint.complainant.phone}</p>
                                    <span>Complaint status: </span><span className={changeBadgeColor(complaint.status)}>{complaint.status}</span>
                                </div>

                            </div>
                            <div style={{ marginTop: "1rem" }}>
                                <DrawerMUI anchor="right" className="child-canvas" text="Update Status" title="Update Complaint Status" component={<ComplaintStatusForm status={complaint.status} complaint={complaint._id} />} theme="btn btn-outline-dark" />

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}
