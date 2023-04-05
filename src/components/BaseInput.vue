<template>
  <div class="inputContainer">
    <input
    :value="inputValue"
    type="text"
    :placeholder="'edit me'"
    @input="$emit('update:inputValue', $event.target.value)"
    />
  </div>
</template>
  
  <script lang="ts">
  //import { Vue } from 'vue-class-component';

  export default {
    name: 'baseInput',

    props: {
      inputValue: {
          type: String,
          default: '',
          required: true
      }
    }
}
  </script>
  

  