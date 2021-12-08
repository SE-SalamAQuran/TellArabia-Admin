import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function StudentComplaintsAccordion(props) {
    const [expanded, setExpanded] = React.useState(false);
    const complaints = props.complaints;

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    function changeBadgeColor(status) {
        if (status === "Pending") {
            return "badge badge-secondary";
        } else if (status === "In Progress") {
            return "badge badge-info";
        } else if (status === "Closed") {
            return "badge badge-danger";
        } else if (status === "Resolved") {
            return "badge badge-success"
        }
    }

    const PlaceHolder = () => {
        return (
            <div style={{ textAlign: "center" }}>
                <p>No complaints from this user</p>
            </div>
        )
    }

    const Complaints = () => {
        return (
            <div>
                {
                    complaints.map((character) => {
                        return (
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                >
                                    <Typography sx={{ width: '33%', flexShrink: 0 }}>

                                        <span className={changeBadgeColor(character.status)}>{character.status}</span>
                                    </Typography>
                                    <Typography sx={{ color: 'text.secondary' }}>{character.date} </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col">
                                                    <p>Complaint Details</p>
                                                    <br></br>
                                                    <ul className="list-group">
                                                        <li className="list-group-item">{character['details']}</li>
                                                    </ul>
                                                </div>
                                            </div>

                                        </div>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        );
                    })

                }
            </div>
        )

    }



    return (
        <div style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            {complaints.length === 0 ? <PlaceHolder /> : <Complaints />}

        </div>
    )
}
