import Axios from "axios";

const url = "https://prototype.sbulltech.com/api/v2/quotes";

export const quotesService = (endPoint) => {
  const fetchUrl = url+`/${endPoint}`
  return Axios.get(fetchUrl);
};
