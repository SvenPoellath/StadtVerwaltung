import React, { useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Report from "../../globalVariables/Report.js";
import axios from "axios";
import { useCookies } from "react-cookie";

/**
 * Displays Description Page, sets Description and Uploads a Picture if it is needed
 * @returns Description Page
 */
export default function Description() {
  const [cookies, setCookie] = useCookies(["description", "pictureID"]);
  const [image, setImage] = useState(null);

  //Creates Popup when user tries to reload the page to make the user aware that is might have consequences
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setCookie("description", data.description, { path: "/" });
    Report.description = data.description;
    console.log("Data is stored in Cookies and Global Variables");
    console.log("Description: " + Report.description);
    navigate("/form");
  };
  //Sets image Variable
  const fileSelectedHandler = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const uploadImage = () => {
    if (image != null) {
      console.log("ist passiert");
      let formData = new FormData();
      formData.append("imageFile", image);

      axios
        .post("http://localhost:8080/image", formData)
        .then(function (response) {
          console.log(response.data);
          setCookie("pictureID", response.data, { path: "/" });
          Report.pictureID = response.data;
          alert("Upload Erfolgreich");
        })
        .catch(function (error) {
          alert(error);
        });
    } else {
      alert(
        "Bitte wählen Sie zuerst ein Bild aus bevor Sie auf Hochladen Klicken"
      );
    }
  };
  return (
    <div className="Container">
      <img src="icons/Stage 3.png" className="img-header" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table className="map-table">
          <thead>
            <tr>
              <td>
                <label className="label Beschreibung-Text">
                  Beschreiben Sie den Mängel*
                </label>
              </td>
              <label className="label">
                Sie können auch ein Bild hinzufügen
              </label>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <textarea
                  {...register("description", {
                    pattern: /^[a-zA-Z0-9äöüÄÖÜß.,:;!?() -]*$/,
                  })}
                  type="textarea"
                  className="textbox Beschreibung-TextBox"
                  placeholder="Beschreibung"
                  required={true}
                />
              </td>
              <td>
                <input
                  name="Bild auswählen"
                  type="file"
                  onChange={fileSelectedHandler}
                />
                <input
                  type="button"
                  style={{
                    background: "white",
                    padding: 0,
                    borderRadius: "5px",
                  }}
                  value="Hochladen"
                  onClick={uploadImage}
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
