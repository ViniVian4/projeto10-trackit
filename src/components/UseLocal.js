import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function useLocal() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trackitUserData"));

    if (!data) {
      navigate("/");
    }

    setUserData(data);
  }, []);

  return [userData, setUserData];
}

export { useLocal };