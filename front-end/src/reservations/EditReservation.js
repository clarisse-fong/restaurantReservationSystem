import React, { useEffect, useState } from "react";
import ReservationForm from "./ReservationForm";
import { readReservation } from "../utils/api";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Defines the edit reservation page.
 * @returns {JSX.Element}
 */

function EditReservation() {
  const { reservation_id } = useParams();
  const [reservationsErrors, setReservationsErrors] = useState(null);
  const initialFormData = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [reservation, setReservation] = useState(initialFormData);

  useEffect(loadReservation, [
    reservation_id,
    reservation.first_name,
    reservation.last_name,
    reservation.mobile_number,
    reservation.reservation_date,
    reservation.reservation_time,
    reservation.people,
  ]);

  function loadReservation() {
    if (reservation_id !== null) {
      const abortController = new AbortController();

      readReservation(reservation_id, abortController.signal)
        .then(setReservation)
        .then(() => {
          setFormData({
            first_name: reservation.first_name,
            last_name: reservation.last_name,
            mobile_number: reservation.mobile_number,
            reservation_date: reservation.reservation_date.split("T")[0],
            reservation_time: reservation.reservation_time,
            people: reservation.people,
          });
        })
        .catch(setReservationsErrors);
      return () => abortController.abort();
    }
  }

  //checks if reservation has loaded. If it hasn't loaded, say "loading". If not, return the ReservationForm component.
  console.log(reservation.status);
  return reservation !== null ? (
    <div>
      {reservation.status !== "booked" ? (
        <h3>You can only edit reservations that are booked</h3>
      ) : (
        <ReservationForm
          formData={formData}
          setFormData={setFormData}
          isEditing={true}
          setReservationsErrors={setReservationsErrors}
          reservationsErrors={reservationsErrors}
          reservation_id={reservation_id}
        />
      )}
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}

export default EditReservation;
