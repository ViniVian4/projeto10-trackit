import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

import UserContext from "../contexts/UserContext";
import Today from "./Today";

export default function App() {
    const [tokenValue, setToken] = useState("");
    const [imageURL, setImage] = useState("");

    return (
        <>
            <UserContext.Provider value={{ token :[tokenValue, setToken], image: [imageURL, setImage] }} >
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/today" element={<Today />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </>
    );
}