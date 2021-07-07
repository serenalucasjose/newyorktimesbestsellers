<template>
        <div class="h-screen w-full absolute top-0 left-0 bg-white z-10 grid justify-items-center items-center">
            <transition name="fade">
                <img class="w-1/5 -mt-20" src="~/assets/bookLoader.gif" />
            </transition>
        </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    props: {
        loading: {
            type: Boolean,
            required: false
        }
    }
})
export default class Loader extends Vue {}
</script>

<style lang="scss">
    .fade-enter-active, .fade-leave-active {   
        transition: opacity .5s; 
    }
    .fade-enter-from, .fade-leave-to  { 
        opacity: 0; 
    }
</style>