import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import UpdateNews from "./presentation/pages/UpdateNews";
import { instanceNews } from "./presentation/configuration/axiosInstance";
import LoginPage from './presentation/pages/login_page';
import MainPage from './presentation/pages/main_page';
import {getCookie} from './presentation/configuration/cookieExtension'

export const NewsContext = React.createContext({
  newses: [],
  setNewses: (data) => {},
});

const App = () => {
  const [newses, setNewses] = useState([]);


  useEffect(() => {
    instanceNews
      .get("/all")
      .then((res) => {
        setNewses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <NewsContext.Provider value={{ newses, setNewses }}>
      <Router>
        <Switch>
          {/* Public pages */}
          <Route path="/login" element={<LoginPage />} />

          {/* User account */}
          <Route path="/home" element={<MainPage />} />
          {/* update news */}
          <Route path="/news/edit" element={<UpdateNews />} />
        </Switch>
      </Router>
    </NewsContext.Provider>
  );
}

export default App;
