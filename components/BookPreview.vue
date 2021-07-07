<template>
    <div class="book-preview">
        <button 
            @click="isOpen = !isOpen"
            class="btn hover:bg-white hover:text-blue-500">
            Take a peek!
        </button>
        <!-- Backdrop -->
        <transition 
            enter-active-class="animate__animated animate__fadeIn" 
            leave-active-class="animate__animated animate__fadeOut" 
            mode="out-in">
            <div 
                v-if="isOpen" 
                class="book-preview-backdrop"></div>
        </transition>
        <!-- Card -->
        <transition 
            enter-active-class="animate__animated animate__backInDown" 
            leave-active-class="animate__animated animate__backOutDown" 
            mode="out-in">
            <div
                v-if="isOpen" 
                class="book-preview-text bg-no-repeat bg-cover bg-center"
                :style="{ backgroundImage: 'url(' + book.book_image + ')' }">
                <!-- Close btn -->
                <div class="modal-close cursor-pointer relative z-50">
                    <button 
                        class="block ml-auto mb-5"
                        @click="isOpen = !isOpen">
                        <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </button>
                </div>
                <!-- Text -->
                <h2 class="text-xl mb-5 text-blue-600 relative ">{{ book.title }}</h2>
                <p class="text-lg mb-5 relative ">
                    {{ book.description }}
                </p>
                <h4 class="text-xl mb-5 text-blue-600 relative ">Get it on:</h4>
                <ul class="relative">
                    <li 
                        class="mb-1"
                        v-for="link in book.buy_links" :key="link.name">
                        <a 
                            class="hover:text-blue-400"
                            :href="link.url" 
                            target="_blank">{{ link.name }}</a>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({
    props: {
        book: {
            type: Object,
            required: true,
            default: () => ({})
        }
    },
    data() {
        return {
            isOpen: false
        }
    }
})
export default class BookPreview extends Vue {}
</script>

<style lang="scss">
    .btn {
        @apply inline-block p-2 bg-blue-500 text-white rounded border-2 border-blue-500;
    }
    .book-preview-backdrop {
        @apply fixed top-0 left-0 w-screen h-screen z-10 bg-gray-50 opacity-70;
    }
    .book-preview-text {
        @apply fixed z-20 block bg-white p-8 rounded shadow-md inset-x-0 top-1/4 mx-auto;
        height: fit-content;
        width: fit-content;
        // Overlay
        &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(255,255,255,0.9);
        }
    }
</style>