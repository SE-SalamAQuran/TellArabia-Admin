import { React, useState } from 'react';
import { Row, Col, Toast } from "react-bootstrap";
import axios from "axios";

export default function StudentPointsForm(props) {
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });
    const [points, setPoints] = useState(0);

    function handlePointsChange(e) {
        setPoints(e.target.value);
    }

    function handleUpdate(e) {
        e.preventDefault();
        if (points < 0) {
            setShow(true);
            setMessage({
                header: "Failure",
                type: "alert alert-danger",
                text: "Invalid Points"
            });
            return;
        }

        const data = {
            studentID: props.student,
            points: points
        };
        axios.patch("https://tellarabia.herokuapp.com/admin/points/add", data,
            {
                headers: {
                    'Authorization': window.sessionStorage.getItem("token"),
                }
            }).then((res) => {
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
                    text: "Invalid Inputs"
                });
            })
    }

    return (
        <div>
            <div>
                <form onSubmit={handleUpdate}>
                    <div className="row">
                        <div className="col">
                            <input type="number" name="points" onChange={handlePointsChange} placeholder="points" value={points}></input>
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
        </div>
    )
}
