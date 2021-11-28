import { React, useState } from 'react'
import { Row, Col, Toast } from "react-bootstrap";
import axios from "axios";



export default function UpdateNameForm(props) {
    const [firstName, setFirstName] = useState(props.name[0]);
    const [lastName, setLastName] = useState(props.name[1]);
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });

    function handleFirstNameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastNameChange(e) {
        setLastName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let data = {
            name: firstName + " " + lastName,
        };
        axios.patch("https://tellarabia.herokuapp.com/users/update/name", data,
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
                        <input type="text" value={firstName} onChange={handleFirstNameChange} className="form-control" placeholder={firstName} name="firstName"></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="text" value={lastName} onChange={handleLastNameChange} className="form-control" placeholder={lastName} name="lastName"></input>
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
