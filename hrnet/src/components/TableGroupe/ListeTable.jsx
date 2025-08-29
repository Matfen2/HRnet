import { useMemo } from "react";
import "./table.css";
import { COLUMNS } from "./columns";
import { useSelector } from "react-redux";
import GlobalFilter from './GlobalFilter';
import versBas from "../../assets/img/bas.png";
import versHaut from "../../assets/img/haut.png";
import { useTable, useGlobalFilter, useFilters, usePagination, useSortBy } from "react-table";

const ListeTable = () => {
  const Employees = useSelector((state) => state.newEmployee.arrayEmployee);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const columns = useMemo(() => COLUMNS, []);
  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = useMemo(() => Employees, [Employees]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const defaultColumn = useMemo(() => {
    return {
      Filter: GlobalFilter,
    };
  }, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
    prepareRow,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useTable({
    columns,
    data,
    defaultColumn,
    initialState: { pageIndex: 0 },
  },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;

  return (
    <div className="searches">
      <div className="search-and-pagination">
        <div className="search">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize} / Pages
              </option>
            ))}
          </select>
        </div>
        <div className="pagination">
          <div className="pagination-page">
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>

            <span>
              <label htmlFor="goto">Go to page: </label>
              <input
                id="goto"
                type="number"
                min="1"
                defaultValue={pageIndex + 1}
                onChange={(e) => {
                  const pageNumber = e.target.value
                    ? Number(e.target.value) - 1
                    : 0;
                  gotoPage(pageNumber);
                }}
                style={{ width: "50px" }}
              />
            </span>
          </div>
          <div className="buttons">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {"<<"}
            </button>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {">>"}
            </button>
          </div>
        </div>
      </div>

      <div className="table-group">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <img src={versBas} alt="down list" />
                        ) : (
                          <img src={versHaut} alt="down list" />
                        )
                      ) : (
                        "  ▲▼  "
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr key={index} {...row.getRowProps()}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td key={index} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        {!Employees.length && (
          <div className="table-message">No data available in table</div>
        )}
      </div>
    </div>
  )
}

export default ListeTable
