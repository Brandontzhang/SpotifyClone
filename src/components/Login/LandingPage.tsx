import { useEffect, useState } from "react"
import { LoginPage } from "./LoginPage";
import { TokenContext } from "../../context/TokenContext";
import { MainPage } from "../MainPage";

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
        <TokenContext.Provider value={{token : token, setToken : setToken}}>
            <div className="bg-background300 h-screen">
                { (token === '') ? <LoginPage /> : <MainPage />}
            </div>
        </TokenContext.Provider>
    )

}