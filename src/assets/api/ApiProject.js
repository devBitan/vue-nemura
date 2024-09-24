import { httpService } from "@/libs/https";

const {httpGet, httpPost, httpDelete, httpPut,httpPatchHeaders, httpGetHeaders, httpPostHeaders, httpPutHeaders, httpDeletetHeaders } = httpService();

// const apiUrl = "api/Catalogue/";
const apiUrl = "v1/";

export function projectsApi() {

  async function getProject() {
    let response = await httpGet(apiUrl + "projects");
    console.log(response)
    return response;
  }

  async function getProjectsByIdUser(id) {
    let response = await httpGetHeaders(apiUrl + "projects/ByUserId/"+ id);
    return response;
  }

  const postProject = async (project) => {
    let response = await httpPostHeaders(apiUrl + "projects", project);
    return response;
  };

  const patchProject = async (id, data) => {
    let response = await httpPatchHeaders(apiUrl + "projects/" + id, data);
    return response; 
  };

  const deleteProject = async (id) => {
    let response = await httpDeletetHeaders(apiUrl + "projects/" + id);
    return response;
  };

  return { getProject, postProject, patchProject, deleteProject, getProjectsByIdUser };
}
