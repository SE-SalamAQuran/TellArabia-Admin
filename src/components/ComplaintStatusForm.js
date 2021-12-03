import { React, useState, useEffect } from 'react';
import { Row, Col, Toast } from "react-bootstrap";
import axios from "axios";


export default function ComplaintStatusForm(props) {
    var statusList = [];
    const [disable, setDisable] = useState(false);
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        type: "",
        header: "",
        text: "",
    });
    var lookups = JSON.parse(window.localStorage.getItem("lookups"));

    useEffect(() => {
        if (props.status === "Resolved") {
            setShow(true);
            setMessage({
                type: "alert alert-info",
                text: "Cannot change status when it's Resolved",
                header: "Resolved Complaint"
            });
            setDisable(true);
        }
        else if (props.status === "Closed") {
            setShow(true);
            setMessage({
                type: "alert alert-warning",
                text: "Cannot change status when it's closed",
                header: "Closed Complaint"
            });
            setDisable(true);
        }
    }, [props.status])

    for (var i = 0; i < lookups.length; i++) {
        if (lookups[i].classification === "complaints_status_values") {
            statusList = lookups[i].values;
        }
        const index = statusList.indexOf(props.status);
        if (index > -1) {
            statusList.splice(index, 1);
        }
    }

    function handleStatusChange(e) {
        setStatus(e.target.value);
    }

    function handleUpdate(event) {
        event.preventDefault();

        const data = {
            complaint: props.complaint,
            status: status
        };
        axios.patch("https://tellarabia.herokuapp.com/admin/update/complaint", data,
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
            <form onSubmit={handleUpdate}>
                <div className="row">
                    <div className="col">
                        <select className="form-control" name="status" onChange={handleStatusChange}>
                            <option>Choose Status</option>
                            {statusList.map((character) => {
                                return (<option value={character}>{character}</option>);
                            })}
                        </select>
                    </div>
                </div>
                <div style={{ marginTop: "1em" }}>
                    <button disabled={disable} type="submit" className="btn btn-success btn-md">Submit</button>
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
