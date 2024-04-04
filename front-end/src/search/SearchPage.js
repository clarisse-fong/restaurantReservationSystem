import { useEffect, useState } from "react";
import ListAllReservations from "../dashboard/ListAllReservations";
import SearchMobileNumber from "./SearchMobileNumber";
import { listReservations } from "../utils/api";
import useQuery from "../utils/useQuery";

/**
 * Defines the search reservation page by mobile_number.
 * @returns {JSX.Element}
 */

function SearchPage() {
  const [reservations, setReservations] = useState([]);
  const [, setReservationsError] = useState(null);
  const query = useQuery();
  const mobileNumParam = query.get("mobile_number");

  function loadSearchPage() {
    const abortController = new AbortController();
    listReservations({ mobile_number: mobileNumParam }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  //reloads the search page if the mobile num param changes
  useEffect(loadSearchPage, [mobileNumParam]);

  return (
    <>
      <div className="Search-Form container-fluid">
        <h1>Search</h1>
        <div className="purple-gradient">
          <SearchMobileNumber />
          <div className="row pt-3 pl-3">
            {mobileNumParam ? (
              <ListAllReservations
                reservations={reservations}
                loadSearchPage={loadSearchPage}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchPage;
