import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";
import { Table } from "react-bootstrap";





export default function TableView(props) {
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
        <div>
            <div
                className="row"
                style={{
                    padding: "5rem",
                    display: 'block'
                }}
            >
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Main Catergory</th>
                            <th>Sub Category</th>
                            <th>Price</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    {services.map((character) => {
                        return (

                            <tbody>
                                <tr>
                                    <td>{character.main_category}</td>
                                    <td>{character.sub_category}</td>
                                    <td>{character.price}</td>
                                    <td>{character.description}</td>
                                </tr>

                            </tbody>
                        );
                    })}
                </Table>

            </div>
        </div>
    )
}


