import axios from "axios"; // Imports AXIOS to handle HTTP requests
import { useUserStore } from "@/stores/user"; // Imports the user store to access global data

// Function to get the token after Pinia initialization
async function getTokenFromStore() {
  // Access the store globally within a function to get the user's token
  const userStore = useUserStore();
  return userStore.getToken(); // Returns the token stored in the store
}

// HTTP service using Axios
export function httpService() {
  // Creates an instance of Axios with the API base URL
  let http = axios.create({
    baseURL: "https://nemura.azurewebsites.net/api/",
  });

  // Function to check if a token exists in the store
  async function hasToken() {
    const token = await getTokenFromStore(); // Calls the function to get the token
    return token ? true : false; // Returns true if there's a token, false otherwise
  }

  // Function to redirect the user to the login page
  function backLogin() {
    window.location = "/"; // Redirects the current location to the login page
  }

  // GET function without headers, makes an HTTP GET request
  const httpGet = async (url) => {
    let response = await http.get(url); // Calls Axios' GET method
    return response.data; // Returns only the data from the response
  };

  // POST function without headers, makes an HTTP POST request
  const httpPost = async (url, data) => {
    let response = await http.post(url, data); // Calls Axios' POST method with the data
    return response; // Returns only the data from the response
  };

  // DELETE function without headers, makes an HTTP DELETE request
  const httpDelete = async (url, data) => {
    let response = await http.delete(url, data); // Calls Axios' DELETE method with the data
    return response.data; // Returns only the data from the response
  };

  // PUT function without headers, makes an HTTP PUT request
  const httpPut = async (url, data) => {
    let response = await http.put(url, data); // Calls Axios' PUT method with the data
    return response.data; // Returns only the data from the response
  };

  // GET function with headers (includes the token in the request)
  const httpGetHeaders = async (url) => {
    const token = await getTokenFromStore(); // Gets the token from the store
    const headers = {
      Authorization: `Bearer ${token}`, // Adds the token to the Authorization header
    };
    let response = await http.get(url, { headers }); // Calls Axios' GET method with headers
    return response.data; // Returns only the data from the response
  };

  // POST function with headers (includes the token in the request)
  const httpPostHeaders = async (url, data) => {
    const token = await getTokenFromStore(); // Gets the token from the store
    let headers = {
      Authorization: `Bearer ${token}`, // Adds the token to the Authorization header
    };
    let response = await http.post(url, data, { headers }); // Calls Axios' POST method with headers and data
    return response.data; // Returns only the data from the response
  };

  // PATCH function with headers (includes the token in the request)
  const httpPatchHeaders = async (url, data) => {
    const token = await getTokenFromStore(); // Gets the token from the store
    let headers = {
      Authorization: `Bearer ${token}`, // Adds the token to the Authorization header
    };
    let response = await http.patch(url, data, { headers }); // Calls Axios' PATCH method with headers and data
    return response.data; // Returns only the data from the response
  };

  // PUT function with headers (includes the token in the request)
  const httpPutHeaders = async (url, data) => {
    const token = await getTokenFromStore(); // Gets the token from the store
    let headers = {
      Authorization: `Bearer ${token}`, // Adds the token to the Authorization header
    };
    let response = await http.put(url, data, { headers }); // Calls Axios' PUT method with headers and data
    return response.data; // Returns only the data from the response
  };

  // DELETE function with headers (includes the token in the request)
  const httpDeletetHeaders = async (url) => {
    const token = await getTokenFromStore(); // Gets the token from the store
    let headers = {
      Authorization: `Bearer ${token}`, // Adds the token to the Authorization header
    };
    let response = await http.delete(url, { headers }); // Calls Axios' DELETE method with headers
    return response; // Returns the full response (without filtering only the data)
  };

  // Returns the created functions to perform different HTTP requests
  return {
    httpGet,
    httpPost,
    httpDelete,
    httpPut,
    httpGetHeaders,
    httpPostHeaders,
    httpPutHeaders,
    httpDeletetHeaders,
    httpPatchHeaders,
  };
}
