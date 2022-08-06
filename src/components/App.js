import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

import UserContext from "../contexts/UserContext";
import PrivatePage from "./PrivatePage";

import Today from "./Today";
import Habits from "./Habits";

export default function App() {
    const [todayDone, setTodayDone] = useState("");

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <UserContext.Provider value={{ setTodayDone }} >
                            <Signin />
                        </UserContext.Provider>
                    } />

                    <Route path="/signup" element={<Signup />} />

                    <Route path="/today" element={
                        <UserContext.Provider value={{ todayDone }} >
                            <PrivatePage>
                                <Today />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                    <Route path="/habits" element={
                        <UserContext.Provider value={{ todayDone }} >
                            <PrivatePage>
                                <Habits />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                </Routes>
            </BrowserRouter>
        </>
    );
}