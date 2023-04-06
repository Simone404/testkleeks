<template>
    <div class="buttonContainer ">
        <button
            :class="[getClassByType(), (disabled ? 'opacity-50 cursor-not-allowed' :''), textTransform]"
            :disabled="disabled">
            <slot></slot>
        </button>
    </div>
</template>
    
  
<script lang="ts">

export default {
    name: 'baseButton',
    props: {
      type: {
        type: String,
        default: null,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      textTransform: {
        type: String,
        default: '',
      },
    },
    methods: {
        getClassByType(){
            switch(this.type){
                case 'text': {
                    return 'bg-trasparent text-blue-400 font-bold py-2 px-4 rounded';                    
                }
                case 'outline': {
                    return 'bg-transparent hover:bg-blue-300 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-400 hover:border-transparent rounded';                    
                }
                default: {
                    return 'bg-blue-400 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded';
                }
            }
        }
    },

  }
  </script>
  
