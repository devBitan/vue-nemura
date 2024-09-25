<template>
  <div class="task-container" @click="editSelectedAssignment(item)">
    <p class="task-container-title">{{ item.name }}</p>
    <div class="task-container-items">
      <div class="task-container-items-id"> <span>id: </span> {{ item.id }}</div>
      <div class="task-container-items-priority" :class="{
        'priority-low': item.priority === 0,
        'priority-medium': item.priority === 1,
        'priority-high': item.priority === 2
      }"> {{ priorityMapping[item?.priority] }}</div>
    </div>
  </div>
  <div class="modal" v-if="showModal">
    <form @submit.prevent>
      <div class="modal-container">
        <div class="modal-container-title">
          <input type="text" v-model="selectedAssignment.name">
          <p>id: {{ idTask }}</p>
        </div>
        <div class="modal-container-priority">
          <p>Priority</p>
          <button @click="setPriority(0)" :class="{ 'selected-priority-low': selectedAssignment.priority === 0 }">
            {{ priorityMapping[0] }}
          </button>
          <button @click="setPriority(1)" :class="{ 'selected-priority-medium': selectedAssignment.priority === 1 }">
            {{ priorityMapping[1] }}
          </button>
          <button @click="setPriority(2)" :class="{ 'selected-priority-high': selectedAssignment.priority === 2 }">
            {{ priorityMapping[2] }}
          </button>
        </div>
      </div>

      <textarea placeholder="escribe " class="modal-container-textarea"
        v-model="selectedAssignment.description"></textarea>
      <div class="modal-container-btns">
        <button @click="changeModal()" class="close">Close</button>
        <button @click="updateTask()" class="save">Save</button>
        <button @click="emitDelete(item.id)" class="delete">Delete</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';
import { ref, computed } from 'vue';
import { assignmentApi } from '@/assets/api/ApiAssigment';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const { putAssignment, getAssignmentByProjectId } = assignmentApi()
const idProject = computed(() => userStore.idProject);
let showModal = ref(false);
let idTask = ref(0)

const priorityMapping = {
  0: 'Low',
  1: 'Medium',
  2: 'High'
};
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  boardId: { // Identificador del proyecto/tablero
    type: Number,
    required: true
  }
});

let selectedAssignment = ref({
  name: "",
  description: "",
  status: "",
  priority: "",
});

const changeModal = () => {
  showModal.value = !showModal.value;
  return showModal.value;
}

const emit = defineEmits(['delete-task', 'update-task']); // Definir los eventos que se emitirán

const emitDelete = () => {
  emit('delete-task', props.item.id);
  changeModal()
};

async function editSelectedAssignment(item) {
  selectedAssignment.value.name = item.name;
  selectedAssignment.value.description = item.description;
  selectedAssignment.value.status = item.status;
  selectedAssignment.value.priority = item.priority;
  idTask.value = item.id;
  console.log(selectedAssignment.value)
  changeModal();
}

const updateTask = () => {
  emit('update-task', idTask.value, selectedAssignment.value);
  changeModal()
}
function setPriority(priorityValue) {
  selectedAssignment.value.priority = priorityValue;
}
</script>


<style lang="scss" scoped>
.task-container {
  background-color: var(--color-azulito);
  width: 100%;
  max-width: 450px;
  height: 120px;
  border-radius: 12px;
  padding: 12px;
  margin: 1.4rem auto;
  box-shadow: 0 0 10px rgba(210, 207, 207, 0.327);
  color: white;
  cursor: pointer;

  // &:hover {
  //   background-color: lightblue;
  // }

  // &:active {
  //   background-color: darkblue;
  // }
  .task-container-title {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.655);
    text-align: start;
  }

  .task-container-items {
    display: flex;
    justify-content: space-between;
    margin-top: 2.4rem;
    align-items: center;

    .task-container-items-id {
      font-size: 17px;
      color: rgba(175, 170, 170, 0.655);
    }

    .task-container-items-priority {
      border-radius: 8px;
      padding: 4px 7px;
      color: rgb(58, 55, 55);
      font-size: 15px;
      line-height: 1.1em;

      &.priority-low {
        background-color: var(--color-verde); // Verde para prioridad baja
      }

      &.priority-medium {
        background-color: var(--color-amarillo); // Amarillo para prioridad media
      }

      &.priority-high {
        background-color: var(--color-naranja); // Naranja para prioridad alta
      }
    }
  }
}

.modal {
  background-color: var(--color-azulito);
  position: absolute;
  z-index: 10;
  // border: 1px solid tomato;
  width: 100%;
  max-width: 450px;
  min-width: 290px;
  height: 370px;
  border-radius: 12px;
  padding: 12px;
  margin: 2rem auto;
  box-shadow: 0 0 10px rgba(8, 8, 8, 0.925);
  color: white;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  .modal-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;

    h3 {
      font-size: 20px;
    }

    p {
      font-size: 15px;
      margin-left: 5px;
      color: rgba(175, 170, 170, 0.655);
    }

    .modal-container-title {
      text-align: start;

      input {
        padding: 7px;
        border-radius: 9px;
        border: none;
      }
    }

    .modal-container-priority {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      button {
        padding: 5px 13px;
        border-radius: 10px;
        border-style: none;
        box-shadow: 0 0 10px rgba(8, 8, 8, 0.514);
        margin: 5px;
        cursor: pointer;
        background-color: lightgray;
        color: black;

        // Prioridad baja
        &.selected-priority-low {
          background-color: var(--color-verde); // Verde claro
          color: black;
        }

        // Prioridad media
        &.selected-priority-medium {
          background-color: var(--color-amarillo); // Amarillo
          color: black;
        }

        // Prioridad alta
        &.selected-priority-high {
          background-color: var(--color-naranja); // Naranja o rojo fuerte
          color: white;
        }
      }

    }

    @media (max-width: 768px) {
      flex-direction: column;

      .modal-container-priority {
        flex-wrap: nowrap;
      }
    }

  }

  .modal-container-textarea {
    width: 90%;
    height: 200px;
    padding: 12px;
    margin: .5rem;
    border-radius: 12px;
  }

  .modal-container-btns {
    display: flex;
    justify-content: center;

    button {
      padding: 5px 13px;
      border-radius: 10px;
      margin: 0px 7px;
      border-style: none;
      color: rgb(48, 46, 46);
      box-shadow: 0 0 10px rgba(8, 8, 8, 0.541);
      cursor: pointer !important;

      &.close {
        background-color: var(--color-amarillo);
      }

      &.save {
        background-color: var(--color-verde);

      }

      &.delete {
        background-color: var(--color-naranja);
      }
    }
  }

  @media (max-width: 768px) {
    margin: 0 0 0 0;
    max-width: 290px;
    height: 400px;
  }
}
</style>