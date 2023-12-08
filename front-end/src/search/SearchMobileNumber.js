import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchMobileNumber() {
  const [mobile_number, setMobile_number] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setMobile_number(event.target.value);
    console.log(mobile_number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?${mobile_number}`);
  };

  return (
    <div>
      <h1>Search</h1>
      <form className="form-horizontal">
        <div className="border p-2 w-50">
          <label htmlFor="mobile_number" className="font-weight-bold">
            Mobile Number:
          </label>

          <div>
            <input
              id="mobile_number"
              type="text"
              name="mobile_number"
              placeholder="Enter a customer’s phone number"
              onChange={handleChange}
              value={mobile_number}
            />
          </div>
          <br></br>

          <div className="d-flex justify-content-start">
            <button
              className="btn btn-primary"
              type="submit"
              onSubmit={handleSubmit}
            >
              Find
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchMobileNumber;
