import { React, useState, useEffect } from "react";
import axios from "axios";
import DrawerMUI from "./DrawerMUI";
import OrderStatusForm from "./OrderStatusForm";
import MUICard from "./MUICard";
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


export default function OrdersGridView() {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        axios.get("https://tellarabia.herokuapp.com/admin/orders", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.orders);
                setOrders(response.data.orders);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [orders]);




    const OfferDetails = (props) => {
        return (<div style={{ marginBottom: "1em" }}>
            <ul className="list-group">
                <li className="list-group-item">Title: {props.title}</li>
                <li className="list-group-item">Price: {props.price}</li>
                <li className="list-group-item">Likes: {props.likes}</li>
                <li className="list-group-item">Orders: {props.orders}</li>
            </ul>


        </div>);
    }
    const CustomerDetails = (props) => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">Name: {props.user}</li>
                    <li className="list-group-item">Country: {props.country}</li>
                    <li className="list-group-item">City: {props.city}</li>
                    <li className="list-group-item">Phone: {props.phone}</li>
                </ul>

            </div>
        );
    }

    const YesComponent = () => {
        return (
            <div>
                Yes <img src="https://img.icons8.com/fluency/15/000000/verified-account.png" alt="confirmed" />
            </div>
        )
    }

    const NoComponent = () => {
        return (
            <div>
                No <img src="https://img.icons8.com/external-bearicons-outline-color-bearicons/15/000000/external-error-essential-collection-bearicons-outline-color-bearicons.png" alt="not-confirmed" />
            </div>

        )
    }

    const OrderDetails = (props) => {
        return (
            <div>
                <p>{props.title}</p>
                <p>Confirmation: {props.confirmation ? <YesComponent /> : <NoComponent />} </p>
                <p>Status: {props.status}</p>

            </div>
        );
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {orders.map((character) => {
                        return (
                            <Grid item xs={12} md={6} lg={4}>
                                <Item><MUICard
                                    display="none"
                                    service={character.offer.service['name']}
                                    date={"Deadline:" + character.deadline}
                                    title={
                                        <OrderDetails
                                            title={character.details}
                                            confirmation={character.confirmed}
                                            status={character.status}
                                        />
                                    }

                                    detailsTitle="Customer Details"
                                    descriptionTitle="Offer Description"
                                    description={
                                        <div>
                                            <OfferDetails
                                                price={character.offer.price}
                                                title={character.offer.title}
                                                likes={character.offer.likes}
                                                orders={character.offer.orders.length}
                                            />
                                            <DrawerMUI anchor="right" className="child-canvas" text="Update Status" title="Update Order Status" component={<OrderStatusForm status={character.status} order={character._id} />} theme="btn btn-dark" />


                                        </div>
                                    }
                                    details={
                                        <CustomerDetails
                                            country={character.user['country']}
                                            city={character.user['city']}
                                            phone={character.user['phone']}
                                            user={character.user['name']}
                                        />

                                    }
                                /></Item>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </div>

    )
}


