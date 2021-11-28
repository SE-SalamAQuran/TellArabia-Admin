import { React, useState, useEffect } from 'react';
import axios from "axios";
import { Button, Nav, Navbar } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


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
            {/* <button onClick={handleHomeClick} className="btn btn-dark btn-lg">Back to home page</button>
            <br></br>
             */}
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="#home">Profile page</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={handleHomeClick}>Home</Button>

                </Nav>

                <Nav>
                    <Button style={{ marginLeft: "0.5em" }} className="btn btn-danger" onClick={logOut}>Logout</Button>
                </Nav>

            </Navbar>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} md={6} lg={4}>
                        <Item>
                            <img src={info.avatar} alt="avatar" style={{ width: "100%" }}></img>
                        </Item>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <Item>
                            <h1>{info.name}</h1>
                        </Item>
                    </Grid>

                </Grid>
            </Box>



            <div style={{ padding: "10px", width: "50%", position: "fixed", right: 0 }}>


            </div>
        </div >
    )
}
