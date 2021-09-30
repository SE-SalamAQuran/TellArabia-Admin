import { React, useState, useEffect } from 'react';
import axios from "axios";
import Popup from "./Popup";

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


    const ComplaintDetails = (props) => {
        return (
            <div className="row">
                <div className="col">
                    <h5>User Details</h5>
                    <p>Name: {props.complaint.user.name}</p>
                    <p>Phone: {props.complaint.user.phone}</p>
                    <p>Country: {props.complaint.user.country}</p>
                    <p>City: {props.complaint.user.city}</p>
                </div>
                <div className="col">
                    <h5>Order Details</h5>
                    <p>Deadline: {props.complaint.order.deadline}</p>
                    <p>Language: {props.complaint.order.language}</p>
                    <p>Status: {props.complaint.order.status}</p>

                </div>
            </div>
        );
    }

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
            <h2>Complaints</h2>
            {complaints.map((character) => {
                return (
                    <div class="jumbotron jumbotron-fluid">
                        <div class="container">
                            <h1 class="display-4">{character.user.name}</h1>
                            <p class="lead">{character.order.service} / {character.order.subject} / {character.order.topic} </p>

                            <span>Complaint status: </span><span className={changeBadgeColor(character.status)}>{character.status}</span>
                            <br />
                            <Popup title="Complaint Details" content={<ComplaintDetails complaint={character} />} text="More Details" theme="btn btn-outline-dark" />

                        </div>
                    </div>
                );
            })}
        </div>
    )
}
