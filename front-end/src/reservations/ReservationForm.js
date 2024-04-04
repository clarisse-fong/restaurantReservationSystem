import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createReservation, editReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines reservation form components used in creating a new reservation or editing a new reservation.
 * @returns {JSX.Element}
 */

function ReservationForm({
  formData,
  setFormData,
  isEditing = false,
  reservationsErrors,
  setReservationsErrors,
  reservation_id = false,
}) {
  const history = useHistory();

  //handler for if any of the form inputs change
  const onChangeHandler = (event) => {
    const property = event.target.name;

    let value;
    switch (property) {
      case "people":
        value = Number(event.target.value);
        break;
      case "mobile_number":
        const mobile_num = event.target.value.replaceAll("-", "");

        if (mobile_num.length < 4) {
          value = mobile_num;
        } else if (mobile_num.length < 7) {
          value = `${mobile_num.slice(0, 3)}-${mobile_num.slice(3)}`;
        } else {
          value = `${mobile_num.slice(0, 3)}-${mobile_num.slice(
            3,
            6
          )}-${mobile_num.slice(6, 10)}`;
        }
        break;
      default:
        value = event.target.value;
    }

    console.log(value);

    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  //handler for if the user cancels creating or editing a reservation
  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  //handler for if the user submits the form for either creating or editing a reservation
  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    //for editing reservations, uses the editReservation api call
    if (isEditing) {
      editReservation(formData, reservation_id, abortController.signal)
        .then(() => {
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch(setReservationsErrors);
      //for creating a reservation, uses the createReservation api call
    } else {
      createReservation(formData, abortController.signal)
        .then(() => {
          history.push(`/dashboard?date=${formData.reservation_date}`);
        })
        .catch(setReservationsErrors);
    }
    return () => abortController.abort();
  };

  return formData.first_name !== null ? (
    <div>
      <ErrorAlert error={reservationsErrors} />
      <div className="Reservation-Form container-fluid">
        <form className="reservation-form">
          <div className="row">
            <h1 className="col">Reservation Form</h1>
          </div>
          <div className="purple-gradient col-6">
            <div className="row justify-content-start">
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={onChangeHandler}
                value={formData.first_name ? formData.first_name : ""}
              />
            </div>
            <div className="row">
              <label htmlFor="last_name">Last name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={onChangeHandler}
                value={formData.last_name ? formData.last_name : ""}
              />
            </div>
            <div className="row">
              <label htmlFor="mobile_number">Mobile Number</label>
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                onChange={onChangeHandler}
                value={formData.mobile_number ? formData.mobile_number : ""}
              />
            </div>
            <div className="row">
              <label htmlFor="reservation_date">Date of Reservation</label>
              <input
                type="date"
                id="reservation_date"
                name="reservation_date"
                onChange={onChangeHandler}
                value={
                  formData.reservation_date ? formData.reservation_date : ""
                }
              />
            </div>
            <div className="row">
              <label htmlFor="reservation_time">Time of Reservation</label>
              <input
                type="time"
                id="reservation_time"
                name="reservation_time"
                onChange={onChangeHandler}
                value={
                  formData.reservation_time ? formData.reservation_time : ""
                }
              />
            </div>
            <div className="row">
              <label htmlFor="people">Party Size</label>
              <input
                type="number"
                min="0"
                id="people"
                name="people"
                onChange={onChangeHandler}
                value={formData.people ? String(formData.people) : ""}
              />
            </div>
            <div className="row fifth-row pt-5 justify-content-start">
              <button
                className="btn-oval purple"
                type="submit"
                onClick={submitHandler}
              >
                Submit
              </button>

              <button
                type="button"
                className="btn-oval purple"
                onClick={cancelHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    "Loading..."
  );
}

export default ReservationForm;
