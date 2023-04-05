<template>
  <BaseButton 
    :disabled="false" 
    :type="'solid'"
    @click="buttonClick">
    text given using slot 
  </BaseButton>


  <p>Message is: {{ inputText }}</p>
  <BaseInput v-model:inputValue="inputText" />

  
  <p>is checked? {{ checkboxValue }}</p>
  <BaseCheckBox v-model:checkBoxValue="checkboxValue"/>


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
      checkboxValue: false,
      message: '',
      checked: false,
    }
  },
  methods: {
    buttonClick(){return null},
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
