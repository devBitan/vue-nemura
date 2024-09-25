<template lang="pug">
  main.dashboard
    Navbar
    .dashboard-table
      h1.title {{nameProject}}
      .board-container
        div.board(@drop="onDrop($event, board)" @dragover.prevent @dragenter.prevent v-for="board in boards" :key="board.id")
          div {{ board.name }}
          InputNew(@on-new-item="(text) => handleNewItem(text)"  v-if="board.enumValue === 0")
          .item(draggable="true" @dragstart="startDrag($event, board, item)" 
            v-for="item in filteredAssignments(board)" 
            :key="item?.id")
            Task(:item="item" :boardId="board.id" @delete-task="deleteItem(item.id)" @update-task="updateItem")
  </template>
  
  <script setup>
  import { onMounted, reactive, ref, watchEffect, computed, onUpdated } from "vue";
  import Navbar from '@/components/Navbar.vue';
  import Task from '@/components/Task.vue';
  import InputNew from "./InputNew.vue";
  import { assignmentApi } from "@/assets/api/ApiAssigment";
  import { projectsApi } from "@/assets/api/ApiProject";
  import { useUserStore } from "@/stores/user";
  
  const userStore = useUserStore();

  const { getAssignment, postAssignment, putAssignment, deleteAssignment, getAssignmentByProjectId,patchAssignment } = assignmentApi();
  const idProject = computed(() => userStore.idProject);
  const nameProject = computed(() => userStore.nameProject);
  let assignments = ref([]);
  let boards = reactive([
    {
      id: 1,
      name: "To Do",
      enumValue: 0,
      items: [],
    },
    {
      id: 2,
      name: "In progres",
      enumValue: 1,
      items: [],
    },
    {
      id: 3,
      name: "Complete",
      enumValue: 2,
      items: [],
    },
  ]);
  
  watchEffect(async () => {
    let responseAssignment = await getAssignmentByProjectId(idProject.value);
    assignments.value = responseAssignment;
  });
  
  async function handleNewItem(text) {
    let newAssignment = {
      name: text.value,
      description: "",
      status: 0,
      priority: 0,
      projectId: idProject.value,
    };
    try {
      let responseAddAssignment = await postAssignment(newAssignment);
      let responseAssignment = await getAssignmentByProjectId(idProject.value);
      assignments.value = responseAssignment;
    } catch (error) {
      console.error("Error creando la nueva tarea:", error);
    }
  }
  
  function startDrag(evt, board, item) {
    evt.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ boardId: board.id, itemId: item.id })
    );
  }
  
  async function onDrop(evt, destBoard) {
    const { boardId, itemId } = JSON.parse(evt.dataTransfer.getData("text/plain"));
    const originItem = assignments.value.find((item) => item.id == itemId);
    // Actualiza el status de la tarea al enum del board de destino
    originItem.status = destBoard.enumValue;
    let statusUpdate = {
      status: destBoard.enumValue,
    }

    try {
      // Actualiza la tarea en el backend
      await patchAssignment(originItem.id,statusUpdate);
      // Refresca la lista de tareas después de la actualización
      let responseAssignment = await getAssignmentByProjectId(idProject.value);
      assignments.value = responseAssignment;
    } catch (error) {
      console.error("Error actualizando el estado de la tarea:", error);
    }
  }
  
  function filteredAssignments(board) {
    return assignments.value.filter(
      (assignment) => assignment.status === board.enumValue
    );
  }
  
  async function deleteItem(item) {
    console.log("el id es:", item);
    // board.items = board.items.filter((i) => i !== item);
    try {
      let response = await deleteAssignment(item)
      console.log("la respuesta de eliminar", response);
      if(response){

        // Refresca la lista de tareas después de la actualización
      let responseAssignment = await getAssignmentByProjectId(idProject.value);
      assignments.value = responseAssignment;
      }
    } catch (error) {
      console.error("Error eliminando la tarea:", error);
    }
}

async function updateItem(id,updatedAssignment) {
  console.log(updatedAssignment);
  try {
    let responseUpdate = await putAssignment(id, updatedAssignment);
    console.log(responseUpdate);
    let responseAssignment = await getAssignmentByProjectId(idProject.value);
    assignments.value = responseAssignment;
  } catch (error) {
    console.log("Error actualizando tarea", error);
  }
}

</script>

<style lang="scss" scoped>
.dashboard-table {
  width: 100vw;
  text-align: center;
  /* border: 5px solid tomato; */
  min-height: 100vh;
  padding: .5rem;
  
  .board-container {
    /* border: 2px solid rgb(29, 10, 7); */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    position: relative;
    margin: 0 2.6rem;

    .board {
      color: rgba(255, 255, 255, 0.893);
      // color: black;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.735);
      width: 32%;
      /* min-width: 300px; */
      min-height: 35vh;
      max-height: 85vh;
      height: 100%;
      border-radius: 12px;
      background-color: var(--color-blue);
      // background-color: #F2F3F5;
      padding: 1rem;
      font-size: 2rem;
      overflow: auto !important;
    }

    @media (max-width: 768px) {
      margin: 0 0 0 4rem;
      justify-content: center;
      /* background-color: red; */
      .board {
        max-width: 250px;
        max-height: 350px;
        min-width: 260px;
      }
    }
  }
}

.title {
  margin: .5vh;
}
</style>
