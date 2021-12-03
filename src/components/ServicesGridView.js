import { React, useState, useEffect } from "react";
import axios from "axios";
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



export default function ServicesGridView() {
    const [services, setServices] = useState([]);
    useEffect(() => {

        axios.get("https://tellarabia.herokuapp.com/admin/services", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.services);
                setServices(response.data.services);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [services])



    return (

        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {services.map((character) => {
                        return (
                            <Grid item xs={12} md={6} lg={4}>
                                <Item><MUICard
                                    display="none"
                                    service={character.parentCategory['name']}
                                    date={character.name}
                                    image={character.image}
                                    title={
                                        <div>
                                            {character.description}
                                            <hr></hr>
                                            Offers: {character.offers.length}
                                        </div>
                                    }
                                    displayAll="none"

                                /></Item>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </div>
    )
}


