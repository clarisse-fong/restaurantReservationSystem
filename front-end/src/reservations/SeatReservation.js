import { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import {
  assignReservationToTable,
  listTables,
  updateReservationStatus,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines the seat reservation page.
 * @returns {JSX.Element}
 */

function SeatReservation() {
  const history = useHistory();
  const { reservation_id } = useParams();
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [, setTablesError] = useState(null);
  const [selectedTable_id, setSelectedTable_id] = useState("");

  function loadPage() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  useEffect(loadPage, []);

  const tableRows = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  const submitHandler = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    if (selectedTable_id === "") {
      const error = new Error("No table is selected");
      error.status = 400;
      setReservationsError(error);
    } else {
      assignReservationToTable(
        selectedTable_id,
        reservation_id,
        abortController.signal
      )
        .then(() => {
          updateReservationStatus(
            reservation_id,
            "seated",
            abortController.signal
          );
        })
        .then(() => history.push("/"))
        .catch(setReservationsError);
      return () => abortController.abort();
    }
  };

  const handleChange = (event) => {
    setSelectedTable_id(event.target.value);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div className="Seat-Reservation container-fluid">
      <ErrorAlert error={reservationsError} />
      <h1>Assign Reservation #{reservation_id}</h1>
      <div className="purple-gradient col-6">
        <form>
          <div className="row">
            <h2>Choose a table:</h2>
          </div>
          <div className="row">
            <label htmlFor="table_id"></label>
            <select id="table_id" name="table_id" onChange={handleChange}>
              <option value="">Select a table</option>
              {tableRows}
            </select>
          </div>
          <div className="row pt-5">
            <button
              className="btn-oval purple"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn-oval text-dark"
              onClick={cancelHandler}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeatReservation;
