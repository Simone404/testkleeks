<template>
  <section name="esercizioFE" class="container px-4 mx-auto" >
    <div >

      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex items-center gap-x-3">
          <h4 class="ml-4 text-xl font-bold text-navy-700 dark:text-white">
                  To Do list:
              </h4>
            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">total tasks: {{ calculateTotalTasks() }}</span>
            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">active tasks: {{ calculateActiveTasks() }}</span>
            <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">done tasks: {{ calculateDoneTasks() }}</span>
        </div>
        <div class="flex items-center mt-4 gap-x-3">
          <BaseInput 
            v-model:inputValue="inputText"
            :placeHolder="'Insert New Task Here'" />
          <BaseButton 
            :disabled="inputText === '' ? true:false" 
            :type="'solid'"
            :textTransform="'uppercase'"
            @click="addTask">
            add task 
          </BaseButton>
        </div>
      </div>

      <div name="filters" class="mt-10 md:flex md:items-center md:justify-between">
        <div class="inline-flex overflow-hidden bg-white divide-x dark:bg-gray-900 rtl:flex-row-reverse dark:divide-gray-700">
          <div class="mr-5">
            <BaseButton 
              :disabled="tasks.length ? false:true" 
              :type="currentFilter===all ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterAll">
              All tasks
            </BaseButton>
          </div>
          <div class="mr-5">
            <BaseButton 
              :disabled="tasks.length ? false:true" 
              :type="currentFilter===active ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterActives">
              Active tasks
            </BaseButton>
          </div>
          <div class="mr-5">
            <BaseButton 
              :disabled="tasks.length ? false:true" 
              :type="currentFilter===notactive ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterDone">
              Done tasks 
            </BaseButton>
          </div>
        </div>
      </div>

      <div class="flex flex-col mt-6">
          <table v-if="tasks" class="table-auto">
            <!-- <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                  Task content
                </th>
                <th class="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                  Delete task
                </th>
                <th class="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400">
                  Complete task
                </th>
              </tr>
            </thead> -->
            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
              <tr v-for="(task) in tasks" :key="task" v-show="checkFilter(task)">
                <td :class="[(task.active === true ? 'line-through': ''), 'px-4 py-4 text-sm font-medium whitespace-nowrap text-left']">{{ task.name }}</td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap w-1/12">
                  <BaseButton 
                    :type="'text'"
                    :textTransform="'uppercase'"
                    @click="deleteTask(task)">
                    delete
                  </BaseButton>
                </td>
                <td class="px-4 py-4 text-sm font-medium whitespace-nowrap w-1/12">
                  <BaseCheckBox 
                  v-model:checkBoxValue="task.active"
                  />
                </td>
              </tr>
            </tbody>
          </table>
      </div>
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
      all: 'all',
      active: 'active',
      notactive: 'notactive',
      currentFilter: 'all',
    }
  },
  computed: {
    checkboxChanged() {
      return this.tasks.map(task => task.active)
    }
  },
  watch: {
    tasks: {
      handler() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
      },
      deep: true
    },
    checkboxChanged: function(){
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
  },
  mounted() {
    if(localStorage.getItem('tasks')) 
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
      console.log(this.tasks);
  },
  methods: {
    addTask(){
      this.tasks.push({'name': this.inputText, 'active': false});
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
      return  this.tasks.filter((task) => {
        return task.active===true;
      }).length;
    },
    calculateActiveTasks(){
      return  this.tasks.filter((task) => {
        return task.active===false;
      }).length;
    },
    checkFilter(task) {
      return (this.currentFilter===this.all) 
        || (this.currentFilter === this.active&& task.active || this.currentFilter === this.notactive && !task.active) 
        ? true : false;
    },

    filterAll(){
      this.currentFilter = this.all;
    },
    filterActives(){
      this.currentFilter = this.active;
    },
    filterDone(){
      this.currentFilter = this.notactive;
    },
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
