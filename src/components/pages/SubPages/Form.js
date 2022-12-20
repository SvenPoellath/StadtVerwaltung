import React from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Citizen from "../../globalVariables/Citizen";
import { useCookies } from "react-cookie";

/**
 * Displays Form Page, checks Data with tools fron react-hook-form and sets Citizen Data
 * @returns Form Page
 */
export default function Form() {
  const [cookies, setCookie] = useCookies([
    "citizenFirstName",
    "citizenLastName",
    "citizenEmailAddress",
    "citizenPhoneNumber",
  ]);

  //Creates Popup when user tries to reload the page to make the user aware that is might have consequences
  window.addEventListener("beforeunload", function (e) {
    navigate("/maps");
  });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  //After the Data was checked by Patterns and React-Hook-Forms it is stored for later use
  const onSubmit = (data) => {
    setCookie("citizenFirstName", data.firstName, { path: "/" });
    setCookie("citizenLastName", data.lastName, { path: "/" });
    setCookie("citizenEmailAddress", data.email, { path: "/" });
    setCookie("citizenPhoneNumber", data.phoneNumber, { path: "/" });
    Citizen.citizenFirstName = data.firstName;
    Citizen.citizenLastName = data.lastName;
    Citizen.citizenEmailAddress = data.email;
    Citizen.citizenPhoneNumber = data.phoneNumber;
    console.log("Data is stored in Cookies and Global Variables");
    console.log("Citizen Records: " + Citizen);
    navigate("/summary");
  };
  return (
    <div className="Container">
      <img src="icons/Stage 2.png" className="img-header" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <thead>
            <tr>
              <td>
                <h3 className="header">Kontakt Information</h3>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <label className="label">Vorname*</label>
              </td>
              <td>
                <label className="label">Nachname*</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  {...register("firstName", {
                    required: true,
                    maxLength: 20,
                    pattern: /^[A-Za-zÄÖÜäöüß]+$/,
                  })}
                  type="text"
                  className="textbox Vorname-TextBox"
                  placeholder="Vorname"
                />
              </td>
              <td>
                <input
                  {...register("lastName", {
                    required: true,
                    maxLength: 30,
                    pattern: /^[A-Za-zÄÖÜäöüß]+$/,
                  })}
                  type="text"
                  className="textbox Nachname-TextBox"
                  placeholder="Nachname"
                />
              </td>
            </tr>
            <tr>
              <td>
                <label className="label">E-Mail*</label>
              </td>
              <td>
                <label className="label">Telefonnummer</label>
              </td>
            </tr>
            <tr>
              <td>
                <input
                  {...register("email", {
                    required: true,
                    maxLength: 40,
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                  type="email"
                  className="textbox Email-TextBox"
                  placeholder="Email"
                  required={true}
                />
              </td>
              <td>
                <input
                  {...register("phoneNumber", {
                    maxLength: 14,
                    pattern: /^\+?49[\s.-]?\d{2,4}[\s.-]?\d{6,8}$/,
                  })}
                  type="tel"
                  className="textbox Telefonnummer-TextBox"
                  placeholder="Telefonnummer mit Vorwahl +49"
                />
              </td>
            </tr>
            <tr>(*)Pflichtfelder</tr>
            <tr>
              <input
                className="btns btn--outline"
                type="submit"
                value="Weiter"
              />
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
