import { createContext } from "react";

const tokenDefaultValue = {
    token : "",
    setToken : (newToken : string) => {},
}

export const TokenContext = createContext(tokenDefaultValue);