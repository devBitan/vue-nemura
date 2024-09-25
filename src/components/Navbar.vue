<template>
    <aside :class="{'is-expanded': userStore.isExpanded}">
        <div class="logo" @click="$router.push({ path: '/dashboard' })" >
            <img src="../assets/img/logoNemura.png" alt="" >
            <p> Hi! {{ nameUser }}</p>
        </div>
        <div class="menu-toggle-wrap">
            <div class="menu-toggle" @click="ToggleMenu">
                <span class="material-icons">keyboard_double_arrow_right</span>
            </div>

        </div>
        <h3>Projects</h3>
        <form  action="" @submit.prevent="newProject(newProjectName)" @click="ToggleMenu" class="formProject">
          <input class="inputProject" type="text" placeholder="New Project" v-model="newProjectName" >
        </form>
        <div class="menu" v-for="project in projects" :key="project.name">
            <div class="button" @click="projectSelected(project.id, project.name)" >
                <span class="material-icons" @click="userStore.isExpanded = true">spa</span>
                <span class="text" @click="ToggleMenu" >{{ project.name }} </span>
            </div>
            <button class="material-icons" @click="projectDelete(project.id)">delete</button>

        </div>
        <div class="flex"></div>
        <div class="menu">
            <div class="button" @click="logout" >
                <span class="material-icons" >logout</span>
                <span class="text"> Logout</span>
                
            </div>
        </div>
    </aside>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { projectsApi } from '@/assets/api/ApiProject';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
const router = useRouter();
const route = useRoute();

const { getProject, postProject, patchProject, deleteProject, getProjectsByIdUser } = projectsApi();
const nameUser = computed(() => userStore.user.name);
onMounted(async () => {
  idUser = userStore.user.id;
  // nameUser = userStore.user.name;
  let responseProjects = await getProjectsByIdUser(idUser);
  projects.value = responseProjects;
  console.log("porjectos del user:",projects.value);
})

let idUser= ref();
// let nameUser = ref();
const projects = ref([])
let newProjectName = ref("")

const ToggleMenu = () => {
  userStore.isExpanded = !userStore.isExpanded;
}

const projectSelected = (id, name) => {
  router.push({ path: "/dashboard/" + `${name}` });
  userStore.idProject = id;
  userStore.nameProject= name;
}

const logout = async () => {
    console.log(userStore.user)
    userStore.user = null;
    userStore.isToken = null
    userStore.idProject = null;
    userStore.nameProject = null
    console.log(userStore.user)
    location.replace("/");
};

const newProject = async () => {
  let projectNew = {
    name: newProjectName.value,
    userId: idUser
  }
  if(projectNew.name !== ""){
    try {
      let response = await postProject(projectNew);
      console.log("Proyecto creado", response);
      let responseProjects = await getProjectsByIdUser(idUser);
      projects.value = responseProjects;
      newProjectName.value = "";
    } catch (error) {
      console.error("Error al crear proyecto", error);
    }
  }
}

async function projectDelete(projectId) {
    console.log(projectId);
    try {
      let response = await deleteProject(projectId)
      console.log(response);
      if(response){

        // Refresca la lista de projectos después de la actualización
        let responseProjects = await getProjectsByIdUser(idUser);
        projects.value = responseProjects;
      }
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
}
</script>

<<style lang="scss" scoped>
/*sidebar*/
aside {
  display: flex;
  flex-direction: column;
  width: calc(2rem + 36px);
  min-height: 100vh;
  overflow: hidden;
  background-color: #1b2a47; /* Un color oscuro para contraste */
  color: var(--color-white-soft);
  padding: 1rem;
  transition: 0.2s ease-out;
  border-right: 3px solid rgba(255, 255, 255, 0.1);

  .flex{
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    display: flex;
    // justify-content: center;
    // flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    
    img {
      width: 2.5rem;
      filter: invert(1);
    }

  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    // position: relative;
    top: 1rem;
    transition: 0.2s ease-out;
    // margin-top: 1rem;

    .menu-toggle {
      transition: 0.2s ease-out;

      cursor: pointer;

      .material-icons {
        font-size: 2rem;
        color: var(--color-white-soft);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons {
          color: var(--color-verde);
          transform: translateX(0.5rem);

        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  h3 {
    color: var(--color-verde);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .menu {
    margin: 0 -.9rem;
    display: flex;
    padding: 5px;
    justify-content: space-between;
    cursor: pointer !important;
    button {
      border: none;
      padding: 0 5px;
      border-radius: 9px;
      margin: 6px 0;
      background-color: #1b2a47; 
      color:white;
      &:hover {
          color: var(--color-naranja);
          transform:scale(1rem);
          background-color: var(--color-blue);

      }

    }

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-icons {
        font-size: 2rem;
        color: var(--color-white-soft);
        transition: 0.3s ease-out;
      }
      .text {
        max-width: 120px;
        overflow: hidden;
      }
      &:hover {
        .material-icons {
          color: var(--color-verde);
          transform: translateX(0.5rem);

      }
      }

      .text {
        color: var(--color-white-soft);
        transition: 0.3s ease-out;
      }
      &:hover ~&.router-link-exact-active{
        background-color: var(--color-azulito);
        transition: 0.3s ease-out;
        .material-icons, .text {
          color: var(--color-verde);
        }

      }
      &.router-link-exact-active {
        border-right: 5px solid var(--color-verde);
      }
    }

  }

  &.is-expanded {
    width: 300px;

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }

    }

    h3,
    .button .text  {
      opacity: 1;

    }
    .button {
      .material-icons {
        margin-right: 1rem;
      }
     
    }
  }


  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}

.formProject{
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: .2rem;
  opacity: .2;
  .inputProject {
    padding: 10px;
    border-radius: 12px;
    border: none;
    
  }
}
    
</style>>