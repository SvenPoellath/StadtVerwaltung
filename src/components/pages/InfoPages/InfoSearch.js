import Report from "../../globalVariables/Report";
import { useForm } from "react-hook-form";
import "./InfoPages.css";
import { useNavigate } from "react-router-dom";
function IdSearchPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const searchReport = (data) => {
    var postRequest = new XMLHttpRequest();
    var url = "http://localhost:8080/report?id=" + data.FallID;
    postRequest.open("GET", url, false);
    postRequest.setRequestHeader("content-type", "text/plain");
    postRequest.send(data.FallID);
    if (postRequest.status === 500) {
      alert("Wir haben keinen Fall mit dieser FallID gefunden");
    } else if (postRequest.status === 200) {
      var response = JSON.parse(postRequest.responseText);
      Report.comment = response.comment;
      Report.id = response.reportID;
      Report.kindOfReport = response.kindOfReport;
      Report.status = response.status;
      Report.description = response.description;
      Report.latitude = response.latitude;
      Report.longitude = response.longitude;
      navigate("/searchresult");
    } else {
      alert(
        "Hier ist wohl ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder Kontaktieren Sie unseren Support."
      );
    }
    console.log(postRequest.responseText);
  };
  return (
    <div className="InfoPage-container">
      <form onSubmit={handleSubmit(searchReport)}>
        <table className="InfoPage-Text">
          <thead>
            <tr>
              <th>
                <h1>Fall Suchen</h1>
                <br></br>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>
                  Geben Sie die Fall ID ein die Sie Suchen möchten
                  <br />
                  <br />
                  Ihre Fall ID:{" "}
                  <input
                    {...register("FallID", { required: true, maxLength: 20 })}
                    type="text"
                    placeholder="Fall ID"
                  />
                  <br />
                  <br />
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <input type="submit" value="Fall Suchen" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default IdSearchPage;
