<template>
    <div :class="{'main': true, 'is-loading': getLoadingState }">
        <h4 class="relative block shadow-sm text-2xl p-8 bg-black text-white">Best Sellers - Books - The New York Times</h4>
        <!-- Main Content -->
        <section id="main-section" class="md:grid grid-cols-9 md:block">
            <div class="col-span-2 pt-10 y-scrollable bg-white">
                <Navbar :lists="lists"/>
            </div>
            <div class="col-span-7 pt-10 pb-10 bg-gray-50 relative">
                <!-- Spinner -->
                <Loader v-if="getLoadingState" />
                <!-- Books list -->
                <div class="y-scrollable grid xl:grid-cols-3 gap-10 p-10 sm:grid-cols-2 gap-5">
                    <BookCard 
                        v-for="book in books" 
                        :key="book.title" 
                        :book="book"/>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { mapGetters } from 'vuex'

@Component({
    name: "HomePage",
    async asyncData ({ store }) {
        await store.dispatch("fetchList");
        await store.dispatch("fetchBooks");
    },
    computed: {
        ...mapGetters(["getLoadingState"]),
        lists() {
            return this.$store.getters.getLists
        },
        books() {
            return this.$store.getters.getBooks
        }
    }
})
export default class Homepage extends Vue {}
</script>

<style lang="scss">
    // is-loading
    .is-loading {
        @apply h-screen overflow-hidden;
    }

    html {
        scroll-behavior: smooth;
    }

    html,
    .body {
        font-family: "Lato", sans-serif;
    }

    .y-scrollable {
        @apply h-screen overflow-y-scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }

    .y-scrollable::-webkit-scrollbar {
        display: none;
    }
</style>
