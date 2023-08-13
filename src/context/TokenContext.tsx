import { createContext } from "react";

const tokenDefaultValue = {
    sideNav : true,
    setSideNav : (newState : boolean) => {},

    token : "",
    setToken : (_newToken : string) => {},
}

export const TokenContext = createContext(tokenDefaultValue);