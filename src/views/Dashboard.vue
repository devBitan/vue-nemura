<template lang="pug">
  main.dashboard
    Navbar
    form.dashboard-User
      h3 Hi {{nameUser}}
      div this page is for change your personal data 
      p Name
      input(
        type="text",
        v-model="nameUser"
      )
      p Last Name
      input(
        type="text",
        v-model="lastNameUser"
      )
      p Email
      input(
        type="email",
        v-model="emailUser"
      )
      p Nickname
      input(
        type="text",
        v-model="nickUser"
      )
      br
      button update
     
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const idUser = computed(() => userStore.user.id);
const nameUser = computed(() => userStore.user.name);
const emailUser = computed(() => userStore.user.email);
const lastNameUser = computed(() => userStore.user.lastName);
const nickUser = computed(() => userStore.user.nickName);

//esteban -colombia15
//prueba - Colombia15
</script>
<style lang="scss" scoped>
.dashboard-User {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(8, 8, 8, 0.432);
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: auto auto;
  padding: 22px;
  text-align: center;

  input {
    width: 100%;
    padding: 12px;
    min-width: 250px;
    border-radius: 5px;
    border: 1px solid #ccc;
    outline: none;
  }

  button {
    width: 50%;
    padding: 10px;
    border-radius: 5px;
    background-color: var(--color-blue);
    color: #fff;
    cursor: pointer;
    margin: 0 auto;
  }

  strong {
    cursor: pointer;
  }

  @media (max-width: 568px) {
    max-width: 300px;
    padding: 12px;
    margin-left: 4rem;
    
  }

}
</style>
