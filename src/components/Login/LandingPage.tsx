import { useEffect, useState } from "react"
import { WebPlayback } from "../SpotifyPlayer/WebPlayback";
import { LoginWidget } from "./LoginPage";

export const LoginPage = () => {

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
        <div>
             { (token === '') ? <LoginWidget/> : <WebPlayback token={token} getOAuthToken={getOAuthToken} /> }
        </div>
    )

}