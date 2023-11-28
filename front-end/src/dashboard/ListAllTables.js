import { useEffect, useState } from "react";
import { listTables } from "../utils/api";

function ListAllTables() {
  //get a list of the tables
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const tableRows = tables.map((table) => {
    return (
      <tr key={table.table_id} data-table-id-status={table.table_id}>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td>{table.status}</td>
        <td>{table.reservation_id ? table.reservation_id : ""}</td>
      </tr>
    );
  });

  return (
    <div>
      <h1>Tables</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Table Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Reservation Id</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  );
}

export default ListAllTables;