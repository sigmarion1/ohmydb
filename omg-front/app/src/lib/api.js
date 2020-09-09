import axios from "axios";

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);

export const getPics = (payload) => {
  return new Promise(async (resolve, reject) => {
    let url = `https://${process.env.REACT_APP_BACK_HOST}/?page=${payload.page}`
    if(payload.member) {
      url += `&member=${payload.member}`
    }

    try {
      const res = await axios.get(url);
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
