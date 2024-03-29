import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import Session from "../../globalVariables/Session.js";
import { useNavigate } from "react-router-dom";
import Employee from "../../globalVariables/Employee.js";
import { useCookies } from "react-cookie";

/**
 * Displays Login Page and sets cookies for Session Control
 * @returns Login Page
 */
export default function Login() {
  const [cookies, setCookie, removeCookies] = useCookies([
    "sessionID",
    "session",
    "employeeID",
  ]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  // Does Login
  const onSubmit = (data) => {
    const anmeldedaten = {
      employeeID: data.username,
      password: data.password,
    };
    console.log(JSON.stringify(anmeldedaten));
    var postRequest = new XMLHttpRequest();
    postRequest.open("POST", "http://localhost:8080/doLogin", false);
    postRequest.setRequestHeader("content-type", "application/json");
    postRequest.send(JSON.stringify(anmeldedaten));
    console.log("Response from Server: " + postRequest.responseText);
    if (postRequest.status === 200) {
      console.log("Login was successful");
      Employee.id = data.username;
      Session.token = postRequest.responseText;
      Session.isSet = true;
      removeCookies("sessionID");
      setCookie("session", true, { path: "/" });
      setCookie("sessionID", Session.token, { path: "/" });
      setCookie("employeeID", Employee.id, { path: "/" });
      console.log("SessionID for verification is Stored in Cookies");
      console.log("EmployeeID of Logged in Employee: " + cookies.employeeID);
      navigate("/reportoverview");
    } else {
      alert("Wrong Password or Username");
    }
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit(onSubmit)}>
        <table className="Auth-form-content">
          <tr>
            <th>
              <h3 className="Auth-form-title">Mitarbeiter Login</h3>
            </th>
          </tr>
          <tr className="form-group mt-3">
            <td>
              <label>UserID</label>
            </td>
            <td>
              <input
                {...register("username", { required: true, maxLength: 20 })}
                type="username"
                className="form-control mt-1"
                placeholder="UserID eingeben"
              />
            </td>
          </tr>
          <tr className="form-group mt-3">
            <td>
              <label>Passwort</label>
            </td>
            <td>
              <input
                {...register("password", { required: true, maxLength: 20 })}
                type="password"
                className="form-control mt-1"
                placeholder="Passwort eingeben"
              />
            </td>
          </tr>
          <div className="d-grid gap-2 mt-3">
            <input
              type="submit"
              className="btn btn-primary btn--medium btn-login"
              value="Anmelden"
            />
          </div>
        </table>
      </form>
    </div>
  );
}
