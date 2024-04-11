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
      <div className="col-6 mb-4 reservation" key={reservation.reservation_id}>
        <div className="row">
          <div className="col-xl-7 col-md-8">
            <div className="row header">
              <div className="col-0">
                <img src={pinkCircleWithArrow} className="imageAsIcon"></img>
              </div>
              <div className="col">
                <h3
                  data-reservation-id-status={`${reservation.reservation_id}`}
                >
                  {reservation.first_name}
                  &nbsp;
                  {reservation.last_name}
                  <span className="reservation-id">{` #${reservation.reservation_id}`}</span>
                </h3>
              </div>
            </div>
            <div className="row reservation-info">
              <div className="col">
                <div className="row">
                  <div className="col-0 pr-2">
                    <i className="bi bi-clock"> </i>
                  </div>
                  <div className="col-0">{formattedTime}</div>
                  <div className="col-0">
                    <i className="bi bi-person-fill pl-2 pr-2"></i>
                    {reservation.people}
                  </div>
                </div>
                <div className="row">
                  <div className="col-0">
                    <i class="bi bi-telephone-fill pr-2"> </i>
                  </div>
                  <div className="col-0">{reservation.mobile_number}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="row buttons">
              <div className="col-12 p-0">
                {reservation.status === "booked" ? (
                  <div>
                    <div className="col-12">
                      <Link
                        to={`/reservations/${reservation.reservation_id}/seat`}
                      >
                        <button className="small-button purple text-light">
                          Seat
                        </button>
                      </Link>
                    </div>
                    <div className="col-12">
                      <Link
                        to={`/reservations/${reservation.reservation_id}/edit`}
                      >
                        <button className="small-button grey">Edit</button>
                      </Link>
                    </div>
                    <div className="col-12">
                      <button
                        className="small-button blue"
                        data-reservation-id-cancel={reservation.reservation_id}
                        onClick={() =>
                          cancelReservationHandler(reservation.reservation_id)
                        }
                      >
                        X
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-12 pt-2">
                    <button className="small-button black">Seated</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  if (reservations === null) {
    return <p>Loading</p>;
  } else if (reservations.length === 0) {
    return <h3>No reservations found</h3>;
  } else {
    return (
      <>
        <ErrorAlert error={reservationErrors} />
        <div className="row">{reservationsList}</div>
      </>
    );
  }
}

export default ListAllReservations;
