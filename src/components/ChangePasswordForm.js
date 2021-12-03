import { React, useState } from 'react'
import { Row, Col, Toast } from "react-bootstrap";
import axios from "axios";


export default function ChangePasswordForm() {
    const [password, setPassword] = useState("");
    const [passConf, setPassConf] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });


    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handlePassConfChange(e) {
        setPassConf(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = {
            newPassword: password,
            passConfirmation: passConf
        };
        axios.patch("https://tellarabia.herokuapp.com/auth/change_password", data,
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
                    text: "Invalid Values"
                });
            })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col">
                        <input type="password" value={password} onChange={handlePasswordChange} className="form-control" placeholder="New Password" name="password"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="password" value={passConf} onChange={handlePassConfChange} className="form-control" placeholder="Confirm New Password" name="passConf"></input>
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
