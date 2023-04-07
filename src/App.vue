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
              :disabled="tasksArray.tasks.length ? false:true" 
              :type="currentFilter===all ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterAll">
              All tasks
            </BaseButton>
          </div>
          <div class="mr-5">
            <BaseButton 
              :disabled="tasksArray.tasks.length ? false:true" 
              :type="currentFilter===active ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterActives">
              Active tasks
            </BaseButton>
          </div>
          <div class="mr-5">
            <BaseButton 
              :disabled="tasksArray.tasks.length ? false:true" 
              :type="currentFilter===notactive ? 'solid' : 'outline'"
              :textTransform="'capitalize'"
              @click="filterDone">
              Done tasks 
            </BaseButton>
          </div>
        </div>
      </div>
      <div class="flex flex-col mt-6">
          <table v-if="tasksArray.tasks" class="table-auto">
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
              <tr v-for="(task) in tasksArray.tasks" :key="task" v-show="checkFilter(task)">
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
import {onBeforeMount, watch, computed, ref, reactive} from 'vue'

export default {
  name: 'App',
  components: {
    BaseButton,
    BaseInput,
    BaseCheckBox,
  },
  setup() {
    let inputText = ref('');
    let tasksArray = reactive({tasks: []});
    let currentFilter = ref('all');
    const all = 'all';
    const active = 'active';
    const notactive = 'notactive';

    onBeforeMount(()=>{
      if(localStorage.getItem('tasks')) 
      tasksArray.tasks = JSON.parse(localStorage.getItem('tasks'));
    });
    const checkboxChanged =  computed(() => {
      return tasksArray.tasks.map(task => task.active);
    })

    watch(checkboxChanged, ()=>{  
      localStorage.setItem('tasks', JSON.stringify(tasksArray.tasks));

    });
    watch(() => tasks => {
        localStorage.setItem('tasks', JSON.stringify(tasksArray.tasks));
      },
      { deep: true }
    );

    function addTask(){
      tasksArray.tasks.push({'name': inputText.value, 'active': false});
      inputText.value = '';
    };
    function deleteTask(task) {
      tasksArray.tasks = tasksArray.tasks.filter((element) => {
        return element!==task;
      })
    };
    function calculateTotalTasks(){
      return tasksArray.tasks.length;
    };
    function calculateDoneTasks(){
      return  tasksArray.tasks.filter((task) => {
        return task.active===true;
      }).length;
    };
    function calculateActiveTasks(){
      return  tasksArray.tasks.filter((task) => {
        return task.active===false;
      }).length;
    };
    function checkFilter(task) {
      return (currentFilter.value===all) 
        || (currentFilter.value === active&& task.active || currentFilter.value === notactive && !task.active) 
        ? true : false;
    };

    function filterAll(){
      currentFilter.value = all;
    };
    function filterActives(){
      currentFilter.value = active;
    };
    function filterDone(){
      currentFilter.value = notactive;
    };

    return {
      filterDone,
      filterActives,
      filterAll,
      checkFilter,
      calculateActiveTasks,
      calculateDoneTasks,
      calculateTotalTasks,
      deleteTask,
      addTask,
      tasksArray,
      inputText,
      all,
      active,
      notactive,
      currentFilter
    }
  },
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
