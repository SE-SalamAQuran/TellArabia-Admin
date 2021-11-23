import { React, useState, useEffect } from 'react';
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Profile() {

    const [info, setInfo] = useState({
        name: "",
        city: "",
        address: "",
        phone: "",
        avatar: "",
        country: "",
    });

    function handleHomeClick(e) {
        e.preventDefault();
        window.location = '/home';
    }


    useEffect(() => {
        axios.get("https://tellarabia.herokuapp.com/users/profile", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token")
            }
        }).then((response) => {
            const retreivedInfo = response.data.profile.userInfo;
            setInfo(
                {
                    name: retreivedInfo.name,
                    phone: retreivedInfo.phone,
                    city: retreivedInfo.city,
                    country: retreivedInfo.country,
                    address: retreivedInfo.address,
                    avatar: retreivedInfo.avatar
                }
            );
        })
            .catch((res) => {
                console.log(res.data.message);
            });
    }, []);


    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("refresh");
        window.location = "/";
    }
    return (
        <div style={{ width: window.innerWidth }}>
            <button onClick={handleHomeClick} className="btn btn-dark btn-lg">Back to home page</button>
            <br></br>
            <Button onClick={logOut} title="Logout" style={{ marginTop: "1rem", marginBottom: "1em" }} className="btn btn-danger btn-md">Logout</Button>

            <div style={{ padding: "10px", width: "50%", position: "fixed", right: 0 }}>
                <img style={{
                    width: "250px", height: "250px", borderRadius: "70%"
                }} src={info.avatar} alt="profile pic" />
                <h1>{info.name}</h1>
            </div>
        </div >
    )
}
