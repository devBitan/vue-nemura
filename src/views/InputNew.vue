<script setup>
import { ref, defineEmits } from "vue";

const text = ref("");
const emits = defineEmits(["onNewItem"]);

function handleSubmit() {
  if (text != "") {
    emits("onNewItem", text);
    text.value = "";
  }
}
</script>

<template lang="pug">
form(action="" @submit.prevent="handleSubmit") 
    input.input(type="text" v-model="text" placeholder="New task" class="inputTask")
</template>
<style lang="scss" scoped>

.inputTask{
  padding: 10px;
  border: none;
  border-radius: 10px;
}
  
</style>
