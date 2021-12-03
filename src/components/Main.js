import { React, useState, useEffect } from "react";
import FakeSuspense from './FakeSuspense';
import { CircularProgress } from '@mui/material';
import Dashboard from './Dashboard';
import Orders from "./Orders";
import ComingSoon from "./ComingSoon";
import Meetings from "./Meetings";
import Freelancers from "./Freelancers";
import Applications from "./Applications";
import axios from "axios";
import Services from "./Services";
import Support from "./Support";
import { Container, Navbar, NavDropdown, Nav, Button } from "react-bootstrap";
import Offers from "./Offers";


export default function Main() {
    const [content, setContent] = useState(<Orders />);
    const [lookups, setLookups] = useState([]);
    const MenuIcon = (props) => {
        return (<img style={{ marginLeft: "4px" }} src={props.image} alt="icon" />)
    }

    useEffect((lookups) => {

        axios.get("https://tellarabia.herokuapp.com/lookups/all", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.result);
                setLookups(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);
    localStorage.setItem("lookups", JSON.stringify(lookups));


    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("refresh");
        window.location = "/";
    }


    function handleOffersClick(e) {
        e.preventDefault();
        setContent(<Offers />);
    }

    function handleFreelancersClick(e) {
        e.preventDefault();
        setContent(<Freelancers />);
    }

    function handleDashboardClick(e) {
        e.preventDefault();
        setContent(<Dashboard />);
    }

    function handleChatsClick(e) {
        e.preventDefault();
        setContent(<ComingSoon />);
    }

    function handleApplicationsClick(e) {
        e.preventDefault();
        setContent(<Applications />);
    }

    function handleMeetingsClick(e) {
        e.preventDefault();
        setContent(<Meetings />);
    }

    function handleServicesClick(e) {
        e.preventDefault();
        setContent(<Services />);
    }
    function handleSupportClick(e) {
        e.preventDefault();
        setContent(<Support />);
    }
    function handleOrdersClick(e) {
        e.preventDefault();
        setContent(<Orders />);
    }




    return (
        <div>

            <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                <Container>
                    <Navbar.Brand style={{ fontFamily: "'Courier New', monospace" }} href="/home">
                        TellArabia
                        <Button onClick={logOut} title="Logout" style={{ marginTop: "1rem", marginBottom: "1em" }} className="btn btn-danger btn-block btn-md">Logout</Button>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Button onClick={handleDashboardClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Dashboard
                                <MenuIcon image="https://img.icons8.com/color/25/ffffff/dashboard--v1.png" />
                            </Button>
                            <Button onClick={handleChatsClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Chats
                                <MenuIcon image="https://img.icons8.com/external-justicon-lineal-color-justicon/25/000000/external-chat-notifications-justicon-lineal-color-justicon.png" />
                            </Button>
                            <Button onClick={handleOffersClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Offers
                                <MenuIcon image="https://img.icons8.com/external-justicon-flat-justicon/25/000000/external-offer-ecommerce-justicon-flat-justicon-1.png" />
                            </Button>

                            <Button onClick={handleOrdersClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Orders
                                <MenuIcon image="https://img.icons8.com/fluency/25/000000/purchase-order.png" />
                            </Button>



                        </Nav>
                        <Nav className="me-auto">
                            <Button onClick={handleFreelancersClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Freelancers
                                <MenuIcon image="https://img.icons8.com/external-itim2101-lineal-color-itim2101/25/000000/external-employee-human-resource-itim2101-lineal-color-itim2101.png" />
                            </Button>
                            <Button onClick={handleApplicationsClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Job Applications
                                <MenuIcon image="https://img.icons8.com/external-becris-lineal-color-becris/25/000000/external-contract-business-situations-becris-lineal-color-becris.png" />
                            </Button>
                            <Button onClick={handleServicesClick} style={{ marginLeft: "5px" }} className="btn btn-md btn-outline-dark">Services
                                <MenuIcon image="https://img.icons8.com/external-becris-lineal-color-becris/25/000000/external-light-bulb-artificial-intelligence-becris-lineal-color-becris.png" />
                            </Button>


                            <NavDropdown style={{ marginLeft: "5px" }} title='Customer Care' id="collasible-nav-dropdown">
                                <NavDropdown.Item onClick={handleMeetingsClick}>Meetings
                                    <MenuIcon image="https://img.icons8.com/external-wanicon-flat-wanicon/25/000000/external-meeting-work-at-home-wanicon-flat-wanicon.png" />

                                </NavDropdown.Item>

                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleSupportClick}>Support

                                    <MenuIcon image="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/25/000000/external-support-online-shopping-vitaliy-gorbachev-lineal-color-vitaly-gorbachev-2.png" />
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <Nav.Link style={{ marginLeft: '1em', textAlign: 'center' }} title="profile" eventKey={2} href="/profile">
                                <MenuIcon image="https://img.icons8.com/color/25/000000/user.png" /> Profile
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <FakeSuspense fallback={<CircularProgress />}>
                    {content}
                </FakeSuspense>

            </div>

        </div>
    )
}
