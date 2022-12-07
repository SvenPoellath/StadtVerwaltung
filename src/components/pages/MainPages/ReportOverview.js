import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import "./ReportOverview.css";
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
  const defaultPopup = popup ? popup : true;
  const [isPopup, setPopup] = useState(defaultPopup);

  const data = React.useMemo(
    () => JSON.parse(loadReportsRequest.responseText),
    []
  );

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
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
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
      useRowSelect,

      (hooks) => {
        hooks.visibleColumns.push((columns) => [
          {
            id: "selection",
            // The header can use the table's getToggleAllRowsSelectedProps method
            // to render a checkbox
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox
                  {...getToggleAllPageRowsSelectedProps()}
                />
              </div>
            ),
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );
    const IndeterminateCheckbox = React.forwardRef(
      ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
          resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
          <>
            <input
              type="checkbox"
              className="btns"
              value="Bearbeiten"
              onClick={buttonHandler}
              ref={resolvedRef}
              {...rest}
            />
          </>
        );
      }
    );

    // We don't want to render all of the rows for this example, so cap
    // it for this use case
    const firstPageRows = rows.slice(0, 10);
    const buttonHandler = () => {
      console.log(selectedRowIds);
    };
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
                  onClick={() => console.log(row.original)}
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
        <div className="Button-div">
          <input
            type="button"
            value="Löschen"
            className="btns btn-normal btn-overview"
          />
          <input
            type="button"
            value="Bearbeiten"
            className="btns btn-normal btn-overview"
            onClick={buttonHandler}
          />
        </div>
        {popup ? (
          <Popup text="popup" closePopup={setPopup(false)}>
            popup
          </Popup>
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
