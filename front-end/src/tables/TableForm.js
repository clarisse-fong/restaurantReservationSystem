import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { createTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

/**
 * Defines tables form for creating a new table.
 * @returns {JSX.Element}
 */

export const TableForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [tableErrors, setTableErrors] = useState(null);

  useEffect(() => {
    myFunction();
    return () => {
      setFormData({});
    };
  }, []);

  const myFunction = () => {
    setFormData({
      table_name: "",
      capacity: 0,
    });
  };

  const onChangeHandler = (event) => {
    const property = event.target.name;
    const value =
      property === "capacity" ? Number(event.target.value) : event.target.value;
    setFormData({
      ...formData,
      [property]: value,
    });
  };

  const cancelHandler = (event) => {
    event.preventDefault();
    history.goBack();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const abortController = new AbortController();

    createTable(formData, abortController.signal)
      .then(() => history.push(`/dashboard`))
      .catch(setTableErrors);
    return () => abortController.abort();
  };

  return (
    <div>
      <ErrorAlert error={tableErrors} />
      <form>
        <div className="border p-2 w-50">
          <div>
            <div className="d-flex justify-content-between">
              <label
                htmlFor="table_name"
                className="font-weight-bold font-family-sans-serif"
              >
                Table Name:
              </label>
              <input
                type="text"
                id="table_name"
                name="table_name"
                onChange={onChangeHandler}
                value={formData.table_name ? formData.table_name : ""}
              ></input>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <label htmlFor="capacity" className="font-weight-bold">
              Capacity:
            </label>
            <input
              type="number"
              id="capacity"
              name="capacity"
              onChange={onChangeHandler}
              value={formData.capacity ? formData.capacity : ""}
            ></input>
          </div>
          <br></br>
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={submitHandler}
            >
              Submit
            </button>
            <button className="btn btn-danger" onClick={cancelHandler}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TableForm;
