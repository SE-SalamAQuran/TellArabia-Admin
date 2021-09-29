import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";
import { Card } from "react-bootstrap";



export default function ServicesGridView() {
    const [services, setServices] = useState([]);
    useEffect((services) => {

        axios.get("https://tellarabia.herokuapp.com/admin/services", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.services);
                setServices(response.data.services);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])



    return (
        <div style={{ marginTop: "1.43rem" }}>
            <div
                className="row"
                style={{
                    padding: "5rem",
                }}
            >
                {services.map((character) => {
                    return (
                        <Card border="light" style={{ width: '18rem' }}>
                            <Card.Header>{character.main_category}</Card.Header>
                            <Card.Body>
                                <Card.Title>{character.sub_category}</Card.Title>
                                <Card.Text>
                                    Price: {character.price}
                                    <hr />
                                    {character.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
        </div>
    )
}


