// react
import {useState, useEffect} from 'react'

// routing
import { useParams, useNavigate } from "react-router-dom";

// service
import { quotesService } from "../services/QuotesService";

// comps
import InstrumentTableList from "./InstrumentTableList";

// reactstrap
import { Spinner, Button } from "reactstrap";

// toastmeassge
import { toast, ToastContainer } from "react-toastify";

// icons
import {FaArrowLeft} from 'react-icons/fa'


let delay = 0
let count = 0
const Quote = () => {
  const {symbol} = useParams()
  const [quotes, setQuotes] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  // sort the quotes data according to different order & parameter
  const sortQuotes = (data, order, parameter) => {
    return data?.sort((q1, q2) => {
      if (order === 'asc') {
        return new Date(q1[parameter]) > new Date(q2[parameter]) ? 1 : -1;
      } else {
         return new Date(q1[parameter]) < new Date(q2[parameter]) ? 1 : -1;
      }
    })
  }


  // get quotes for specified symbol
  const getQuotes = async () => {
    try {
      setIsLoading(true);
      const { data } = await quotesService(symbol);
      const quotesRes = data?.payload[symbol];
      const quotesDetail = {
        headers: Object.keys(quotesRes[0]),
        rows: sortQuotes(quotesRes, 'asc', 'time'),
        tableTitle: `Quotes for ${symbol}`,
        sortableParameters: ["time"],
        sortQuotes,
      };
      setQuotes(quotesDetail);
    } catch (error) {
      toast.error("Oops! something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);


  // refetch calculation time
  useEffect(() => {
    const sortedQuotesAsPerValidTill = sortQuotes(
      quotes.rows,
      "asc",
      "valid_till"
    );
    if (sortedQuotesAsPerValidTill) {
      const lowestValidTill = sortedQuotesAsPerValidTill[0].valid_till;
      const hasExpired = new Date() > new Date(lowestValidTill);

      count++

      if (hasExpired) {
        if (count >= 3) delay = 5000
        setTimeout(() => {
          getQuotes();
        }, delay);
      } else {
        const remainingTime = new Date(lowestValidTill) - new Date();
        count = 0
        delay = 0
        setTimeout(() => {
          getQuotes();
        }, remainingTime);
      }
    }
  }, [quotes]);


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
            marginBottom: '0.2rem'
          }}
          /> Go Back
        </Button>
      </div>
      <ToastContainer
        position="top-right"
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading ? (
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
        <>
          <InstrumentTableList {...quotes} />
        </>
      )}
    </div>
  );
};

export default Quote;
