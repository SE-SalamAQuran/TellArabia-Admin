import { React, useState, useEffect } from "react";
import "../styles/Scroller.css";
import axios from "axios";



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


        <div style={{ marginLeft: "auto", marginRight: "auto", padding: '10px', width: "100%" }} className="container">
            <div className="row">
                {services.map((character) => {
                    return (
                        <div style={{ marginTop: "1em", padding: '2em' }} className="col-sm">

                            <div className="card text-black text-center bg-light mb-3" style={{ maxWidth: '20rem' }}>
                                <div className="card-header">
                                    {character.main_category}

                                </div>
                                <div className="card-subtitle mb-2" style={{ marginTop: '0.6em' }}>{character.sub_category}</div>
                                <div className="card-body">
                                    <div className="card-subtitle" style={{}}>
                                        Price: {character.price}
                                    </div>
                                    <hr />
                                    <p className="card-text">
                                        {character.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>

    )
}


