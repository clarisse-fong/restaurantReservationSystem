function formatDate(reservationDate) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let formattedReservation = "";
  const year = reservationDate.slice(0, 4);
  const monthNum = Number(reservationDate.slice(6, 7));
  const day =
    reservationDate[8] === "0"
      ? reservationDate.slice(9)
      : reservationDate.slice(8);
  formattedReservation = `${months[monthNum - 1]} ${day} of ${year}`;
  return formattedReservation;
}

/**
 * Formats the reservation_date property of a reservation.
 * @param reservations
 *  a single reservation, or an array of reservations.
 * @returns {[reservation]|reservation}
 *  the specified reservation(s) with the reservation_date property formatted as YYYY-MM-DD.
 */
export default function formatReservationDate(reservations) {
  return Array.isArray(reservations)
    ? reservations.map(formatDate)
    : formatDate(reservations);
}
