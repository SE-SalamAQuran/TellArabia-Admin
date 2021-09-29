import { React, useState } from 'react';
import { Button, Drawer } from "@mui/material";

export default function DrawerMUI(props) {
    const [open, setOpen] = useState(false);

    function capitalizeTheFirstLetterOfEachWord(words) {
        var separateWord = words.toLowerCase().split(' ');
        for (var i = 0; i < separateWord.length; i++) {
            separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
                separateWord[i].substring(1);
        }
        return separateWord.join(' ');
    }

    const toggleDrawer = (anchor, act) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(act);
    };
    return (
        <div>
            <Button style={{
                display: "block",
                margin: '0 auto',
            }} className={props.theme} onClick={toggleDrawer(props.anchor, true)}>{capitalizeTheFirstLetterOfEachWord(props.text)}</Button>

            <Drawer
                anchor={props.anchor}
                open={open}
                onClose={toggleDrawer(props.anchor, false)}
            >
                <div style={{ marginRight: "1em", marginLeft: "1em", width: "100%" }}>
                    <h3 style={{ marginTop: "1em" }}>{props.title}</h3>
                    <hr />
                    <div style={{ marginTop: "1.5em" }}>
                        {props.component}

                    </div>
                </div>
            </Drawer>
        </div>
    )
}
