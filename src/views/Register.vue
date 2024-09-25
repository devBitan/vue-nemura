<script setup>

import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Task from '@/components/Task.vue';
// validar  para que se muestre el compoente de registro o el de login
</script>

<template>
  <main class="login">
    <Register class="registerC" />
    <div class="login-image">
      <div>
        <h1>Nemura</h1>
        <span>Simple - practical - efficient.</span>
      </div>
      <img src="../assets/img/logoNemura.png" alt="logo-Nemura">
    </div>
  </main>
</template>
<!--  validar el loal stora si esta el toekn si no mandarlo al registro   mejor con un boton -->
<style lang="scss" scoped>
.login {
  width: 100vw;
  display: flex;
  justify-content: center;

  .login-image {
    background-color: var(--color-white-soft);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;

    img {
      max-width: 350px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding-top: 2rem;
   .login-image {
     order: 2; /* Aparece segundo en pantallas pequeñas */
     width: 10vh;
     height: 20vh;
     img {
      max-width: 130px;
      margin-left: 11em;
    };
   }
 
   .registerC {
     order: 1; /* Aparece primero en pantallas pequeñas */
   }
  }

}
</style>
