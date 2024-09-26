// Register
import { httpService } from "@/libs/https"; // Imports the HTTP service from the libs folder

const { httpPost } = httpService(); // Extracts the httpPost method from the HTTP service

const apiUrl = "v1/auths/"; // Defines the base path for the authentication endpoints

// Function that handles the registration and login requests
export function authRegisterApi() {
  
  // Function to register a new user
  const register = async (userCreate) => {
    let response = await httpPost(apiUrl + "Register", userCreate); // Makes a POST request to the API with the user data
    return response; // Returns the response from the request
  };

  // Function to log in with an existing user
  const login = async (userConfirm) => {
    let response = await httpPost(apiUrl + "Login", userConfirm); // Makes a POST request to the API with the login data
    return response.data; // Returns only the data from the response
  };
  
  // Returns the register and login functions
  return {
    register,
    login,
  };
}
