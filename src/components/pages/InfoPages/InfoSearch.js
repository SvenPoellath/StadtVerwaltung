import Search from "react-leaflet-search/lib";
import Report from "../../globalVariables/Report";
import Comment from "../../globalVariables/Comment";
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
    console.log(postRequest.responseText);
    var response = JSON.parse(postRequest.responseText);
    Report.comment = response.comment;
    Report.id = response.reportID;
    Report.kindOfReport = response.kindOfReport;
    Report.status = response.status;
    Report.description = response.description;
    Report.latitude = response.latitude;
    Report.longitude = response.longitude;
    navigate("/searchresult");
  };
  return (
    <div className="InfoPage-container">
      <form onSubmit={handleSubmit(searchReport)}>
        <table className="InfoPage-Text">
          <tr>
            <th>
              <h1>Fall Suche</h1>
              <br></br>
            </th>
          </tr>
          <tr>
            <td>
              <p>
                Geben Sie die Fall ID ein die Sie Suchen möchen
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
              <input type="submit" value="Suchen" />
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
}

export default IdSearchPage;
