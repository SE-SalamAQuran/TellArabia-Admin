import { React, useState } from 'react';
import { Button, Drawer } from "@mui/material";

export default function DrawerMUI(props) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (anchor, act) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(act);
    };
    return (
        <div>
            <Button className={props.theme} onClick={toggleDrawer("right", true)}>{props.text}</Button>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer("right", false)}
            >
                <div style={{ width: "70%" }}>
                    <h3>{props.title}</h3>
                    <div style={{ marginTop: "1.5em" }}>
                        {props.component}

                    </div>
                </div>
            </Drawer>
        </div>
    )
}
