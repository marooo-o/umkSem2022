import React, { useEffect, useState } from "react";
import Header from "../components/header";
import { instance } from "../configuration/axiosInstance";
import { useNavigate } from "react-router-dom";
import { eraseCookie, getCookie } from "../configuration/cookieExtension";
import AllNews from "../components/AllNews/AllNews";
import AddNews from "../components/AddNews";

const MainPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const Auth = getCookie("Authorization");
    instance
      .get("/user", {
        headers: {
          Authorization: Auth,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);
  const logout = () => {
    eraseCookie("Authorization");
    navigate("/login");
  };

  return (
    <div>
      <Header title={"Strona główna"} />
      <button onClick={logout} type="button">
        Wyloguj
      </button>
      <AddNews />
      <hr />
      <AllNews user={user} />
    </div>
  );
};

export default MainPage;
