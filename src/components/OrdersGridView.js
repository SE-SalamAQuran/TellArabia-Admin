import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";
import DrawerMUI from "./DrawerMUI";


export default function ServicesGridView() {
    const [orders, setOrders] = useState([]);
    useEffect((orders) => {

        axios.get("https://tellarabia.herokuapp.com/admin/orders", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.orders);
                setOrders(response.data.orders);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const OfferDetails = (props) => {
        return (<div style={{ margin: 'auto' }}>
            <span>Service: {props.service}</span>
            <br />

            <span>Title: {props.title}</span>
            <br />

            <span>Price: {props.price}</span>
            <br />

            <span>Likes: {props.likes}</span>
        </div>);
    }
    const CustomerDetails = (props) => {
        return (
            <div>
                <span>Name: {props.user}</span>
                <br />

                <span>Phone: {props.phone}</span>
                <br />

                <span>Country: {props.country}</span>
                <br />
                <span>City: {props.city}</span>
            </div>
        );
    }



    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", padding: '10px', width: "100%" }} className="container">
            <div className="row">
                {orders.map((character) => {
                    return (
                        <div style={{ marginTop: "1em", padding: '2em' }} className="col-sm">

                            <div className="card text-white text-center bg-dark mb-3" style={{ maxWidth: '20rem' }}>
                                <div className="card-header">
                                    "{character.topic}"
                                    <br />

                                </div>
                                <div style={{ marginTop: '0.6em' }}>
                                    Service: {character.offer.service['name']}

                                </div>
                                <div className="card-subtitle mb-2" style={{ marginTop: '0.6em' }}>Deadline: {character.deadline}</div>
                                <div className="card-body">
                                    <div className="card-subtitle">
                                        Status: {character.status.toLowerCase()}
                                    </div>
                                    <hr />
                                    <p className="card-text">
                                        {character.details}
                                    </p>
                                </div>
                                <div className="card-footer text-muted">
                                    <DrawerMUI anchor="left" className="child-canvas" text="Customer details" title="Customer Details" component={<CustomerDetails phone={character.user.phone} user={character.user.name} country={character.user.country} city={character.user.city} />} theme="btn btn-outline-light btn-block" />
                                    <DrawerMUI anchor="right" className="child-canvas" text="Offer details" title="Offer Details" component={<OfferDetails price={character.offer.price} title={character.offer.title} likes={character.offer.likes} service={character.offer.service['name']} />} theme="btn btn-outline-light btn-block" />

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}


