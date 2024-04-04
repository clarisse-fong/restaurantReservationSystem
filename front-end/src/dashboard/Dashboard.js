import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { today, previous, next } from "../utils/date-time";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ListAllTables from "./ListAllTables";
import ListAllReservations from "./ListAllReservations";
import useQuery from "../utils/useQuery";
import formatReservationDate from "../utils/format-reservation-date";
import leftArrowIcon from "../Assets/icon-arrow-left.svg";
import rightArrowIcon from "../Assets/icon-arrow-right.svg";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [currDate, setCurrDate] = useState(date);
  const history = useHistory();
  const query = useQuery();
  const dateParam = query.get("date");

  //updates the curr date if the date param changes
  useEffect(() => {
    if (dateParam) {
      setCurrDate(dateParam);
    }
  }, [dateParam]);

  //reloads the dashboard page if the currDate changes
  useEffect(loadDashboard, [currDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //enters a new dateparam into the dashboard url depending on if they previous, today, or next day buttons
  function buttonHandler(event) {
    console.log(event);
    switch (event.target.name) {
      case "previous":
        history.push(`/dashboard/?date=${previous(currDate)}`);
        break;
      case "next":
        history.push(`/dashboard/?date=${next(currDate)}`);
        break;
      default:
        history.push(`/dashboard/?date=${today()}`);
        break;
    }
  }

  return (
    <main>
      <div className="Dashboard container-fluid">
        <div className="row first-row  align-items-center">
          <h1 className="col col-4 header">Dashboard </h1>
          <div className="col col-7 buttons">
            <button
              type="button"
              className="btn-previous"
              onClick={buttonHandler}
              name="previous"
            >
              <img name="previous" src={leftArrowIcon}></img>
            </button>
            <button
              type="button"
              className="btn-today btn-oval purple"
              onClick={buttonHandler}
              name="today"
            >
              Today
            </button>
            <button
              type="button"
              className="btn-next"
              onClick={buttonHandler}
              name="next"
            >
              <img src={rightArrowIcon} name="next"></img>
            </button>
          </div>
        </div>
        <ErrorAlert error={reservationsError} />
        <div className="purple-gradient">
          <div className="row second-row headers align-items-center">
            <h2 className="col col-6 reservations-header">Reservations </h2>
            <h3 className="col col-2 date">{currDate.toString()}</h3>
            <h2 className="col tables-header">Tables</h2>
          </div>
          <div className="row third-row">
            <div className="col-8 reservations-list pt-3">
              <ListAllReservations reservations={reservations} />
            </div>
            <div className="col-0">
              <div className="vertical-rule"></div>
            </div>
            <div className="col tables-list">
              <ListAllTables />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
