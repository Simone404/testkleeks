<template>
  <section name="esercizio 3" >

    <form class="taskFrom">

      <BaseInput v-model:inputValue="inputText" />

      <BaseButton 
        :disabled="inputText === '' ? true:false" 
        :type="'solid'"
        @click="addTask">
        text given using slot 
      </BaseButton>
    </form>

    <table>
      <tr v-for="task in tasks" >
        <td>{{task}}</td>
        <td>
          <BaseButton 
            :disabled="inputText === '' ? true:false" 
            :type="'solid'"
            @click="buttonClick">
            text given using slot 
          </BaseButton>
        </td>
        <td>
          <p>is checked? {{ checkboxValue }}</p>
          <BaseCheckBox v-model:checkBoxValue="checkboxValue"/>
        </td>
      </tr>
    </table>
  </section>

</template>

<script lang="ts">
import BaseButton from './components/BaseButton.vue';
import BaseInput from './components/BaseInput.vue';
import BaseCheckBox from './components/BaseCheckBox.vue';
import { nullableTypeAnnotation } from '@babel/types';

export default {
  name: 'App',
  components: {
    BaseButton,
    BaseInput,
    BaseCheckBox,
  },
  data() {
    return {
      inputText: '',
      checkboxValue: false,
      message: '',
      checked: false,
      tasks: () => [],
    }
  },
  methods: {
    addTask(){
      this.tasks.push(this.inputText);
    },
    buttonClick() {return null;}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
