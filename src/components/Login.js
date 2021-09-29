import { React, useState } from 'react';
import axios from "axios";
import { Form, Button, Col, Row, Toast } from "react-bootstrap";
import "../styles/Layout.css";


export default function Login() {

    const [state, setState] = useState({
        phone: "",
        password: "",
    });

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setState((prev) => {
            if (name === "phone") {
                return {
                    phone: value,
                    password: prev.password,
                };
            } else if (name === "password") {
                return {
                    phone: prev.phone,
                    password: value,
                };
            }
        });
    }

    function handleButtonDisable() {
        return state.password.length < 8 ? true : false;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const cred = {
            phone: state.phone,
            password: state.password,
        };
        axios
            .post("https://tellarabia.herokuapp.com/auth/login/admin", cred)
            .then((res) => {
                setMessage({
                    type: "alert alert-success",
                    header: "Success",
                    text: "Logged in successfully",
                });
                console.log(res.data);
                setShow(true);

                const token = res.data.token;
                sessionStorage.setItem("token", token);
                let thisUser = res.data.currentUser;
                sessionStorage.setItem("user", JSON.stringify(thisUser));
                sessionStorage.setItem("refresh", res.data.refresh);
                setTimeout(() => { }, 2000);
                window.location = "/home";
            })
            .catch((err) => {
                //handle error
                setMessage({
                    type: "alert alert-danger",
                    header: "Failed",
                    text: err.response.data.message,
                });
                setShow(true);
            });
    }
    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={handleChange} name="phone" value={state.phone} type="phone" placeholder="Enter Phone" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={handleChange} value={state.password} type="password" placeholder="Password" />
                </Form.Group>
                <Button disabled={handleButtonDisable()} variant="outline-light" type="submit" style={{
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                }}>
                    Login
                    <img
                        src="https://img.icons8.com/android/20/ffffff/login-rounded-right.png"
                        style={{ marginLeft: "5px" }}
                        alt="login-icon"
                    />
                </Button>
            </Form>
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
