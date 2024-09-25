<template lang="pug">
.register-seccion
  //- <h4 class="login-text">Manage your day, a project, an idea.</h4>
  form(
          autocomplete="off",
          @submit.prevent="validate()")
    h2 Register
    input(
        type="text",
        v-model="userCreate.name",
        placeholder="Name"
    )
    input(
        type="text",
        placeholder="Last name",
        v-model="userCreate.lastName",
    )
    input(
        type="email",
        placeholder="email",
        v-model="userCreate.email", 
        @change="checkEmail",
    )
    input(
        type="text",
        placeholder="Nickname",
        v-model="userCreate.nickName",
    )
    input(
        type="password",
        placeholder="your pasword -One capital letter, one number",
        v-model="userCreate.password",
        @change="checkPassword",
    )
    input(
        type="password",
        placeholder="Repeat your password",
        v-model="passConfirm",,
        @change="ConfirmPass", 
    )
    div
        button(
          type="submit",
          v-show="userCreate.password != '' && userCreate.password.length >= 8",
        ) Create user
    p if you already have an account,
    strong(@click="$router.push({ path: '/' })") please login.
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useUserStore } from '@/stores/user'; //importar el store
import { EMAIL_REGEX, PASSWORD_REGEX } from '@/libs/regex';
import { authRegisterApi } from '@/assets/api/ApiAuth';
import { useRouter } from "vue-router";

const userStore = useUserStore(); // generar constante para usarlo
const { register } = authRegisterApi();

const passConfirm = ref("");
const passValidate = ref(false);
const router = useRouter();
let userCreate = ref({
  nickName: "",
  name: "",
  lastName: "",
  password: "",
  email: "",
});

// validando contraseña
const checkPassword = () => {
  if (!PASSWORD_REGEX.test(userCreate.value.password)) {
    alert(
      "the password must contain at least one capital letter, one number')"
    );
    userCreate.value.password = "";
    return;
  }
};

// confirmando contraseña
const ConfirmPass = () => {
  if (passConfirm.value == userCreate.value.password) {
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

// validando email
const checkEmail = async () => {
  if (!EMAIL_REGEX.test(userCreate.value.email)) {
    alert("invalid email address, please use @");
    userCreate.value.email = "";
    return;
  }
};

const validate = async () => {
  if (
    userCreate.value.nickName == "" ||
    userCreate.value.nickName.length < 5 ||
    userCreate.value.password == "" ||
    userCreate.value.password.length < 8
  ) {
    alert("please enter the fields.");
    return;
  }
  let response = await register(userCreate.value);
  console.log(response)
  if (response) {
    alert("User created!");
    router.push("/");
  } else {
    userCreate.value.name = "";
    userCreate.value.lastName = "";
    userCreate.value.email = "";
    userCreate.value.nickName = "";
    userCreate.value.password = "";
    alert("incorrect data");
  }

};
</script>

<style lang="scss" scoped>
.register-seccion {
  //  display: flex;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-blue);
  flex-direction: column;

  .register-text {
    font-size: 1rem;
    color: var(--color-white-soft);
    margin-top: 1rem;
  }


  form {
    // border: 1px solid black;
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
      cursor: pointer;
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