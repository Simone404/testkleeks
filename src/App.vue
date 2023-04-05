<template>
  <section name="esercizio 3" >

    <div class="taskFrom">

      <BaseInput v-model:inputValue="inputText" />

      <BaseButton 
        :disabled="inputText === '' ? true:false" 
        :type="'solid'"
        @click="addTask">
        add task 
      </BaseButton>
    </div>

    <table v-if="tasks">
      <tr v-for="(task, index) in tasks" :key="task">
        <td :class="[(checkboxValue[index] ? 'line-through': '')]">{{ task }}</td>
        <td>
          <BaseButton 
            :type="'solid'"
            @click="deleteTask(task)">
            delete
          </BaseButton>
        </td>
        <td>
          <p>is completed?</p>
          <BaseCheckBox 
          v-model:checkBoxValue="checkboxValue[index]"
          />
        </td>
      </tr>
    </table>

    <div class="counters">
      <p> total tasks: {{ calculateTotalTasks() }}</p>
      <p> active tasks: {{ calculateActiveTasks() }}</p>
      <p> tasks done: {{ calculateDoneTasks() }} </p>
    </div>
  </section>

</template>

<script lang="ts">
import BaseButton from './components/BaseButton.vue';
import BaseInput from './components/BaseInput.vue';
import BaseCheckBox from './components/BaseCheckBox.vue';

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
      checkboxValue: [],
      message: '',
      checked: false,
      tasks: [],
    }
  },
  methods: {
    addTask(){
      this.tasks.push(this.inputText);
      this.inputText = '';
    },
    deleteTask(task) {
      this.tasks = this.tasks.filter((element) => {
        return element!==task;
      })
    },
    calculateTotalTasks(){
      return this.tasks.length;
    },
    calculateDoneTasks(){
      return  this.checkboxValue.filter((element) => {
        return element===true;
      }).length;
    },
    calculateActiveTasks(){
      return this.calculateTotalTasks() - this.calculateDoneTasks();
    }
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
