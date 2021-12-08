import { React, useState, useEffect } from "react";
import axios from "axios";
import DrawerMUI from "./DrawerMUI";
import MUICard from "./MUICard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import StudentPointsForm from "./StudentPointsForm";
import StudentComplaintsAccordion from "./StudentComplaintsAccordion";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


export default function StudentsGridView() {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios.get("https://tellarabia.herokuapp.com/admin/students", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.students);
                setStudents(response.data.students);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [students]);




    // const OfferDetails = (props) => {
    //     return (<div style={{ marginBottom: "1em" }}>
    //         <ul className="list-group">
    //             <li className="list-group-item">Title: {props.title}</li>
    //             <li className="list-group-item">Price: {props.price}</li>
    //             <li className="list-group-item">Likes: {props.likes}</li>
    //             <li className="list-group-item">Orders: {props.orders}</li>
    //         </ul>


    //     </div>);
    // }

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
    const CustomerDetails = (props) => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">Country: {props.country}</li>
                    <li className="list-group-item">City: {props.city}</li>
                    <li className="list-group-item">Address: {props.address}</li>
                    <li className="list-group-item">Zip Code: {props.zipcode}</li>
                    <li className="list-group-item">Meetings: {props.meetings}</li>
                    <li className="list-group-item">Active: {props.active ? <YesComponent /> : <NoComponent />}</li>
                </ul>

            </div>
        );
    }


    const StudentDetails = (props) => {
        return (
            <div>
                <ul className="list-group">
                    <li className="list-group-item">University: {props.university}</li>
                    <li className="list-group-item">Major: {props.major}</li>
                    <li className="list-group-item">Degree: {props.degree}</li>
                    <li className="list-group-item">Language: {props.language}</li>
                </ul>

            </div>
        );
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    {students.map((character) => {
                        return (
                            <Grid item xs={12} md={6} lg={4}>
                                <Item><MUICard
                                    title={
                                        <div>
                                            <DrawerMUI anchor="right" theme="btn btn-success" component={<StudentPointsForm student={character._id} />} title="Add points" text={character.points + " Points"} />
                                            <hr />
                                            <DrawerMUI anchor="right" theme={character.complaints.length > 5 ? "btn btn-danger" : "btn btn-warning"} component={<StudentComplaintsAccordion complaints={character.complaints} />} title={character.userInfo['name'] + " Complaints"} text={character.complaints.length + " Complaints"} />

                                        </div>}
                                    display="none"
                                    date={character.userInfo['phone']}
                                    service={character.userInfo["name"]}
                                    image={character.userInfo['avatar']}
                                    detailsTitle="Profile"
                                    details={<CustomerDetails city={character.userInfo['city']} country={character.userInfo['country']} address={character.userInfo['address'] || "Not provided"} phone={character.userInfo['phone']} zipcode={character.userInfo['zipCode']} meetings={character.userInfo['meetings'].length} active={character.userInfo['is_active']} />}
                                    descriptionTitle="More details"
                                    description={<StudentDetails university={character.university} major={character.major} degree={character.degree} language={character.language || "Not specified"} />}
                                /></Item>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </div>

    )
}


