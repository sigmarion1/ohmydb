import axios from "axios";

// const hostUrl = "https://api.ohmydb.com";
const hostUrl = "http://127.0.0.1:8000";

const fetcher = (url) => axios.get(hostUrl + url).then((res) => res.data);

export default fetcher;

export const annotate = (image_id, annotation) =>
  axios
    .put(hostUrl + "/api/images/" + image_id, { annotation })
    .then((res) => res.data);

export const fetcherWithParams = ({ url, params }) =>
  axios.get(hostUrl + url, { params }).then((res) => res.data);
