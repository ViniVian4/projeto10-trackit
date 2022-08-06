import { useState, useEffect } from "react";

function useLocal() {
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("trackitUserData"));

    setUserData(data);
  }, []);

  return [userData, setUserData];
}

export { useLocal };