import { React, useState, useEffect } from 'react';
import axios from "axios";

export default function Complaints() {

    const [complaints, setComplaints] = useState([]);
    useEffect((complaints) => {

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
    }, []);




    function changeBadgeColor(status) {
        if (status === "Pending") {
            return "badge badge-secondary";
        } else if (status === "In progress") {
            return "badge badge-info";
        } else if (status === "Removed") {
            return "badge badge-danger";
        } else {
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

                                    <p className="lead">{complaint.details}</p>

                                    <p>Customer name: {complaint.complainant.name}</p>
                                    <p> Phone: {complaint.complainant.phone}</p>
                                    <span>Complaint status: </span><span className={changeBadgeColor(complaint.status)}>{complaint.status}</span>
                                </div>
                                {/* <div className="col">
                                    <h3 style={{ marginBottom: "1em" }}>Order Details</h3>
                                    <p>Deadline: {complaint.order.deadline}</p>
                                    <p>Language: {complaint.order.language}</p>
                                    <p>Status: {complaint.order.status}</p>
                                    <p>Confirmed: {!complaint.order.confirmed ? "Yes" : "No"}</p>
                                </div> */}
                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    )
}
