import axios from "axios";

const API_URL = "http://localhost:8000/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.accessToken) {

    return axios.get(API_URL + "user", {
      headers: {
        'x-access-token': user.accessToken,
      }});

    }else{
      return axios.get(API_URL + "user")
    }
};

const postUserNewsletterStatusChange = (newStatus) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user.email;
  if (user.accessToken) {

    return axios.post(API_URL + "newsletter", {
      headers: {
        'x-access-token': user.accessToken,
      },
      email,
      newStatus,
    });

    }else{
      return axios.get(API_URL + "user")
    }
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  postUserNewsletterStatusChange,
}

export default UserService;
