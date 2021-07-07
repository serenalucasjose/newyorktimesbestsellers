<template>
    <nav class="menu w-full h-full p-5">
        <ul>
            <li 
                class="mb-5"
                v-for="list in lists" :key="list.list_name">
                <button
                    @click="getNewBooksFromList(list)"
                    class="block w-full text-center text-xl transform transition-transform hover:scale-125" :href="list.list_name_encoded">
                    {{ list.list_name }}
                </button>
            </li>
        </ul>
    </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapActions } from 'vuex'

@Component({
    props: {
        lists: {
            type: Array,
            required: true,
            default: () => ([])
        }
    },
    methods: {
        ...mapActions(["getNewBooksFromList"])
    }
})
export default class Navbar extends Vue {}
</script>