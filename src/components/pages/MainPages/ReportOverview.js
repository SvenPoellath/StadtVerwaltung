import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./ReportOverview.css";
import { useCookies } from "react-cookie";
import Employee from "../../globalVariables/Employee";
import Citizen from "../../globalVariables/Citizen";
import Report from "../../globalVariables/Report";
import Comment from "../../globalVariables/Comment";
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
import Session from "../../globalVariables/Session";
export default function ReportOverview() {
  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET", "http://localhost:8080/reports", false);
  loadReportsRequest.send();
  const [cookies, setCookie] = useCookies(["sessionID", "employeeID"]);
  const [isPopup, setPopup] = useState(false);
  const togglePopup = () => setPopup(!isPopup);
  const data = JSON.parse(loadReportsRequest.responseText);
  const options = [
    { value: "Bearbeitet", label: "Bearbeitet" },
    { value: "Unbearbeitet", label: "Unbearbeitet" },
    { value: "In Bearbeitung", label: "In Bearbeitung" },
  ];
  const sendChanges = (data) => {
    console.log(data.comment);
    console.log(Session.token);
    var request = new XMLHttpRequest();
    if (Report.comment != "") {
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
    console.log(request.responseText);
    var statusupdate = new XMLHttpRequest();
    statusupdate.open(
      "PUT",
      "http://localhost:8080/status?id=" + Report.id,
      false
    );
    statusupdate.setRequestHeader("sessionID", cookies.sessionID);
    statusupdate.setRequestHeader("employeeID", cookies.employeeID);
    statusupdate.send(status.label);
    console.log(statusupdate.responseText);
    Report.comment = data.comment;
    Report.status = status.label;
    togglePopup();
  };
  const popupHandler = (rowProps) => {
    console.log("hallo");
    console.log(cookies.sessionID);
    console.log(rowProps);
    Report.id = rowProps.reportID;
    Report.kindOfReport = rowProps.kindOfReport;
    Report.status = rowProps.status;
    Report.description = rowProps.description;
    Report.latitude = rowProps.latitude;
    Report.longitude = rowProps.longitude;
    Report.comment = rowProps.comment;
    Citizen.citizenFirstName = rowProps.citizen.citizenFirstName;
    Citizen.citizenLastName = rowProps.citizen.citizenLastName;
    Citizen.citizenEmailAddress = rowProps.citizen.citizenEmailAddress;
    Citizen.citizenPhoneNumber = rowProps.citizen.citizenPhoneNumber;
    console.log(Report);
    changeStatus({ value: Report.status, label: Report.status });
    console.log(status);
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
          <tbody {...getTableBodyProps()}>
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
                  <tr>
                    <th>
                      <h2>Zusammenfassung</h2>
                    </th>
                  </tr>
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
                        <Marker position={[Report.latitude, Report.longitude]}>
                          <Popup>Ihre Standort-Angabe</Popup>
                        </Marker>
                      </Map>
                    </td>
                    <td>"(image)"</td>
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
                      <label className="dataEntry">{Report.description}</label>
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
                      <h3 className="header">Kontakt Information</h3>
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
                        className="btns btn--outline"
                        onClick={togglePopup}
                      >
                        Schließen
                      </button>
                    </td>
                    <td>
                      <input
                        className="btns btn--outline"
                        type="submit"
                        value="Speichern"
                      />
                    </td>
                  </tr>
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
