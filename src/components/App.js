import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

import UserContext from "../contexts/UserContext";
import PrivatePage from "./PrivatePage";

import Today from "./Today";
import Habits from "./Habits";
import History from "./History";

import { useState } from "react";

export default function App() {
    const [userData, setUserData] = useState("");
    const [daylieDone, setDaylieDone] = useState(0);

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
                        <UserContext.Provider value={{ userData, daylieDone, setDaylieDone }} >
                            <PrivatePage>
                                <Today />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                    <Route path="/habits" element={
                        <UserContext.Provider value={{ userData, daylieDone, setDaylieDone }} >
                            <PrivatePage>
                                <Habits />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                    <Route path="/history" element={
                        <UserContext.Provider value={{ userData, daylieDone }} >
                            <PrivatePage>
                                <History />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                </Routes>
            </BrowserRouter>
        </>
    );
}