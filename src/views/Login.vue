<script setup>

import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import Task from '@/components/Task.vue';

</script>

<template>
  <main class="login">
    <div class="login-image">
      <img src="../assets/img/logoNemura.png" alt="logo-Nemura">
      <div>
        <h1>Nemura</h1>
        <span>Simple - practical - efficient.</span>
      </div>
    </div>
    <Login />
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
   .login-image {
    width: 7vh;
    height: 20vh;
    border-radius: 1px;
    img {
      max-width: 120px;
      margin-left: 16rem;
    };
   }
  }
}
</style>