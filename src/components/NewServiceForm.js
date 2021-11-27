import { React, useState } from 'react';
import { Row, Col, Toast, Form } from "react-bootstrap";
import axios from "axios";

export default function NewServiceForm() {
    const [main, setMain] = useState("");
    const [sub, setSub] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });
    var myArray = JSON.parse(window.localStorage.getItem("lookups"));
    console.log("Main services", myArray);
    var main_services = [];

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].classification === "main_services") {
            main_services = myArray[i].values;
        }
    }

    function handleMainChange(e) {
        setMain(e.target.value);
    }
    function handleImageChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    function handleSubChange(e) {
        setSub(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        formData.append("main", main);
        formData.append("sub", sub);
        formData.append("description", description);
        axios.post("https://tellarabia.herokuapp.com/services/new", formData, {
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
                setMain("");
                setSub("");

            }).catch((error) => {
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
                        <input name="sub" value={sub} onChange={handleSubChange} type="text" className="form-control" placeholder="Service name"></input>
                    </div>

                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="col">
                        <input type="file" name="image" onChange={handleImageChange} className="form-control" placeholder="Image"></input>
                    </div>
                </div>
                <div className="row" style={{ marginTop: "1rem" }}>
                    <div className="col">
                        <Form.Control
                            as="textarea"
                            placeholder="Service Description"
                            style={{ height: '100px' }}
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
