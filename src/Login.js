import React, { useState } from "react";

export const Login = ({ getAuth }) => {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    password: "",
    error: ""
  });

  const handleChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value,
      error: ""
    }));
  };

  const handleSubmit = () => {
    if (userInfo.userName === "shaadi" && userInfo.password === "123") {
      return getAuth(prevState => ({
        ...prevState,
        page: "first",
        authState: true,
        userInfo: { ...prevState.userInfo, name: userInfo.userName }
      }));
    }
    setUserInfo(prevState => ({
      ...prevState,
      error: "Username or Password invalid"
    }));
  };
  return (
    <div className="h-500">
      <div className="d-flex justify-content-center">
        <div className="card w-300">
          <div className="card-body">
            <h5 className="card-title">Login</h5>
            <div className="card-text">
              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Username
                  </span>
                </div>
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>

              <div className="input-group input-group-sm mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="inputGroup-sizing-sm">
                    Password
                  </span>
                </div>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                />
              </div>
              <div>{userInfo.error}</div>
              <input
                type="submit"
                className="form-control"
                onClick={handleSubmit}
                value="Submit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
