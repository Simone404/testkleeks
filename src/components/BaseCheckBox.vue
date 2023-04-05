<template>
  <div class="checkboxContainer">
    <input
    type="checkbox"   
    :checked="checkBoxValue"
    @change="$emit('update:checkBoxValue', $event.target.checked)"
    />
  </div>
</template>
  
  <script lang="ts">
  //import { Vue } from 'vue-class-component';

  export default {
    name: 'baseCheckBox',
    props: {
      checkBoxValue: {
          type: Boolean,
          default: false,
          required: true
      }
    }

  }
  </script>
  
