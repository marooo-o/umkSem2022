import React from 'react'
import { BrowserRouter as Router, Routes as Switch, Route } from "react-router-dom";
import LoginPage from './presentation/pages/login_page';
import MainPage from './presentation/pages/main_page';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* Public pages */}
        <Route path="/" element={<LoginPage />} />

        {/* User account */}
        <Route path="/home" element={<MainPage />} />

      </Switch>
    </Router>
  );
}

export default App;
