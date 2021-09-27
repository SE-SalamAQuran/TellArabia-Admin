import { React, useState } from "react";
import FakeSuspense from './FakeSuspense';
import { CircularProgress } from '@mui/material';
import Dashboard from './Dashboard';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { Button } from "react-bootstrap";
import bg_image from "../Images/sidebar-image.jpg";
import Orders from "./Orders";
import ComingSoon from "./ComingSoon";
import Revenue from "./Revenue";
import Contracts from "./Contracts";
import Services from "./Services";
import Satisfaction from "./Satisfaction";

export default function Main() {
    const [collapse, setCollapse] = useState(false);
    const [content, setContent] = useState(<Dashboard />);

    const ProfileIcon = () => {
        return (<img src="https://img.icons8.com/color/25/000000/user.png" alt="profile" />)
    }
    const ServicesIcon = () => {
        return (<img src="https://img.icons8.com/external-becris-lineal-color-becris/25/000000/external-light-bulb-artificial-intelligence-becris-lineal-color-becris.png" alt="services" />)
    }


    const OrdersIcon = () => {
        return (<img src="https://img.icons8.com/fluency/25/000000/purchase-order.png" alt="orders" />)

    }

    const DashboardIcon = () => {
        return (<img src="https://img.icons8.com/color/25/ffffff/dashboard--v1.png" alt="dashboard-icon" />)
    }


    const ChatIcon = () => {
        return (<img src="https://img.icons8.com/external-justicon-lineal-color-justicon/25/000000/external-chat-notifications-justicon-lineal-color-justicon.png" alt="chat" />)
    }
    const StatIcon = () => {
        return (<img src="https://img.icons8.com/external-prettycons-flat-prettycons/25/000000/external-statistics-business-and-finance-prettycons-flat-prettycons.png" alt="stat" />)
    }


    const CashIcon = () => {
        return (<img src="https://img.icons8.com/external-kiranshastry-lineal-color-kiranshastry/25/000000/external-dollar-banking-and-finance-kiranshastry-lineal-color-kiranshastry-6.png" alt="revenue" />)
    }
    const SatisfactionIcon = () => {
        return (<img src="https://img.icons8.com/color/25/000000/satisfaction.png" alt="satisfaction" />)
    }
    const ContractIcon = () => {
        return (<img src="https://img.icons8.com/external-becris-lineal-color-becris/25/000000/external-contract-business-situations-becris-lineal-color-becris.png" alt="contract" />)
    }
    const NotificationsIcon = () => {
        return (<img src="https://img.icons8.com/external-flatart-icons-flat-flatarticons/25/000000/external-bell-communication-and-media-flatart-icons-flat-flatarticons.png" alt="notifications" />)
    }


    function handleCollapse() {
        setCollapse(!collapse);
    }

    function logOut(e) {
        e.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("refresh");
        window.location = "/";
    }

    function Head() {
        if (collapse) {
            return (<div>
                <button title="Expand" onClick={handleCollapse}>
                    <img style={{ marginLeft: 0 }} src="https://img.icons8.com/dotty/30/000000/menu.png" alt="menu-icon" />
                </button>
            </div>);
        } else {
            return (<div>
                <button title="Collapse" style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }} onClick={handleCollapse} className="btn btn-light">
                    <img src="https://img.icons8.com/ios/20/000000/long-arrow-left.png" alt="arrow" />
                </button>
                <h3 style={{ textAlign: 'center', marginTop: '0.6em' }}>TellArabia</h3>
            </div>);
        }
    }



    function Footer() {
        if (collapse) {
            return (<div>
                <Button title="Logout" onClick={logOut} className="btn btn-danger btn-block btn-md">
                    <img src="https://img.icons8.com/ios/50/ffffff/power-off-button--v3.png" style={{ width: "100%" }} alt="off" />
                </Button>
            </div>);
        } else {
            return (
                <div>
                    <Button onClick={logOut} title="Logout" style={{ marginTop: "1rem", marginBottom: "1em" }} className="btn btn-danger btn-block btn-md">Logout</Button>
                    <p>CopyRight @TellArabia {new Date().getFullYear()}</p>
                </div>
            )
        }
    }

    function handleProfileClick(e) {
        e.preventDefault();
        window.location = '/profile';
    }


    function handleNotificationsClick(e) {
        e.preventDefault();
        setContent(<ComingSoon />);
    }

    function handleDashboardClick(e) {
        e.preventDefault();
        setContent(<Dashboard />);
    }

    function handleChatsClick(e) {
        e.preventDefault();
        setContent(<ComingSoon />);
    }

    function handleContractsClick(e) {
        e.preventDefault();
        setContent(<Contracts />);
    }

    function handleRevenueClick(e) {
        e.preventDefault();
        setContent(<Revenue />);
    }

    function handleServicesClick(e) {
        e.preventDefault();
        setContent(<Services />);
    }
    function handleSatisfactionClick(e) {
        e.preventDefault();
        setContent(<Satisfaction />);
    }
    function handleOrdersClick(e) {
        e.preventDefault();
        setContent(<Orders />);
    }




    return (
        <div >
            <section style={{ float: 'left' }}>
                <div style={{ height: window.innerHeight }}>
                    <ProSidebar image={bg_image} collapsed={collapse}>

                        <Button className="btn btn-dark">
                            <Head onClick={{ handleCollapse }} />
                        </Button>


                        <SidebarContent>
                            <Menu iconShape="circle">
                                <MenuItem onClick={handleNotificationsClick} title="Notifications" icon={<NotificationsIcon />}>Notifications</MenuItem>
                                <MenuItem onClick={handleDashboardClick} name="dashboard" icon={<DashboardIcon />}>Dashboard</MenuItem>
                                <MenuItem onClick={handleChatsClick} name="chats" icon={<ChatIcon />}>Chats</MenuItem>
                                <MenuItem icon={<OrdersIcon />} name="orders" onClick={handleOrdersClick}>
                                    Orders
                                </MenuItem>
                                <MenuItem onClick={handleContractsClick} name="contracts" icon={<ContractIcon />}>Contracts</MenuItem>
                                <SubMenu icon={<StatIcon />} title="Statistics">
                                    <MenuItem onClick={handleRevenueClick} name="revenue" icon={<CashIcon />}>Revenue</MenuItem>
                                    <MenuItem onClick={handleSatisfactionClick} name="satisfaction" icon={<SatisfactionIcon />}>Customer Satisfaction</MenuItem>
                                </SubMenu>
                                <MenuItem onClick={handleServicesClick} name="services" icon={<ServicesIcon />}>Services</MenuItem>
                                <MenuItem onClick={handleProfileClick} icon={<ProfileIcon />}>Profile
                                </MenuItem>
                            </Menu>

                        </SidebarContent>

                        <SidebarFooter style={{ textAlign: "center", width: "inherit" }}>
                            <Footer />
                        </SidebarFooter>
                    </ProSidebar >
                </div>
            </section>
            <section>
                <FakeSuspense fallback={<CircularProgress />}>
                    {content}
                </FakeSuspense>

            </section>
        </div>
    )
}
