import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import Session from "../../globalVariables/Session";
import { useNavigate } from "react-router-dom";
import Employee from "../../globalVariables/Employee";
import { useCookies } from "react-cookie";

export default function Login() {
  const [cookies, setCookie, removeCookies] = useCookies([
    "sessionID",
    "session",
    "employeeID",
  ]);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
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
    if (postRequest.responseText != null) {
      Employee.id = data.username;
      Session.token = postRequest.responseText;
      Session.isSet = true;
      removeCookies("sessionID");
      setCookie("session", true, { path: "/" });
      setCookie("sessionID", Session.token, { path: "/" });
      setCookie("employeeID", Employee.id, { path: "/" });
      console.log(cookies.employeeID);
      console.log(cookies.sessionID);
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
