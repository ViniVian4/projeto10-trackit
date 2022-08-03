import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

import TokenContext from "../contexts/TokenContext";
import Today from "./Today";

export default function App() {
    const [token, setToken] = useState("");

    return (
        <>
            <TokenContext.Provider value={{ token, setToken }} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/today" element={<Today />} />
                    </Routes>
                </BrowserRouter>
            </TokenContext.Provider>
        </>
    );
}