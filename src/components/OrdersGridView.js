import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";
import DrawerMUI from "./DrawerMUI";
import OrderStatusForm from "./OrderStatusForm";


export default function ServicesGridView() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
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
    }, [orders]);




    const OfferDetails = (props) => {
        return (<div>
            <span>Service: {props.service}</span>
            <br />

            <span>Title: {props.title}</span>
            <br />

            <span>Price: {props.price}</span>
            <br />

            <span>Likes: {props.likes}
            </span>

            <br />


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

    const YesComponent = () => {
        return (
            <div>
                Yes <img src="https://img.icons8.com/fluency/15/000000/verified-account.png" alt="confirmed" />
            </div>
        )
    }

    const NoComponent = () => {
        return (
            <div>
                No <img src="https://img.icons8.com/external-bearicons-outline-color-bearicons/15/000000/external-error-essential-collection-bearicons-outline-color-bearicons.png" alt="not-confirmed" />
            </div>

        )
    }

    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", padding: '10px', width: "100%" }} className="container">
            <div className="row">
                {orders.map((character) => {
                    return (
                        <div style={{ marginTop: "1em", padding: '2em' }} className="col-sm">

                            <div className="card text-white text-center bg-dark mb-3" style={{ maxWidth: '20rem' }}>
                                <div style={{ fontWeight: "bold" }} className="card-header">
                                    {character.offer.service['name']}
                                    <br />

                                </div>

                                <div className="card-subtitle mb-2" style={{ marginTop: '0.6em' }}><strong>Deadline:</strong> {character.deadline}</div>
                                <div className="card-body">
                                    <div className="card-subtitle">
                                        <strong> Status:</strong> {character.status}
                                        <br />
                                        <strong>Language:</strong> {character.language}
                                        <br />
                                        <strong>Confirmation:</strong> {character.confirmed ? <YesComponent /> : <NoComponent />}
                                    </div>
                                    <hr />
                                    <p className="card-text">
                                        {character.details}
                                    </p>
                                </div>
                                <div className="card-footer text-muted">
                                    <DrawerMUI anchor="right" className="child-canvas" text="Customer details" title="Customer Details" component={<CustomerDetails phone={character.user.phone} user={character.user.name} country={character.user.country} city={character.user.city} />} theme="btn btn-outline-light btn-block" />
                                    <DrawerMUI anchor="right" className="child-canvas" text="Offer details" title="Offer Details" component={<OfferDetails price={character.offer.price} title={character.offer.title} likes={character.offer.likes} service={character.offer.service['name']} />} theme="btn btn-outline-light btn-block" />
                                    <DrawerMUI anchor="right" className="child-canvas" text="Update Status" title="Update Order Status" component={<OrderStatusForm status={character.status} order={character._id} />} theme="btn btn-light" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}


