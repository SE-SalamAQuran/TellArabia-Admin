import { React, useState, useEffect } from 'react';
import axios from "axios";
import { Button, Nav, Navbar } from "react-bootstrap";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DrawerMUI from "./DrawerMUI";
import UploadImageForm from "./UploadImageForm";
import UpdateNameForm from './UpdateNameForm';
import ChangePasswordForm from "./ChangePasswordForm";

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
    }, [info]);


    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("refresh");
        window.location = "/";
    }
    return (
        <div style={{ width: window.innerWidth }}>

            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/profile">Profile page</Navbar.Brand>
                <Nav className="mr-auto">
                    <Button onClick={handleHomeClick}>Home</Button>

                </Nav>

                <Nav>
                    <Button style={{ marginLeft: "0.5em" }} className="btn btn-danger" onClick={logOut}>Logout</Button>
                </Nav>

            </Navbar>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={6} lg={8}>
                        <Item>
                            <h1>{info.name}</h1>
                            <hr></hr>
                        </Item>
                        <Item>
                            <DrawerMUI title="Update Username" anchor="right" className="child-canvas" text="Edit Name" component={<UpdateNameForm name={info.name.split(" ")} />} theme="btn btn-outline-info" />
                        </Item>
                        <Item>
                            <DrawerMUI title="Update Password" anchor="right" className="child-canvas" text="Change Password" component={<ChangePasswordForm />} theme="btn btn-outline-info" />
                        </Item>
                    </Grid>
                    <Grid style={{ height: "100%" }} item xs={12} md={6} lg={4}>
                        <Item>
                            <img src={info.avatar} alt="avatar" style={{ width: "50%", height: "50%", borderRadius: "50%" }}></img>
                        </Item>
                        <Item>
                            <DrawerMUI title="Upload New Image" anchor="right" className="child-canvas" text="Change Profile Image" component={<UploadImageForm />} theme="btn btn-outline-info" />
                        </Item>
                        <Item>
                            <ul className="list-group">
                                <li className="list-group-item">Phone: {info.phone}</li>
                                <li className="list-group-item">Country: {info.country}</li>
                                <li className="list-group-item">City: {info.city}</li>
                                <li className="list-group-item">Address: {info.address}</li>
                            </ul>
                        </Item>
                    </Grid>


                </Grid>
            </Box>



            <div style={{ padding: "10px", width: "50%", position: "fixed", right: 0 }}>


            </div>
        </div >
    )
}
