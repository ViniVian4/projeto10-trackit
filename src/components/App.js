import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";

import UserContext from "../contexts/UserContext";
import PrivatePage from "./PrivatePage";

import Today from "./Today";
import Habits from "./Habits";
import { useLocal } from "./UseLocal";

export default function App() {
    const [userData, setUserData] = useLocal();

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
                            <PrivatePage>
                                <Today />
                            </PrivatePage>
                        </UserContext.Provider>
                    } />

                    <Route path="/habits" element={
                        <UserContext.Provider value={{ userData }} >
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