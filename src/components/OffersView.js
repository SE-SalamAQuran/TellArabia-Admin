import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import MUICard from "./MUICard";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const OfferDetails = (props) => {
    return (
        <ul className="list-group">
            <li className="list-group-item">Price: {props.price}</li>
            <li className="list-group-item">Orders: {props.orders}</li>

        </ul>
    )
}


export default function OffersView() {
    const [offers, setOffers] = React.useState([]);

    React.useEffect(() => {

        axios.get("https://tellarabia.herokuapp.com/offers/all", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.result);
                setOffers(response.data.result);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [offers])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {offers.map((character) => {
                    return (
                        <Grid item xs={12} md={6} lg={4}>
                            <Item><MUICard service={character.service['name']} date={character.createdAt.slice(0, 10)} description={character.description} image={character.images[Math.floor(Math.random() * character.images.length)]} likes={character.likes} title={character.title} details={<OfferDetails price={character.price} orders={character.orders.length} />} /></Item>
                        </Grid>
                    );
                })}


            </Grid>
        </Box>
    );
}
