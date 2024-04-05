import { useState } from "react";
import { updateReservationStatus } from "../utils/api";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";
import formatReservationTime from "../utils/format-reservation-time";
import pinkCircleWithArrow from "../Assets/pink-circle-right-arrow.png";

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
      <>
        <div className="container" key={reservation.reservation_id}>
          <div className="row">
            <div className="col-0 ">
              <div className="row">
                <div className="col-0">
                  <img src={pinkCircleWithArrow} className="imageAsIcon"></img>
                </div>
                <div className="col">
                  <h3
                    data-reservation-id-status={`${reservation.reservation_id}`}
                  >
                    {`${reservation.first_name} ${reservation.last_name}`} /{" "}
                    {reservation.status}
                  </h3>
                </div>
              </div>
              <div className="row reservation-info">
                <div className="col">
                  <div className="row">
                    <div className="col-0 pr-1">
                      <i class="bi bi-clock"> </i>
                    </div>
                    <div className="col-0">{formattedTime}</div>
                    <div className="col-0">
                      <i className="bi bi-person-fill pl-3"> </i>
                    </div>
                    <div className="col-0">{reservation.people}</div>
                  </div>
                  <div className="row">
                    <i class="bi bi-telephone-fill"> </i>
                    {reservation.mobile_number}
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="row buttons">
                <div className="col-12">
                  {reservation.status === "booked" ? (
                    <Link
                      to={`/reservations/${reservation.reservation_id}/seat`}
                    >
                      <button className="small-button purple text-light">
                        Seat
                      </button>
                    </Link>
                  ) : (
                    " "
                  )}
                </div>
                <div className="col-12">
                  {reservation.status === "booked" ? (
                    <Link
                      to={`/reservations/${reservation.reservation_id}/edit`}
                    >
                      <button className="small-button grey">Edit</button>
                    </Link>
                  ) : (
                    " "
                  )}
                </div>
                <div className="col-12">
                  {reservation.status === "booked" ? (
                    <button
                      className="small-button blue"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
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
