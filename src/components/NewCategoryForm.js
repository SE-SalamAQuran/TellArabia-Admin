import { React, useState } from 'react';
import axios from "axios";
import { Row, Col, Toast } from "react-bootstrap";


export default function NewCategoryForm() {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleImageChange(e) {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    function handleUpload(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", image);
        formData.append("name", name);
        axios.post("https://tellarabia.herokuapp.com/services/add/category", formData, {
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

                setName("");
            }).catch((err) => {
                setShow(true);
                console.log(err);
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
                        <input name="name" value={name} onChange={handleNameChange} type="text" className="form-control" placeholder="Category name"></input>
                    </div>
                    <div className="col">
                        <input type="file" name="image" onChange={handleImageChange} className="form-control" placeholder="Image"></input>
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
