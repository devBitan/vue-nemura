<template lang="pug">
  .login-seccion
    //- <h4 class="login-text">Manage your day, a project, an idea.</h4>
    form(
            autocomplete="off",
            @submit.prevent="validate()")
      h2 Login
      input(
          type="text",
          placeholder="Nickname",
          v-model="userConfirm.nickName",
      )
      input(
          type="password",
          placeholder="your pasword -One capital letter, one number",
          v-model="userConfirm.password",
          @change="checkPassword",
      )
      div
          button(
            type="submit",
            v-show="userConfirm.password != '' && userConfirm.password.length >= 8"
          ) Login user
      p if you dont have an account,
      strong(@click="$router.push({ path: '/register' })") please register.
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from '@/stores/user'; //importar el store
import { PASSWORD_REGEX } from '@/libs/regex';
import { authRegisterApi } from '@/assets/api/ApiAuth';
import { useRouter } from "vue-router";

const userStore = useUserStore(); // generar constante para usarlo
const { login } = authRegisterApi();
const router = useRouter();

let userConfirm = ref({
  nickName: "",
  password: "",
});

const passConfirm = ref("");
const passValidate = ref(false);


// validando contraseña
const checkPassword = () => {
  if (!PASSWORD_REGEX.test(userConfirm.value.password)) {
    alert(
      "the password must contain at least one capital letter, one number"
    );
    userConfirm.value.password = "";
    return;
  }
};


// confirmando contraseña
const ConfirmPass = () => {
  if (passConfirm.value == userConfirm.value.password) {
    passValidate.value = true;
    alert("Passwords do match");
    return;
  } else {
    passValidate.value = false;
    alert("Passwords do not match");
    passConfirm.value = "";
    return;
  }
};

const validate = async () => {
  if (
    (userConfirm.value.nickName != "root" &&
      (userConfirm.value.nickName == "" ||
        userConfirm.value.nickName.length < 5)) ||
    userConfirm.value.password == "" ||
    userConfirm.value.password.length < 8
  ) {
    alert("usuario o pass incorrecto.");
    userConfirm.value.nickName = "";
    userConfirm.value.password = "";
    return;
  } else {
    let response = await login(userConfirm.value);
    console.log(response);
    if (response) {
      //   $q.cookies.set("token_nemura", response.token, { expires: "90d" }); enviar el token al local storage
      // enviando información a la store
      userStore.setUser(response);
      userStore.setToken(response.token)
      router.push("/dashboard");
    } else {
      alert("usuario o pass incorrecto.");
      userConfirm.value.nickName = "";
      userConfirm.value.password = "";
    }
  }
};

</script>

<style lang="scss" scoped>
.login-seccion {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-blue);
  flex-direction: column;

  .login-text {
    font-size: 1.3rem;
    color: var(--color-white-soft);
    margin-top: 5rem;
  }

  form {
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
      background-color: var(--color-azulito);
      color: #fff;
      cursor: pointer !important;
      margin: 0 auto;
      transition: background-color 0.3s ease;

      /* Suaviza la transición */
      &:hover {
        background-color: var(--color-morado);
      }
    }

    strong {
      cursor: pointer;
      transition: color 0.2s ease;

      /* Suaviza la transición */
      &:hover {
        text-decoration: underline;
        color: var(--color-azulito);
        // transform: translateX(0.5rem);
      }
    }
  }

  @media (max-width: 768px) {

    // background-color: red;
    form {
      max-width: 330px;
      background-color: #1b2a47;
      color: white;
    }


  }
}
</style>