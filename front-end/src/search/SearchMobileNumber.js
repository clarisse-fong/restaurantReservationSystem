import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Defines the search form used in the search reservation page by mobile_number.
 * @returns {JSX.Element}
 */

function SearchMobileNumber() {
  const [mobile_number, setMobile_number] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setMobile_number(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?${mobile_number}`);
  };

  return (
    <form className="search-form">
      <div className="row justify-content-start align-items-center">
        <div className="col-12">
          <label htmlFor="mobile_number">Phone Number</label>
        </div>
        <div className="row pl-3">
          <div className="col">
            <input
              id="mobile_number"
              type="text"
              className="form-control"
              style={{ width: "300px" }}
              name="mobile_number"
              placeholder="Enter a customer’s phone number"
              onChange={handleChange}
              value={mobile_number}
            />
          </div>
          <div className="col">
            <button
              className="btn-oval purple"
              type="submit"
              onSubmit={handleSubmit}
            >
              Find
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SearchMobileNumber;
