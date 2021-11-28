import { React, useState } from 'react'
import { Row, Col, Toast } from "react-bootstrap";
import axios from "axios";


export default function UploadImageForm() {

    const [avatar, setAvatar] = useState(null);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });

    function handleImageChange(e) {
        if (e.target.files[0]) {
            setAvatar(e.target.files[0]);
        }
    }

    function handleUpload(e) {
        e.preventDefault();
        let data = new FormData();
        data.append("avatar", avatar);
        axios.patch("https://tellarabia.herokuapp.com/admin/update/avatar", data,
            {
                headers: {
                    'Authorization': window.sessionStorage.getItem("token"),
                }
            })
            .then((res) => {

                setShow(true);
                setMessage({
                    header: "Success",
                    type: "alert alert-success",
                    text: res.data.message
                });
            }).catch((err) => {
                console.log(err);
                setShow(true);
                setMessage({
                    header: "Failure",
                    type: "alert alert-danger",
                    text: "Invalid File"
                });
            })
    }



    return (
        <div>
            <form onSubmit={handleUpload} encType="multipart/form-data">
                <div className="row">
                    <div className="col">
                        <input type="file" onChange={handleImageChange} className="form-control" placeholder="Image" name="avatar" ></input>
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
