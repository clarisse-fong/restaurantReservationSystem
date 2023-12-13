/**
 * A function used to validate reservation number is valid.
 */
function validatesReservationMobileNumber(mobile_number) {
  //makes sure reservation date is formatted correctly "800-555-1212"
  console.log("getting here");
  if (mobile_number.match(/^[1-9]\d{2}-\d{3}-\d{4}/) === null) {
    const error = new Error(
      `A valid mobile_number is required "###-###-####".`
    );
    error.status = 400;
    throw error;
  }
}

module.exports = validatesReservationMobileNumber;
