import { httpService } from "@/libs/https"; // Import the HTTP service from the libs folder

// Destructure the available HTTP methods from the httpService
const { 
  httpGet, 
  httpPost, 
  httpDelete, 
  httpPut, 
  httpGetHeaders, 
  httpPostHeaders, 
  httpPutHeaders, 
  httpDeletetHeaders, 
  httpPatchHeaders 
} = httpService();

// Define the base API URL for assignments
const apiUrl = "v1/";

// Function that handles assignment-related API requests
export function assignmentApi() {

  // Function to get all assignments
  async function getAssignment() {
    let response = await httpGet(apiUrl + "assignments"); // Makes a GET request to the "assignments" endpoint
    return response; // Returns the response from the request
  }

  // Function to get assignments by project ID (authenticated request)
  async function getAssignmentByProjectId(id) {
    let response = await httpGetHeaders(apiUrl + "assignments/ByProjectId/" + id); // Makes a GET request with headers (token) for a specific project
    return response; // Returns the response from the request
  }

  // Function to create a new assignment (authenticated request)
  const postAssignment = async (data) => {
    let response = await httpPostHeaders(apiUrl + "assignments", data); // Makes a POST request with headers to create a new assignment
    return response; // Returns the response from the request
  };

  // Function to update assignment status using PATCH (authenticated request)
  const patchAssignment = async (id, data) => {
    let response = await httpPatchHeaders(apiUrl + "assignments/status/" + id, data); // Makes a PATCH request with headers to update assignment status
    return response; // Returns the response from the request
  };

  // Function to fully update an assignment using PUT (authenticated request)
  const putAssignment = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "assignments/" + id, data); // Makes a PUT request with headers to update an assignment
    return response; // Returns the response from the request
  };

  // Function to delete an assignment using DELETE (authenticated request)
  const deleteAssignment = async (id) => {
    console.log("The ID sent for deletion is", id); // Logs the ID being sent for deletion
    let response = await httpDeletetHeaders(apiUrl + "assignments/" + id); // Makes a DELETE request with headers to remove an assignment
    return response; // Returns the response from the request
  };
   // Return all the functions so they can be used outside this module
  return { getAssignment, postAssignment, putAssignment, deleteAssignment, getAssignmentByProjectId,patchAssignment };
}
