<template>
  <div class="inputContainer">
    <input
    class="flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none border-gray-200"
    :value="inputValue"
    type="text"
    :placeholder="placeHolder ? placeHolder : 'edit me'"
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
      },
      placeHolder: {
          type: String,
          default: '',
      }
    }
}
  </script>
  

  