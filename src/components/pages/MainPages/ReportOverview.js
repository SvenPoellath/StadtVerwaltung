import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import "./ReportOverview.css";
import Employee from "../../globalVariables/Employee";
import Citizen from "../../globalVariables/Citizen";
import Report from "../../globalVariables/Report";
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
export default function ReportOverview() {
  var loadReportsRequest = new XMLHttpRequest();
  loadReportsRequest.open("GET", "http://localhost:8080/reports", false);
  loadReportsRequest.send();
  var popup;
  const [isPopup, setPopup] = useState(false);
  const togglePopup = () => setPopup(!isPopup);
  const data = React.useMemo(
    () => JSON.parse(loadReportsRequest.responseText),
    []
  );
  const options = [
    { value: "Bearbeitet", label: "Bearbeitet" },
    { value: "Unbearbeitet", label: "Unbearbeitet" },
    { value: "In Bearbeitung", label: "In Bearbeitung" },
  ];
  const popupHandler = (rowProps) => {
    console.log(rowProps);
    Report.id = rowProps.reportID;
    Report.kindOfReport = rowProps.kindOfReport;
    Report.status = rowProps.status;
    Report.description = rowProps.description;
    Report.latitude = rowProps.latitude;
    Report.longitude = rowProps.longitude;
    Citizen.firstName = rowProps.citizen.citizenFirstName;
    Citizen.lastName = rowProps.citizen.citizenLastName;
    Citizen.mailAddress = rowProps.citizen.citizenEmailAddress;
    Citizen.phoneNumber = rowProps.citizen.citizenPhoneNumber;
    togglePopup();
  };
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
        placeholder={`Search ${count} records...`}
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

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10);
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
                      border: "solid 2px black",
                      padding: "10px",
                      width: "500px",
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
            <tr>
              <th
                colSpan={visibleColumns.length}
                style={{
                  textAlign: "left",
                  padding: "10px",
                }}
              ></th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  onClick={() => popupHandler(row.original)}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          border: "solid 2px black",
                          padding: "10px",
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
                      options={options}
                      defaultValue={{ value: "one", label: Report.status }}
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
                  <td>(comment)</td>
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
                    <label className="dataEntry">{Citizen.firstName}</label>
                  </td>
                  <td>
                    <label className="dataEntry">{Citizen.lastName}</label>
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
                    <label className="dataEntry">{Citizen.mailAddress}</label>
                  </td>
                  <td>
                    <label className="dataEntry">{Citizen.phoneNumber}</label>
                  </td>
                </tr>
                <button className="btns" onClick={togglePopup}>
                  close
                </button>
              </table>
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
