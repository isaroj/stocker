// react
import {useState, useEffect} from 'react'

// routing
import { useParams, useNavigate } from "react-router-dom";

// service
import { quotesService } from "../services/QuotesService";

// comps
import InstrumentTableList from "../components/InstrumentTableList";

// reactstrap
import { Spinner, Button } from "reactstrap";

// toastmeassge
import { toast, ToastContainer } from "react-toastify";

// icons
import {FaArrowLeft} from 'react-icons/fa'

// lodash
import { isEmpty } from 'lodash';


let delay = 0
let count = 0
let quotesRef ; 
const Quote = () => {

  // route params
  const {symbol} = useParams()

  //states
  const [quotes, setQuotes] = useState({});
  const [sortConfig, setSortConfig] = useState();
  const [initialLoading, setIntialLoading] = useState(false);
  const [isSortingRequest, setIsSortingRequest] = useState(false);

  // navigate
  const navigate = useNavigate();


  // sort the quotes data according to different order & parameter
  const sortQuotes = (data, order='asc', parameter='time') => {
    return data?.sort((q1, q2) => {
      if (order.toLowerCase() === 'asc') {
        return (new Date(q1[parameter]) < new Date(q2[parameter])) ? -1 : 1;
      } else {
         return (new Date(q1[parameter]) > new Date(q2[parameter])) ? -1 : 1;
      }
    })
  }


  // get quotes for specified symbol
  const getQuotes = async () => {
    try {
      const { data } = await quotesService(symbol);
      const quotesRes = data?.payload[symbol];

      // quotes object
      const quotesDetail = {
        headers: Object.keys(quotesRes[0]),
        rows: sortQuotes(quotesRes, sortConfig?.order, 'time'),
        tableTitle: `Quotes for ${symbol}`,
        sortableParameters: ["time"],
        setSortConfig,
      };
      setQuotes(quotesDetail);
    } catch (error) {
      toast.error("Oops! something went wrong!");
    } finally {
      setIntialLoading(false)
    }
  };

  useEffect(() => {
    // will set loading to true one time only.
    // Otherwise due to frequent API call as live data is expired, loading icon is creating a bad UI / UX. So after the 1st time data will be fetched & updated silently. 
    setIntialLoading(true)
    getQuotes();
  }, []);


  useEffect(() => {
    if (isEmpty(sortConfig) || isEmpty(quotes)) return
    setIsSortingRequest(true)
    const sortedData = sortQuotes(
      quotes?.rows, sortConfig?.order,
      sortConfig?.parameter
    );
    setQuotes({
      ...quotes,
      rows: sortedData
    });
  }, [sortConfig]);


  // refetch calculation time
  useEffect(() => {
    if (isSortingRequest) {
      if (quotesRef) clearTimeout(quotesRef);
      setIsSortingRequest(false);
      return;
    }
    if (isEmpty(quotes)) return;
    const sortedQuotesAsPerValidTill = sortQuotes(
      quotes?.rows,
      "asc",
      "valid_till"
    );
    if (sortedQuotesAsPerValidTill) {
      const lowestValidTill = sortedQuotesAsPerValidTill[0].valid_till;
      const hasExpired = new Date() > new Date(lowestValidTill);

      count++;
      if (hasExpired) {
        // Fetch after 2 sec, if 3 consecutive requests have been made
        if (count >= 3) delay = 2000;
        quotesRef = setTimeout(() => {
          getQuotes();
        }, delay);
      } else {
        // if data is alive till now
        const remainingTime = new Date(lowestValidTill) - new Date();
        count = 0;
        delay = 0;
        setTimeout(() => {
          getQuotes();
        }, remainingTime);
      }
    }
  }, [quotes, isSortingRequest]);


  return (
    <div
      style={{
        minHeight: "90vh",
      }}
    >
      <div
        style={{
          width: "100vw",
          textAlign: "end",
        }}
      >
        <Button
          size="sm"
          color="info"
          style={{
            marginRight: "2rem",
            marginTop: "1rem",
          }}
          onClick={() => navigate("/")}
        >
          <FaArrowLeft
            style={{
              marginBottom: "0.2rem",
            }}
          />{" "}
          Go Back
        </Button>
      </div>
      <ToastContainer
        position="top-right"
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
      {initialLoading ? (
        <div
          style={{
            textAlign: "center",
            margin: "15%",
          }}
        >
          <Spinner color="dark" />
          <h4>Fetching quotes.....</h4>
        </div>
      ) : (
        <InstrumentTableList {...quotes} />
      )}
    </div>
  );
};

export default Quote;
