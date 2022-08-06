import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

import UserContext from "../contexts/UserContext";

import Today from "./Today";
import Habits from "./Habits";

export default function App() {
    const [userData, setUserData] = useState("");

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <UserContext.Provider value={{ setUserData }} >
                            <Signin />
                        </UserContext.Provider>
                    } />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/today" element={
                        <UserContext.Provider value={{ userData }} >
                            <Today />
                        </UserContext.Provider>
                    } />

                    <Route path="/habits" element={
                        <UserContext.Provider value={{ userData }} >
                            <Habits />
                        </UserContext.Provider>
                    } />

                </Routes>
            </BrowserRouter>
        </>
    );
}