import { useState } from "react";
import { updateReservationStatus } from "../utils/api";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationTime from "../utils/format-reservation-time";

/**
 * @returns {JSX.Element} a table with a list of all reservations.
 */
function ListAllReservations({ reservations }) {
  const [reservationErrors, setReservationErrors] = useState(null);
  const history = useHistory();

  const cancelReservationHandler = (reservation_id) => {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      updateReservationStatus(
        reservation_id,
        "cancelled",
        abortController.signal
      )
        .then(() => {
          history.go(0);
        })
        .catch(setReservationErrors);

      return () => abortController.abort();
    }
  };

  const reservationsList = reservations.map((reservation) => {
    const formattedTime = formatReservationTime(reservation);

    return (
      <article key={reservation.reservation_id}>
        <p data-reservation-id-status={`${reservation.reservation_id}`}>
          <h4>
            {`${reservation.first_name} ${reservation.last_name}`}
            <span> / {reservation.status}</span>
          </h4>
        </p>
        <div>
          <div>
            <div>
              <p>
                <i class="bi bi-clock"> </i>
                {formattedTime}
                <i className="bi bi-person-fill pl-3"> </i>
                {reservation.people}
              </p>
              <p></p>
              <div>
                <i class="bi bi-telephone-fill"> </i>
                {reservation.mobile_number}
              </div>
            </div>
          </div>
        </div>
        <td>
          {reservation.status === "booked" ? (
            <Link
              to={`/reservations/${reservation.reservation_id}/seat`}
              className="btn purple text-light"
            >
              Seat
            </Link>
          ) : (
            " "
          )}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <Link
              to={`/reservations/${reservation.reservation_id}/edit`}
              className="btn grey"
            >
              Edit
            </Link>
          ) : (
            " "
          )}
        </td>
        <td>
          {reservation.status === "booked" ? (
            <button
              className="btn btn-primary pt-2"
              data-reservation-id-cancel={reservation.reservation_id}
              onClick={() =>
                cancelReservationHandler(reservation.reservation_id)
              }
            >
              X
            </button>
          ) : (
            ""
          )}
        </td>
        <hr></hr>
      </article>
    );
  });

  if (reservations === null) {
    return <p>Loading</p>;
  } else if (reservations.length === 0) {
    return <h3>No reservations found</h3>;
  } else {
    return (
      <main>
        <ErrorAlert error={reservationErrors} />
        <section>{reservationsList}</section>
      </main>
    );
  }
}

export default ListAllReservations;
