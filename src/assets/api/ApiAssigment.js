import { httpService } from "@/libs/https";

const {httpGet, httpPost, httpDelete, httpPut, httpGetHeaders, httpPostHeaders, httpPutHeaders, httpDeletetHeaders, 
  httpPatchHeaders
 } = httpService();

// const apiUrl = "api/Catalogue/";
const apiUrl = "v1/";

export function assignmentApi() {

  async function getAssignment() {
    let response = await httpGet(apiUrl + "assignments");
    return response;
  }

  async function getAssignmentByProjectId(id) {
    let response = await httpGetHeaders(apiUrl + "assignments/ByProjectId/" + id);
    return response;
  }

  const postAssignment = async (data) => {
    let response = await httpPostHeaders(apiUrl + "assignments", data);
    return response;
  };

  const patchAssignment = async (id, data) => {
    let response = await httpPatchHeaders(apiUrl + "assignments/status/" + id, data);
    return response; // organizar este 
  };
  const putAssignment = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "assignments/" + id, data);
    return response; // organizar este 
  };

  const deleteAssignment = async (id) => {
    console.log("el id que envio para eliminar es", id)
    let response = await httpDeletetHeaders(apiUrl + "assignments/" + id);
    return response;
  };

  return { getAssignment, postAssignment, putAssignment, deleteAssignment, getAssignmentByProjectId,patchAssignment };
}
