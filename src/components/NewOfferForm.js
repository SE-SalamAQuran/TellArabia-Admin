import { React, useState } from 'react';
import { Row, Col, Toast, Form } from "react-bootstrap";
import axios from "axios";

export default function NewOfferForm() {
    var main_services = [];
    let sub_services = [];

    const [main, setMain] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [service, setService] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });
    var lookupsArray = JSON.parse(window.localStorage.getItem("lookups"));



    for (var i = 0; i < lookupsArray.length; i++) {
        if (lookupsArray[i].classification === "main_services") {
            main_services = lookupsArray[i].values;
        }
    }


    function handleMainChange(e) {
        setMain(e.target.value);
    }

    function handleImagesChange(e) {
        if (e.target.files) {
            let files = e.target.files;
            setImages(files);
            console.log("Files", e.target.files.length);
            console.log("Images", images.length);
        }
    }

    for (var j = 0; j < lookupsArray.length; j++) {
        if (lookupsArray[j].classification === main.toLowerCase().split(' ').join('_') + '_services') {
            sub_services = lookupsArray[j].values;
        }
    }
    function handleServiceChange(e) {
        setService(e.target.value);
    }

    function handlePriceChange(e) {
        setPrice(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i], images[i].name);
        }
        formData.append("service", service);
        formData.append("price", price.toString() + "$");
        formData.append("description", description);
        axios.post("https://tellarabia.herokuapp.com/offers/new", formData, {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then((response) => {
                setShow(true);
                setMessage({
                    header: "Success",
                    type: "alert alert-success",
                    text: response.data.message
                });

                setDescription("");
                setPrice("");

            })
            .catch((error) => {
                setShow(true);
                console.log(error);
                setMessage({
                    header: "Failure",
                    type: "alert alert-danger",
                    text: "Invalid Inputs"
                });
            });
    }




    return (
        <div style={{ marginBottom: "2rem" }}>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <div className="row">
                    <div className="col">
                        <select className="form-control" name="main" onChange={handleMainChange}>
                            {main_services.map((character) => {
                                return (<option>{character}</option>);
                            })}
                        </select>

                    </div>
                    <div className="col">
                        <select className="form-control" name="service" onChange={handleServiceChange}>
                            {sub_services.map((character) => {
                                return (<option value={character}>{character}</option>);
                            })}
                        </select>

                    </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="col">
                        <input name="price" value={price} onChange={handlePriceChange} type="number" className="form-control" placeholder="Price"></input>
                    </div>
                    <div className="col">
                        <input type="file" name="images" onChange={handleImagesChange} multiple className="form-control" placeholder="Images"
                        ></input>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="col">
                        <Form.Control
                            as="textarea"
                            placeholder="Offer Description"
                            style={{ height: '200px' }}
                            name="description"
                            value={description}
                            onChange={handleDescriptionChange}
                        />

                    </div>
                </div>


                <div style={{ marginTop: "1em" }}>
                    <button type="submit" className="btn btn-success btn-md">Submit</button>
                </div>
            </form>
            <Row style={{ marginTop: '2.5rem' }}>
                <Col xs={12}>
                    <Toast
                        onClose={() => setShow(false)}
                        show={show}
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                        delay={3000}
                        autohide
                    >
                        <div className={message.type}>
                            <strong className="mr-auto">{message.header}</strong>
                            <br></br>
                            <small>{message.text}</small>
                        </div>
                    </Toast>
                </Col>
            </Row>
        </div>
    )
}
