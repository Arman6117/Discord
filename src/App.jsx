import React from "react";
import Header from "./Components/Header/Header";
import Hero from "./Components/Hero/Hero";
import Home from "./Components/Home/Home";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
} from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Hero />
              </div>
            }
          />
          <Route
          path="/channels"
          element=<Home />
          />
          <Route
          path="/channels/:id"
          element={<Home />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
