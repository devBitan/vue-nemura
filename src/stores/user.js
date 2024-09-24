import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      user: {
        id: 0,
        name: "",
        lastName: "",
        email: "",
        nickName: "",
        password: "",
        token:""
      },
      idProject:0,
      nameProject:"",
      isExpanded:false,
      isToken:""
    };
  },
  actions: {
    async getUser() {
      return this.user;
    },
    
    setUser(user) {
      this.user = user;
    },

    async getProject() {
      return this.idProject;
    },
    
    setProject(idProject) {
      this.idProject = idProject;
    },
    async getNameProject() {
      return this.nameProject;
    },
    
    setNameProject(nameProject) {
      this.nameProject = nameProject;
    },

    async getExpanded() {
      return this.isExpanded;
    },
    
    setExpanded(isExpanded) {
      this.isExpanded = isExpanded;
    },
    async getToken() {
      return this.isToken;
    },
    
    setToken(isToken) {
      this.isToken = isToken;
    },
  },
  persist: true
});
