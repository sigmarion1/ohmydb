import axios, { Axios } from "axios";

// const hostUrl = "https://api.ohmydb.com";
const hostUrl = "http://127.0.0.1:8000";

const fetcher = (url) => axios.get(hostUrl + url).then((res) => res.data);

export default fetcher;

export const annotate = (image_id, annotation) =>
  axios
    .patch(hostUrl + "/api/images/" + image_id, { annotation })
    .then((res) => res.data);

export const fetcherWithParams = ({ url, params }) =>
  axios.get(hostUrl + url, { params }).then((res) => res.data);

export const postClassifier = async (data) => {
  try {
    let res = await axios({
      url: hostUrl + "/api/classifiers",
      method: "post",
      data,
    });
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const postTestSet = async (data) => {
  try {
    let res = await axios({
      url: hostUrl + "/api/test-sets",
      method: "post",
      data,
    });
    return res.data;
  } catch (err) {
    throw err.response;
  }
};

export const postTestRecord = async (data) => {
  try {
    let res = await axios({
      url: hostUrl + "/api/test-records",
      method: "post",
      data,
    });
    return res.data;
  } catch (err) {
    throw err.response;
  }
};
