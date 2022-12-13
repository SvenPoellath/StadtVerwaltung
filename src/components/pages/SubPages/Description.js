import React, { useState } from "react";
import "./Form.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Report from "../../globalVariables/Report";
import File from "../../globalVariables/File";
import Summary from "./Summary";
import axios from "axios";
export default function Description() {
  const [image, setImage] = useState(null);
  window.addEventListener("beforeunload", function (e) {
    e.preventDefault();
  });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    Report.description = data.description;
    navigate("/form");
  };
  const fileSelectedHandler = (event) => {
    var fileToSend;
    if (event.target.files && event.target.files[0]) {
      fileToSend = event.target.files[0];
    }

    let formData = new FormData();
    formData.append("imageFile", fileToSend);

    axios
      .post("http://localhost:8080/image", formData)
      .then(function (response) {
        console.log(response.data);
        Report.pictureID = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="Container">
      <img src="icons/Stage 3.png" className="img-header" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <table>
          <tr>
            <td>
              <label className="label Beschreibung-Text">
                Beschreiben Sie den Mängel*
              </label>
            </td>
            <label className="label">Sie können auch ein Bild hinzufügen</label>
          </tr>
          <tr>
            <td>
              <textarea
                {...register("description", {
                  pattern: /^[a-zA-ZäöüÄÖÜß.,:;!?()-]*$/,
                })}
                type="textarea"
                className="textbox Beschreibung-TextBox"
                placeholder="Beschreibung"
                required={true}
              />
            </td>
            <td>
              <input type="file" onChange={fileSelectedHandler} />
            </td>
          </tr>
          <tr>(*)Pflichtfelder</tr>
          <tr>
            <input type="submit" value="Weiter" />
          </tr>
        </table>
      </form>
    </div>
  );
}
