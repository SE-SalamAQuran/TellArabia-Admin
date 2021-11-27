import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language'; //Website Icon
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function UserCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                        {props.name.match(/\b(\w)/g).join(' ')}
                    </Avatar>
                }

                title={props.name}
                subheader={props.phone}
            />
            <CardMedia
                component="img"
                height="194"
                image={props.image || "https://firebasestorage.googleapis.com/v0/b/tellarabia-e4031.appspot.com/o/App%20Images%2Fmockup.jpg?alt=media&token=3a7a8dc4-1126-4b54-8210-3695a24f51df"}
                alt="User Avatar"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    Language: {props.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton href={props.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                    <FacebookIcon />
                </IconButton>
                <IconButton href={props.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                    <TwitterIcon />
                </IconButton>
                <IconButton href={props.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <LinkedInIcon />
                </IconButton>
                <IconButton href={props.website} target="_blank" rel="noreferrer" aria-label="Website">
                    <LanguageIcon />
                </IconButton>


                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>Freelancer Details:</Typography>
                    <Typography paragraph>
                        {props.details}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}
