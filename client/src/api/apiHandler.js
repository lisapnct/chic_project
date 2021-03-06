import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // Cookie is sent to client when using this service. (used for session)
});

function errorHandler(error) {
  if (error.response.data) {
    // console.log(error.response && error.response.data);
    throw error;
  }
  throw error;
}

export default {
  service,

  signup(userInfo) {
    return service
      .post("/api/auth/signup", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  signin(userInfo) {
    return service
      .post("/api/auth/signin", userInfo)
      .then((res) => res.data)
      .catch(errorHandler);
  },

  isLoggedIn() {
    return service
      .get("/api/auth/isLoggedIn")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  logout() {
    return service
      .get("/api/auth/logout")
      .then((res) => res.data)
      .catch(errorHandler);
  },

  // C
  createOne(endPoint, data) {
    return service.post(endPoint, data, {});
  },

  // R
  getAll(endPoint) {
    return service.get(endPoint);
  },

  getOne(endPoint, id) {
    return service.get(endPoint + id);
  },

  // U
  updateOne(endPoint, data) {
    return service.patch(endPoint, data, {});
  },

  // D
  deleteOne(endPoint, id) {
    return service.delete(endPoint + id);
  },

  // Special requests :
  getAllProjects(endPoint) {
    return service.get(endPoint);
  },

  filterProjectsByFabric(endPoint, fabricArr) {
    return service.get(endPoint, {params: {
      filters: fabricArr,
        bar: "toto"
    }});
  },
};
