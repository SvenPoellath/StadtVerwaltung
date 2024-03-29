import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ReportOverview.css";
import { useCookies } from "react-cookie";
import Citizen from "../../globalVariables/Citizen.js";
import Report from "../../globalVariables/Report.js";
import { Map, TileLayer, Marker } from "react-leaflet";
import Select from "react-select";
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  defaultColumn,
  useAsyncDebounce,
  useFilters,
  useRowSelect,
  usePagination,
} from "react-table";
import { matchSorter } from "match-sorter";
/**
 * Loads all Reports and Show them in a Table
 * By clicking in a Row a popup shows which shows the indivitual Report
 * It allows to delete or alter a Report
 * Changes can be sent to the Backend
 * @returns ReportOverview Page
 */
export default function ReportOverview() {
  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET", "http://localhost:8080/reports", false);
  loadReportsRequest.send();
  const [imageResponseStatus, setImageResponseStatus] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [cookies, setCookie] = useCookies(["sessionID", "employeeID"]);
  const [isPopup, setPopup] = useState(false);
  const togglePopup = () => setPopup(!isPopup);
  const data = JSON.parse(loadReportsRequest.responseText);
  const options = [
    { value: "Bearbeitet", label: "Bearbeitet" },
    { value: "Unbearbeitet", label: "Unbearbeitet" },
    { value: "In Bearbeitung", label: "In Bearbeitung" },
  ];
  const deleteReport = (data) => {
    var deleteRequest = new XMLHttpRequest();
    deleteRequest.open(
      "DELETE",
      "http://localhost:8080/report?id=" + Report.id,
      false
    );
    deleteRequest.setRequestHeader("sessionID", cookies.sessionID);
    deleteRequest.setRequestHeader("employeeID", cookies.employeeID);
    deleteRequest.send();
    console.log("Request to delete Report has been send");
    console.log("ReportID: " + Report.id);
    if (deleteRequest.status === 200) {
      console.log("Report deleted");
      togglePopup();
    } else {
      alert(
        "Etwas ist schiefgelaufen bitte versuchen Sie es erneut oder kontaktieren Sie den Support"
      );
    }
  };
  const sendChanges = (data) => {
    var request = new XMLHttpRequest();
    if (data.comment !== "") {
      if (Report.comment !== null) {
        request.open(
          "PUT",
          "http://localhost:8080/comment?id=" + Report.id,
          false
        );
        request.setRequestHeader("sessionID", cookies.sessionID);
        request.setRequestHeader("employeeID", cookies.employeeID);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send(data.comment);
      } else {
        request.open(
          "POST",
          "http://localhost:8080/comment?id=" + Report.id,
          false
        );
        request.setRequestHeader("sessionID", cookies.sessionID);
        request.setRequestHeader("employeeID", cookies.employeeID);
        request.setRequestHeader("Content-Type", "text/plain");
        request.send(data.comment);
      }
      console.log("Request to change the Comment has been send");
    }
    var statusupdate = new XMLHttpRequest();
    statusupdate.open(
      "PUT",
      "http://localhost:8080/status?id=" + Report.id,
      false
    );
    statusupdate.setRequestHeader("sessionID", cookies.sessionID);
    statusupdate.setRequestHeader("employeeID", cookies.employeeID);
    statusupdate.send(status.label);
    console.log("Request to change Status has been send");
    console.log("ReportID: " + Report.id);
    console.log("Comment: " + data.comment);
    console.log("Report Status: " + status.label);
    Report.comment = data.comment;
    Report.status = status.label;
    if (
      (request.status === 200 || data.comment === "") &&
      statusupdate.status === 200
    ) {
      console.log("Requests were successful");
      togglePopup();
    } else {
      alert(
        "Etwas ist schiefgelaufen bitte versuchen Sie es erneut oder kontaktieren Sie den Support"
      );
    }
  };
  const popupHandler = (rowProps) => {
    console.log("Klick on Row detected");
    console.log("Data of klicked Row: " + rowProps);
    Report.id = rowProps.reportID;
    Report.kindOfReport = rowProps.kindOfReport;
    Report.status = rowProps.status;
    Report.description = rowProps.description;
    Report.latitude = rowProps.latitude;
    Report.longitude = rowProps.longitude;
    Report.comment = rowProps.comment;
    Report.pictureID = rowProps.pictureID;
    Citizen.citizenFirstName = rowProps.citizen.citizenFirstName;
    Citizen.citizenLastName = rowProps.citizen.citizenLastName;
    Citizen.citizenEmailAddress = rowProps.citizen.citizenEmailAddress;
    Citizen.citizenPhoneNumber = rowProps.citizen.citizenPhoneNumber;
    changeStatus({ value: Report.status, label: Report.status });
    const imageRequest = new XMLHttpRequest();
    imageRequest.responseType = "arraybuffer";
    imageRequest.open(
      "GET",
      "http://localhost:8080/image?id=" + Report.pictureID
    );
    console.log("Image Request has been send");
    imageRequest.onload = function () {
      console.log("Server response: " + imageRequest.response);
      setImageData(imageRequest.response);
      if (imageRequest.status === 200) {
        console.log("Image Request was successful");
        setImageResponseStatus(true);
      } else {
        setImageResponseStatus(false);
      }
    };
    imageRequest.send();
    console.log(imageRequest.status);
    console.log("ImageData before creating blob: " + imageData);
    const blob = new Blob([imageData], { type: "image/jpeg" });
    console.log("Created blob: " + blob);
    setImageURL(URL.createObjectURL(blob));
    console.log("Created imageURL: " + imageURL);
    togglePopup();
  };
  const [status, changeStatus] = useState(Report.status);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "reportID", // accessor is the "key" in the data
      },
      {
        Header: "Schadensart",
        accessor: "kindOfReport",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Beschreibung",
        accessor: "description",
      },
      {
        Header: "Telefonnummer",
        accessor: "citizen.citizenPhoneNumber",
      },
      {
        Header: "E-Mailadresse",
        accessor: "citizen.citizenEmailAddress",
      },
      {
        Header: "Nachname",
        accessor: "citizen.citizenLastName",
      },
    ],
    []
  );
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder={`Filtern`}
        style={{
          width: "70px",
          borderRadius: "10px",
          paddingLeft: "5px",
        }}
      />
    );
  }

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }
  fuzzyTextFilterFn.autoRemove = (val) => !val;
  function GlobalFilter({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);

    return (
      <span>
        Search:{" "}
        <input
          value={value || ""}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={`${count} records...`}
          style={{
            fontSize: "1.1rem",
            border: "0",
            borderRadius: "10px",
          }}
        />
      </span>
    );
  }
  function Table({ columns, data }) {
    const filterTypes = React.useMemo(
      () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
          return rows.filter((row) => {
            const rowValue = row.values[id];
            return rowValue !== undefined
              ? String(rowValue)
                  .toLowerCase()
                  .startsWith(String(filterValue).toLowerCase())
              : true;
          });
        },
      }),
      []
    );

    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    );

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      prepareRow,
      state,
      state: { selectedRowIds, pageIndex, pageSize },
      visibleColumns,
      preGlobalFilteredRows,
      setGlobalFilter,
      selectedFlatRows,
    } = useTable(
      {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
      },
      useFilters, // useFilters!
      useGlobalFilter, // useGlobalFilter!
      usePagination,
      useRowSelect
    );
    const changeBackground = () => {};
    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 100);
    const { register, handleSubmit } = useForm();
    return (
      <>
        <table {...getTableProps()} className="overview-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      padding: "10px",
                      borderRadius: "5px",
                    }}
                  >
                    {column.render("Header")}
                    <div>
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="reportOverviewBody" {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => popupHandler(row.original)}
                  style={{
                    boxShadow: "0 0 3px #ddd",
                    borderRadius: "20px",
                  }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="overview-row"
                        {...cell.getCellProps()}
                        style={{
                          padding: "5px",
                          borderRadius: "20px",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {isPopup ? (
          <div className="popup">
            <div className="popup_inner">
              <form onSubmit={handleSubmit(sendChanges)}>
                <table>
                  <thead>
                    <tr>
                      <th>
                        <h2>Zusammenfassung</h2>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <label>Fall ID</label>
                      </td>
                      <td>
                        <label>Status</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dataEntry">{Report.id}</label>
                      </td>
                      <td>
                        <Select
                          onChange={(choice) => changeStatus(choice)}
                          //onChange={(e) => changeStatus(e.target.value)}
                          options={options}
                          defaultValue={status}
                          theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                              primary25: "black",
                              primary: "black",
                              neutral0: "grey",
                            },
                          })}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Map
                          className="summaryMap"
                          center={[Report.latitude, Report.longitude]}
                          zoom={13}
                          style={{ height: "200px" }}
                        >
                          <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                          <Marker
                            position={[Report.latitude, Report.longitude]}
                          >
                            <Popup>Ihre Standort-Angabe</Popup>
                          </Marker>
                        </Map>
                      </td>
                      <td>
                        {imageResponseStatus ? (
                          <img
                            src={imageURL}
                            alt="img"
                            width="500px"
                            height="400px"
                          />
                        ) : (
                          <label></label>
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="label Beschreibung-Text">
                          Beschreibung
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dataEntry">
                          {Report.description}
                        </label>
                      </td>
                      <td>
                        <textarea
                          {...register("comment")}
                          type="textarea"
                          className="textbox Vorname-TextBox"
                          defaultValue={Report.comment}
                        ></textarea>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h3 className="header">Kontaktinformation</h3>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="label">Vorname</label>
                      </td>
                      <td>
                        <label className="label">Nachname</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dataEntry">
                          {Citizen.citizenFirstName}
                        </label>
                      </td>
                      <td>
                        <label className="dataEntry">
                          {Citizen.citizenLastName}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="label">E-Mail</label>
                      </td>
                      <td>
                        <label className="label">Telefonnummer</label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="dataEntry">
                          {Citizen.citizenEmailAddress}
                        </label>
                      </td>
                      <td>
                        <label className="dataEntry">
                          {Citizen.citizenPhoneNumber}
                        </label>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          className="btns btn--outlin btn--medium"
                          onClick={togglePopup}
                        >
                          Schließen
                        </button>
                      </td>
                      <td>
                        <input
                          className="btns btn--outline btn--medium"
                          type="submit"
                          value="Speichern"
                        />
                      </td>
                      <td>
                        <button
                          className="btns btn--outline btn--medium"
                          onClick={handleSubmit(deleteReport)}
                        >
                          Löschen
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
          </div>
        ) : null}
      </>
    );
  }

  return (
    <div className="Overview-Page">
      <Table columns={columns} data={data} />
    </div>
  );
}
