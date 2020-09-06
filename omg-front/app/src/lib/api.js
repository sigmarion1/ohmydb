import axios from "axios";

export const getPost = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);

export const getUsers = (id) =>
  axios.get(`https://jsonplaceholder.typicode.com/users`);

export const getPics = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `http://${process.env.REACT_APP_BACK_HOST}:${process.env.REACT_APP_BACK_PORT}/?page=${page}`
      );
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
};
