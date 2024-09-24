import axios from "axios";
import { useUserStore } from "@/stores/user";

// Función para obtener el token después de la inicialización de Pinia
async function getTokenFromStore() {
  // En lugar de acceder a la store globalmente, se accede dentro de una función
  const userStore = useUserStore();
  return userStore.getToken();
}

// Servicio HTTP con axios
export function httpService() {
  let http = axios.create({
    baseURL: "https://nemura.azurewebsites.net/api/",
  });

  // Verificar si hay un token
  async function hasToken() {
    const token = await getTokenFromStore();
    return token ? true : false;
  }

  function backLogin() {
    window.location = "/";
  }

  // Interceptor de solicitudes
  http.interceptors.request.use(
    async (config) => {
      const tokenAvailable = await hasToken();
      if (!tokenAvailable) {
        backLogin();
        return Promise.reject("No token available");
      }

      // Obtener el token desde la store y agregarlo a los headers
      const token = await getTokenFromStore();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      backLogin();
      return Promise.reject(error);
    }
  );

  // Interceptor de respuesta
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const httpGet = async (url) => {
    let response = await http.get(url);
    return response.data;
  };

  const httpPost = async (url, data) => {
    let response = await http.post(url, data);
    return response.data;
  };

  const httpDelete = async (url, data) => {
    let response = await http.delete(url, data);
    return response.data;
  };

  const httpPut = async (url, data) => {
    let response = await http.put(url, data);
    return response.data;
  };

  const httpGetHeaders = async (url) => {
    const token = await getTokenFromStore();  // Obtener el token desde la store
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await http.get(url, { headers });
    return response.data;
  };

  const httpPostHeaders = async (url, data) => {
    const token = await getTokenFromStore(); 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await http.post(url, data, { headers });
    return response.data;
  };

  const httpPatchHeaders = async (url, data) => {
    const token = await getTokenFromStore(); 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await http.patch(url, data, { headers });
    return response.data;
  };

  const httpPutHeaders = async (url, data) => {
    const token = await getTokenFromStore(); 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await http.put(url, data, { headers });
    return response.data;
  };

  const httpDeletetHeaders = async (url) => {
    const token = await getTokenFromStore(); 
    let headers = {
      Authorization: `Bearer ${token}`,
    };
    let response = await http.delete(url, { headers });
    return response;
  };

  return {
    httpGet,
    httpPost,
    httpDelete,
    httpPut,
    httpGetHeaders,
    httpPostHeaders,
    httpPutHeaders,
    httpDeletetHeaders,
    httpPatchHeaders
  };
}
