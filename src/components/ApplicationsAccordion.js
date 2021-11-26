import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

export default function ApplicationsAccordion() {
    const [expanded, setExpanded] = React.useState(false);
    const [applications, setApplications] = React.useState([]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    React.useEffect((applications) => {
        axios.get("https://tellarabia.herokuapp.com/admin/applications", {
            headers: {
                'Authorization': window.sessionStorage.getItem("token"),
            }
        })
            .then(function (response) {
                console.log(response.data.applications);
                setApplications(response.data.applications);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])

    return (
        <div style={{ marginTop: "2rem" }}>
            {applications.map((character) => {
                return (
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {character.category['name']}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{character.field['name']} / {character.role}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div className="container">
                                    <div className="row">
                                        <div className="col">
                                            <p>Freelancer Details</p>
                                            <br></br>
                                            <ul class="list-group">
                                                <li class="list-group-item">{character.freelancer['name']}</li>
                                                <li class="list-group-item">{character.freelancer['phone']}</li>
                                                <li class="list-group-item">{character.freelancer['city']}</li>
                                                <li class="list-group-item">{character.freelancer['country']}</li>
                                                <li class="list-group-item">{character.freelancer['address']}</li>
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <p>Resume and Sample Work</p>
                                            <br></br>
                                            <div>
                                                <a href={character.resume} target="_blank" rel="noreferrer">
                                                    <button className="btn btn-outline-dark ">
                                                        {character.freelancer['name'].substr(0, character.freelancer['name'].indexOf(" "))}'s Resume
                                                    </button>
                                                </a>
                                            </div>

                                            <br></br>
                                            <div style={{ marginTop: "1em" }}>
                                                <a href={character.sample} target="_blank" rel="noreferrer">
                                                    <button className="btn btn-outline-dark">
                                                        Sample work by {character.freelancer['name'].substr(0, character.freelancer['name'].indexOf(" "))}
                                                    </button>
                                                </a>

                                            </div>

                                        </div>


                                    </div>
                                    <footer style={{ marginTop: "1.3em" }}>
                                        <p>Price Range: {character.price_range}</p>
                                        <br></br>
                                        <p>Availability: {character.availability}</p>
                                    </footer>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}


        </div>
    );
}
