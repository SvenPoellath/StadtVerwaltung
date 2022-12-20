import Report from "../../globalVariables/Report";
import "../InfoPages/InfoPages.css";
/**
 * Contains useful Information including the ReportID of the previously created Report
 * @returns IdInfoPage
 */
function IdInfoPage() {
  return (
    <div className="InfoPage-container">
      <table className="InfoPage-Text">
        <tr>
          <th>
            <h1>Wichtige Information</h1>
            <br></br>
          </th>
        </tr>
        <tr>
          <td>
            <p>
              Wenn Sie Ihren Fall und damit alle Informationen die Sie uns
              gegeben haben noch einmal aufrufen wollen oder nachsehen möchten
              ob dieser schon bearbeitet wurde, können Sie die folgende Fall ID
              im Bereich "Fall Suchen" eingeben.
              <br />
              <br />
              Ihre Fall ID: {Report.id}
              <br />
              <br />
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={window.print}>Seite Drucken</button>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default IdInfoPage;
