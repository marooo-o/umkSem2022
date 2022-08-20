import React, {useEffect} from 'react';
import Header from "../components/header";
import instance from '../configuration/axiosInstance';
import {getCookie, eraseCookie} from '../configuration/cookieExtension'
import { useNavigate } from 'react-router-dom';


const MainPage = () => {

  const navigate = useNavigate();

  useEffect(() => {
      var Auth = getCookie("Authorization")
      instance.get('/user', {
        headers: {
          'Authorization': Auth
        }
    }).then( res => { 
            console.log(res) 
    })
    .catch( err => { 
      console.log(err.response)
    })
  }, []);

  const logout = () => {
    eraseCookie("Authorization")
    navigate("/")
  }


  return (
    <div>
      <Header title={"Strona główna"} />
      <button onClick={logout} type="button">
          Wyloguj
      </button>
    </div>
  );
}

export default MainPage;