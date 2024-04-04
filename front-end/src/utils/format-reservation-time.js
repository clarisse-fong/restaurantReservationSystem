import { formatAsTime } from "./date-time";

function formatTime(reservation) {
  reservation.reservation_time = formatAsTime(reservation.reservation_time);
  // let newReservationTime = reservation.reservation_time;
  let newReservationTime = "";
  const hr = Number(reservation.reservation_time.slice(0, 2));
  const minutes = reservation.reservation_time.slice(3);
  if (hr > 12) {
    const newHr = hr - 12;
    newReservationTime = `${newHr}:${minutes}PM`;
  } else {
    newReservationTime = `${hr}:${minutes}AM`;
  }
  return newReservationTime;
}

/**
 * Formats the reservation_time property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_time property formatted as HH:MM.
 */
export default function formatReservationTime(reservations) {
  return Array.isArray(reservations)
    ? reservations.map(formatTime)
    : formatTime(reservations);
}
