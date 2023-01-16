import { useParams } from "react-router-dom";

const Quote = () => {
    const {symbol} = useParams()
  return (
    <div>
      <h1>Symbol - {symbol}</h1>
    </div>
  );
};

export default Quote;
