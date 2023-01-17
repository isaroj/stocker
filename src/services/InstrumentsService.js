import Axios from "axios";

const url = "https://prototype.sbulltech.com/api/v2/instruments";

export const instrumentService = () => {
  return Axios.get(url);
};
