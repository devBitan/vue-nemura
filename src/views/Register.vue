<script setup>

import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Task from '@/components/Task.vue';
// validar  para que se muestre el compoente de registro o el de login
</script>

<template>
  <main class="login">
    <Register />
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
<style lang="scss">
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
   .login-image {
    width: 10vh;
    height: 30vh;
    img {
      max-width: 130px;
      margin-left: 15rem;
    };
   }
  }

}
</style>
