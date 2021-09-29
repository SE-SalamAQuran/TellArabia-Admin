import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";
import { Card } from "react-bootstrap";
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

    const OrderDetails = (props) => {
        return (
            <div>
                <h5>Customer: {props.user}</h5>
                <h6>Phone: {props.phone}</h6>
                <span>Country: {props.country}</span>
                <br />
                <span>City: {props.city}</span>
            </div>
        );
    }



    return (
        <div style={{ marginTop: "1.43rem" }}>
            <div
                className="row"
                style={{
                    padding: "3rem",
                }}
            >
                {orders.map((character) => {
                    return (

                        <Card border="light" bg="dark" style={{ width: '18rem', color: "white" }}>
                            <Card.Header style={{ textAlign: 'center' }}>{character.service}</Card.Header>
                            <Card.Body>
                                <Card.Title>{character.subject}</Card.Title>
                                <Card.Subtitle>Deadline: {character.deadline}</Card.Subtitle>
                                <Card.Subtitle style={{ marginTop: "0.6em", marginBottom: "0.5rem" }}>Status: {character.status.toLowerCase()}

                                </Card.Subtitle>
                                <Card.Text>
                                    Topic: {character.topic}
                                    <hr />
                                    {character.details}

                                </Card.Text>

                            </Card.Body>
                            <Card.Footer>
                                <DrawerMUI anchor="left" className="child-canvas" text="Order details" title="User details" component={<OrderDetails phone={character.user.phone} user={character.user.name} country={character.user.country} city={character.user.city} />} theme="btn btn-success" />
                            </Card.Footer>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}


