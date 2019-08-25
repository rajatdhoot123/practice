import React, { useState, useEffect } from "react";
import { Login } from "./Login";
import { First } from "./First";
import { Navbar } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = ({
  authInfo: {
    authState,
    userInfo: { name }
  }
}) => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src="https://img2.shaadi.com/assests/2016/images/home-logo.png"
            width="125"
            height="42"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        {!!name && (
          <>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{name}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </>
        )}
      </Navbar>
    </>
  );
};

function App() {
  const [auth, authInfo] = useState({
    authState: false,
    page: "home",
    userInfo: { name: "" }
  });

  useEffect(() => {
    if (auth.authState) {
      authInfo(prevState => ({
        ...prevState,
        page: "first"
      }));
    }
  }, [auth.authState]);

  const getComponent = page => {
    switch (page) {
      case "home":
        return <Login getAuth={authInfo} />;
      case "first":
        return <First />;
      default:
        return <Login getAuth={authInfo} />;
    }
  };
  return (
    <div className="App">
      <Header authInfo={auth} />
      {getComponent(auth.page)}
    </div>
  );
}

export default App;
