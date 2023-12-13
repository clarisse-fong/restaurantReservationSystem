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
      .then(() => history.goBack())
      .catch(setReservationsError);
    return () => abortController.abort();
  };

  const handleChange = (event) => {
    setSelectedTable_id(event.target.value);
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  return (
    <div>
      <ErrorAlert error={reservationsError} />
      <h1>Seat Reservation #{reservation_id}</h1>
      <form>
        <p>Choose a table for the reservation:</p>
        <label htmlFor="table_id">
          <select id="table_id" name="table_id" onChange={handleChange}>
            <option value="">Select a table</option>
            {tableRows}
          </select>
        </label>
        <button type="submit" onClick={submitHandler}>
          Submit
        </button>
        <button onClick={cancelHandler}>Cancel</button>
      </form>
    </div>
  );
}

export default SeatReservation;
