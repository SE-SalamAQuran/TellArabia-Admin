import React from "react";
import "../styles/Layout.css";

function onClick() {
    window.location = "/";
}

const NotFound = () => (
    <div style={{ textAlign: "center", margin: "1rem" }}>
        <h1>404 - Not Found!</h1>
        <h3>The page you're looking for is not found</h3>
        <button onClick={onClick} className="btn btn-outline-dark btn-md">
            Go Back
        </button>
        <br></br>
        <img
            style={{ marginTop: "2rem" }}
            className="box"
            src="https://img.icons8.com/clouds/150/000000/cottage.png"
            alt="house"
        />
    </div>
);

export default NotFound;