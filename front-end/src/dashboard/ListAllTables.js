import { useEffect, useState } from "react";
import { deleteReservationFromTable, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import pinkCircleWithArrow from "../Assets/pink-circle-right-arrow.png";

/**
 * @returns {JSX.Element} a table with a list of all tables.
 *
 */

function ListAllTables() {
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);
  const history = useHistory();

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal)
      .then(setTables)
      .then(() => {})
      .catch(setTablesError);
    return () => abortController.abort();
  }

  function finishHandler(table_id) {
    if (
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      deleteReservationFromTable(table_id, abortController.signal)
        .then(() => {
          history.go(0);
        })
        .catch(setTablesError);

      return () => abortController.abort();
    }
  }

  const tableRows = tables.map((table) => {
    return (
      <div className="All-Tables pl-2 pb-4" key={table.table_id}>
        <div className="row">
          <div className="col-0">
            <img src={pinkCircleWithArrow} className="imageAsIcon"></img>
          </div>
          <div className="col-0 pl-3">Table: {table.table_name}</div>
        </div>
        <div className="col pl-4">
          <div className="row">
            <div className="col-12">
              Capacity:&nbsp;
              <i className="bi bi-person-fill pr-2"></i>
              {table.capacity}
            </div>
            <div className="col" data-table-id-status={table.table_id}>
              {table.reservation_id ? "Occupied: " : "Free"}
              {table.reservation_id ? (
                <span className="reservation-id">
                  {` #${table.reservation_id}`}
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            {table.reservation_id ? (
              <button
                type="button"
                className="small-button purple text-light pt-0 pb-0"
                data-table-id-finish={`${table.table_id}`}
                onClick={() =>
                  finishHandler(table.table_id, table.reservation_id)
                }
              >
                Finish
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div>
      <ErrorAlert error={tablesError} />
      {tableRows}
    </div>
  );
}

export default ListAllTables;
