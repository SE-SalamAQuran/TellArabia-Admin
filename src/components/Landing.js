import { React, useEffect } from 'react';
import FakeSuspense from './FakeSuspense';
import { CircularProgress } from '@mui/material';
import Login from './Login';
import background from "../Images/background.PNG";

export default function Landing() {
    function isLogged() {
        return JSON.parse(sessionStorage.getItem("user")) == null ? false : true;
    }
    useEffect(() => {
        if (isLogged()) {
            window.location = '/home';
        }
    })
    return (
        <div
            style={{
                backgroundImage: `url(${background})`,
                backgroundPosition: 'top',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
                color: 'white'
            }}
        >
            <img
                style={{ display: 'flex', float: 'flex-end' }}
                src="https://img.icons8.com/pastel-glyph/60/ffffff/user-lock.png"
                alt="lock"
            />
            <div style={{ margin: "6.8rem auto auto auto", width: "40%", padding: "10px" }}>
                <FakeSuspense delay={1700} fallback={<CircularProgress color="inherit" />}>
                    <Login />
                </FakeSuspense>
            </div>
        </div>

    )
}
