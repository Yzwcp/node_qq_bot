<template>
    <md-editor v-model="modelValue" :previewOnly="previewOnly" @onChange="onChange"/>
</template>

<script setup>
import { ref } from 'vue';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const props = defineProps({
    modelValue:{
        default:""
    },
    previewOnly:{
        default:false
    }
})
const emit = defineEmits(['update:modelValue'])

const onChange = (v)=>{
    emit('update:modelValue',v)
}



</script>
