import React from "react";
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
  const data = React.useMemo(
    () => [
      {
        id: "sFaSB198a5dF",
        latitude: 49.47743213303505,
        longitude: 8.42211620924414,
        kindOfReport: "defect",
        pictureID: "Q6etnFsPizqq",
        description: "Kaputter Hydrant",
        citizenID: "kxmM5uylCW8D",
      },
      {
        id: "ePFVIVwzh3uC",
        latitude: 49.47330276797773,
        longitude: 8.423570517338486,
        kindOfReport: "pollution",
        pictureID: "pgbp2Q9cqaE2",
        description: "MÃ¼ll nicht weggeschmissen",
        citizenID: "O119nDfjSASI",
      },
      {
        id: "Syy5hjSOL4zf",
        latitude: 49.47865049905125,
        longitude: 8.456384842327548,
        kindOfReport: "parkingViolation",
        pictureID: "jwjyhWJ13UYv",
        description: "Hier steht jemand auf dem Behinderten Parkplatz",
        citizenID: "081UXe84LMqE",
      },
      {
        id: "zj4ogSacqLnP",
        latitude: 49.4815932,
        longitude: 8.4467264,
        kindOfReport: null,
        pictureID: null,
        description: "dasdfasdfa",
        citizenID: null,
      },
    ],
    []
  );
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "latitude",
        accessor: "latitude",
      },
      {
        Header: "kindOfReport",
        accessor: "kindOfReport",
      },
      {
        Header: "pictureID",
        accessor: "pictureID",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "citizenID",
        accessor: "citizenID",
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
            <input type="checkbox" ref={resolvedRef} {...rest} />
          </>
        );
      }
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
                  border: "solid 2px black",
                  padding: "10px",
                }}
              ></th>
            </tr>
          </thead>
          <tbody {...getTableBodyProps()}>
            {firstPageRows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
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
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              "selectedFlatRows[].original": selectedFlatRows.map(
                (d) => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </>
    );
  }

  return (
    <div className="Overview-Page">
      <Table columns={columns} data={data} />
    </div>
  );
}
