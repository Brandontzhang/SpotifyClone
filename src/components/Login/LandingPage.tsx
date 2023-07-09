import { useEffect, useState } from "react"
import { WebPlayback } from "../SpotifyPlayer/WebPlayback";
import { LoginPage } from "./LoginPage";

export const LandingPage = () => {

    const [token, setToken] = useState('');

    const getOAuthToken = async() => {
        const response = await fetch('http://localhost:5000/auth/token');
        const json = await response.json();

        setToken(json.access_token);
    }

    useEffect(() => {
        getOAuthToken();
    }, [])

    return (
        <div className="bg-backgroundDark h-screen w-screen">
             { (token === '') ? <LoginPage /> : <WebPlayback token={token} getOAuthToken={getOAuthToken} /> }
        </div>
    )

}