<template>
    <div>
        <div class="wrapper antialiased text-gray-900 h-full mb-8">
            <div class="h-3/4">
                <img 
                loading="lazy"
                :src="book.book_image"
                :alt="book.title" 
                class="w-full h-full object-cover object-center rounded-lg shadow-md" /> 
                <div class="relative px-4 -mt-16">
                    <div class="bg-white p-6 rounded-lg shadow-lg">
                        <h4 class="mt-1 text-xl font-semibold uppercase leading-tight truncate">
                            {{ book.title }}
                        </h4>
                        <div class="mt-1">
                            {{ book.author }}
                        </div>
                        <div class="mt-4 flex justify-between">
                            <span class="text-teal-600 text-md font-semibold">{{ book.rank }}th Rating</span>
                            <BookPreview :book="book" />
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
    props: {
        book: {
            type: Object,
            required: true,
            default: () => ({})
        }
    }
})
export default class BookCard extends Vue {}
</script>