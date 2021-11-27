import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import UserCard from "./UserCard";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const FreelancerDetails = (props) => {
    return (
        <ul className="list-group">
            <li className="list-group-item">Country: {props.country}</li>
            <li className="list-group-item">City: {props.city}</li>
            <li className="list-group-item">Address: {props.address}</li>
            <li className="list-group-item">Zip Code: {props.zipCode}</li>
            <li className="list-group-item">Meetings: {props.meetings}</li>
        </ul>
    )
}

export default function FreelancersGridView() {
    const [freelancers, setFreelancers] = React.useState([]);

    React.useEffect((freelancers) => {

        axios.get("https://tellarabia.herokuapp.com/admin/freelancers", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.freelancers);
                setFreelancers(response.data.freelancers);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {freelancers.map((character) => {
                    return (
                        <Grid item xs={12} md={6} lg={4}>
                            <Item><UserCard
                                image={character.userInfo['avatar']}
                                phone={character.userInfo['phone']}
                                name={character.userInfo['name']}
                                facebook={character.socialMediaURLs['facebook']}
                                twitter={character.socialMediaURLs['twitter']}
                                linkedin={character.socialMediaURLs['linkedIn']}
                                website={character.socialMediaURLs['website']}
                                title={character.language}
                                details={<FreelancerDetails
                                    country={character.userInfo['country']}
                                    city={character.userInfo['city']}
                                    address={character.userInfo['address']}
                                    zipCode={character.userInfo['zipCode']}
                                    meetings={character.userInfo['meetings'].length}

                                />}
                            /></Item>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}
