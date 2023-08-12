import { createContext } from "react";

const tokenDefaultValue = {
    token : "",
    setToken : (_newToken : string) => {},
}

export const TokenContext = createContext(tokenDefaultValue);